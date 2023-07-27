const mime  = require("mime");
const fs    = require("fs");

module.exports = {
    name: "static",
    match: function(request, extra){
        return extra.subdomain == "static" || extra.url.pathname == "/favicon.ico";
    },

    run: function(request, response){
        var path = "./static" + request.url.replace("..","").replace("\\","");
        fs.stat(path, function(err, stat){
            if((err==null) && !(fs.lstatSync(path).isDirectory())){
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
    }
};