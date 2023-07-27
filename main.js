const requireDir        = require("requiredir");
const http              = require("http");
const https             = require("https");
const fs                = require("fs");
const express           = require("express");
const expressApp        = express();
const liburl            = require("url");
const common            = require("./common");


const cConnection   = require("./config/connection");
const serverModules = require("./modules");


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

    for(let m of serverModules){
        if(m.match(request, {
            subdomain: subdomain
        })){
            common.log("HIT [" + m.name + "]" + request.headers["host"] + request.url);
            m.run(request, response, {
                subdomain: subdomain,
                url: url
            });
            return;
        }
    }

    /*
    common.log("HIT " + request.headers["host"] + request.url);

    if(request.headers['host']=="fur.art"){
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("nothing here yet (:");
		response.end();
		return;
	};
    if(request.headers['host']=="haicat.moe"){
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("down for maintenance");
		response.end();
		return;
	};
    */

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("uwu");
    response.end();
    return;
};
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