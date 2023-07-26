const requireDir        = require("require-dir");
const http              = require("http");
const fs                = require("fs");
const express           = require("express");
const expressApp        = express();

const cConnection = require("./config/connection");



function httpsDelegate(request, response){

};
//const tlsKey   = fs.readFileSync(cConnection.https.sec.key).toString();
//const tlsCert  = fs.readFileSync(cConnection.https.sec.cert).toString();

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
    getStatic(request, response);
    //response.writeHead(301, { "Location": "https://" + request.headers["host"] + request.url });
    //response.end();
};
httpServer = http.createServer(httpDelegate).listen(cConnection.http.port);