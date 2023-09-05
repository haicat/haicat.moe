import { IncomingMessage } from "http";
import cConnection from "./config/connection";
import cCore from "./config/core";
import * as liburl from "url";
import { CBRed, CBYellow, CBlack, CGray, CRed, CReset, CWhite, CYellow } from "./curses";

const strictMode : boolean = (function() { return !this; })();

export function domainCheck(request: IncomingMessage) : string{
    
    if(cConnection.allowDomainSpoofing){
        let url = liburl.parse(request.url, true);
        if(url.search != null){
            return url.search.slice(1);
        }
    }
    let host : string = request.headers['host'];
    if(host == undefined){
        return null;
    }
    for(let i of cConnection.domain){
        if(host.toLowerCase().endsWith(i.toLowerCase())){
            return host.slice(0,-(i.length+1));
        }
    }
    return null;
};

export enum logLevel {
    debug = 0,
    routine = 1,
    summary = 2,
    warning = 3,
    error = 4
};

export function log(output : string, level : logLevel = logLevel.debug, prefix: string = "root"){
    if(level < cCore.verbose){return;}
    let decor = "";
    switch(level){
        case logLevel.error:
            decor = CWhite + CBRed + "!!!! [ERROR] !!!!" + CReset + CRed;
        break;
        case logLevel.warning:
            decor = CYellow + "!! [" + CBlack + CBYellow + "WARN" + CReset + CYellow + "] !!";
        break;
        case logLevel.debug:
            decor = CGray;
        break;
    }
    console.log(
        ((cCore.verbose == logLevel.debug) 
            ?   CGray + prefix+"]] " + CReset
            :   "")
        + decor + " " + output + CReset);
};