import {IncomingMessage, ServerResponse} from "http";
import { UrlWithParsedQuery } from "url";
import { log, logLevel } from "./common";


export default abstract class hai{
    abstract readonly name: string;
    abstract match(request : IncomingMessage, extra : haiArgs) : boolean;
    abstract run(request : IncomingMessage, response : ServerResponse, extra? : haiArgs) : void;
    log(out : string, level : logLevel = logLevel.debug) : void{
        log(out, level, this.name);
    };
};


export interface haiArgs{
    subdomain: string;
    url: UrlWithParsedQuery;
};