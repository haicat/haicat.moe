const requireDir        = require("requiredir");
const http              = require("http");
const https             = require("https");
const fs                = require("fs");
const express           = require("express");
const expressApp        = express();
const liburl            = require("url");
const common            = require("./common");


const cConnection   = require("./config/connection");
const serverModules = require('requiredir')("./modules").toArray();


function httpsDelegate(request, response){
    let subdomain = common.domainCheck(request);
    
    if(subdomain == null){
        common.log("MISS (BAD ROOT DOMAIN) " + request.headers["host"] + request.url);
        response.writeHead(403);
        response.end();
        return;
    }

    var url = liburl.parse(request.url, true);
    url.pathname = url.pathname.replace(/\/+$/, "");
    let extraArgs = {
        subdomain: subdomain,
        url: url
    };
    for(let m of serverModules){
        try{
            if(m.match(request, extraArgs)){
                common.log("HIT [" + m.name + "]" + request.headers["host"] + request.url);
                m.run(request, response, extraArgs);
                return;
            }
        }catch(err){
            common.log("!!!!!!!! Server module error ("+m.name+")\n"+err+"\n!!!!!!!!!");
            response.end();
        }
    }

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("uwu");
    response.end();
    return;
};


////////server setup
const tlsKey   = fs.readFileSync(cConnection.https.sec.key).toString();
const tlsCert  = fs.readFileSync(cConnection.https.sec.cert).toString();

var httpsServer = https.createServer({key: tlsKey, cert: tlsCert}, httpsDelegate);

httpsServer.listen(cConnection.https.port, function(err){
    if (err) {
        return common.log('[ERR] ' + err, 2);
    }
    common.log(`Server started on ${cConnection.https.port}`, 2);
});


function httpDelegate(request, response){
    common.log("HTTPS REDIR " + request.headers["host"] + request.url);
    response.writeHead(301, { "Location": "https://" + request.headers["host"] + request.url });
    response.end();
};
httpServer = http.createServer(httpDelegate).listen(cConnection.http.port);