const requireDir        = require("require-dir");
const http              = require("http");
const https             = require("https");
const fs                = require("fs");
const express           = require("express");
const expressApp        = express();

const cConnection = require("./config/connection");



function httpsDelegate(request, response){
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
	if(url.pathname == "/favicon.ico"){
		response.writeHead(200, {"Content-Type": "image/x-icon"});
		var fstream = fs.createReadStream("./static/favicon.ico");
		fstream.pipe(response);
		return;
	}
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
        return console.log('[ERR] ', err);
    }
    console.log(`Server started on ${cConnection.https.port}`);
});

function getStatic(request, response){
    var path = "./static" + request.url.replace("..","").replace("\\","");
    fs.stat(path, function(err, stat){
        if(
              (err==null) && !(fs.lstatSync(path).isDirectory())
            ){
            response.writeHead(200, {"Content-Type": mime.getType(path)});
            var fstream = fs.createReadStream(path);
            fstream.pipe(response);
            return;
        } else {
          response.writeHead(200, {"Content-Type": "text/html"});
          var fstream = fs.createReadStream("./404.html");
          fstream.pipe(response);
        }
      });
      return;
};

function httpDelegate(request, response){
    response.writeHead(301, { "Location": "https://" + request.headers["host"] + request.url });
    response.end();
};
httpServer = http.createServer(httpDelegate).listen(cConnection.http.port);