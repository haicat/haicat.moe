const cConnection = require("./config/connection");
const cCore = require("./config/core");

module.exports = {
    domainCheck: function(request){
        let host = request.headers['host'];
        for(let i of cConnection.domain){
            if(host.toLowerCase().endsWith(i.toLowerCase())){
                return host.slice(0,-(i.length+1));
            }
        }
        return null;
    },

    log: function(output, level = 0){
        if(level < cCore.verbose){return;}
        console.log(output);
    }

};