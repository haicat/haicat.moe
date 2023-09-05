import { IncomingMessage, ServerResponse } from "http";
import hai, { haiArgs } from "../hai";

const mime = require("mime"); //types are broken??
import * as fs from "fs";

export default class extends hai{
    name = "static";

    match(request : IncomingMessage, extra : haiArgs){
        return extra.subdomain == "static" || extra.url.pathname == "/favicon.ico";
    };

    run(request : IncomingMessage, response : ServerResponse, extra : haiArgs){
        var path = "./static" + request.url.replace("..","").replace("\\","");
        fs.stat(path, function(err, stat){
            if((err==null) && !(fs.lstatSync(path).isDirectory())){
                response.writeHead(200, {"Content-Type": mime.getType(path)});
                var fstream = fs.createReadStream(path);
                fstream.pipe(response);
                return;
            } else {
                response.writeHead(404, {"Content-Type": "text/html"});
                var fstream = fs.createReadStream("./static/404.html");
                fstream.pipe(response);
            }
        });
        return;
    };
};