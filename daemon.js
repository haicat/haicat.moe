const service = require('requiredir')("./service").toArray();
const common = require("./common");
const cDaemon = require("./config/daemon");


class action{
    promise = null;
    constructor(callback){
        this.promise = new Promise(function(resolve, reject){
            callback(resolve, reject);
            //potentially store these off later?
        });
    }

    onFinish(){

    }

}

class daemon{
    static CODENAME = [
        "stop",
        "idle",
        "tick",
        "init",
        "crash",
        "hang"
    ];

    static CODE = {
        "stop":0,
        "idle":1,
        "tick":2,
        "init":3,
        "crash":4,
        "hang":5
    };

    status = [];

    actionPromise = [];


    constructor(){

    }

    async init(){
        //todo: finish heartbeat service
        //this will get us by.... for now
        for(let s of service){
            (async()=>{s.init(daemon);})();
        }
    }

    async heartbeat(){
        for(let i in service){
            let s = service[i];
            s.tick(daemon);
        }
        setTimeout(heartbeat, cDaemon.heartbeat.interval)
    }
};

for(let i in CODENAME){
    CODE[CODENAME]
}

module.exports = new daemon();