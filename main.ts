import * as http    from "http";
import * as https   from "https";
import * as fs      from "fs";
import * as liburl from "url";

import * as common from "./common";

import * as mixer from "mixer";

import cConnection from "./config/connection";
import hai, { haiArgs } from "./hai";
import * as modules from "./modules";

let serverModules = [new modules.static(), new modules.art(), new mixer.default()];

const server : hai = new class extends hai{
    name = "*";
    constructor(){
        super();
    };
    match(request: http.IncomingMessage, extra: haiArgs) : boolean{
        return false;
    };
    run(request : http.IncomingMessage, response : http.ServerResponse) : void{
        let subdomain = common.domainCheck(request);

        if(subdomain == null){
            this.log("MISS [bad root domain] " + request.headers["host"] + request.url);
            response.writeHead(403, {"Content-Type": "text/plain"});
            response.end("403 - Forbidden");
            return;
        }

        let url = liburl.parse(request.url, true);
        url.pathname = url.pathname.replace(/\/+$/, "");
        let modArgs : haiArgs = {
            subdomain: subdomain,
            url: url
        };

        for(let m of serverModules){
            try{
                if(m.match(request, modArgs)){
                    this.log("HIT [" + m.name + "] " + request.headers["host"] + request.url);
                    m.run(request, response, modArgs);
                    return;
                }
            }catch(err){
                this.log("server module threw uncaught error ["+m.name+"]\n"+err, common.logLevel.error);
                response.end();
            }
        }

        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("uwu");
        response.end();
        return;
    };
}();


////////server setup

var webServer = null;
var redirectServer = null;

function redirectDelegate(request, response){
    common.log("Redirecting " + request.headers["host"] + request.url, 0, "redirectDelegate");
    response.writeHead(301, { "Location": "https://" + request.headers["host"] + request.url });
    response.end();
};

if(cConnection.secure){
    const tlsKey   = fs.readFileSync(cConnection.https.sec.key).toString();
    const tlsCert  = fs.readFileSync(cConnection.https.sec.cert).toString();
    webServer = https.createServer({key: tlsKey, cert: tlsCert}, (req,res)=>{server.run(req,res);});
    webServer.listen(cConnection.https.port, function(err){
        if (err) {
            return common.log('[ERR] ' + err, 2);
        }
        common.log(`Server started on ${cConnection.https.port}`, common.logLevel.summary);
    });

    redirectServer = http.createServer(redirectDelegate).listen(cConnection.http.port);
}else{
    webServer = http.createServer((req,res)=>{server.run(req,res);});
    webServer.listen(cConnection.http.port, function(err){
        if (err) {
            return common.log('[ERR] ' + err, 2);
        }
        common.log(`Server started UNSECURED on ${cConnection.http.port}`, common.logLevel.warning);
    });
}

if(cConnection.allowDomainSpoofing == true){
    common.log("DOMAIN SPOOFING IS ENABLED. DO NOT USE THIS IN PRODUCTION", common.logLevel.warning);
}