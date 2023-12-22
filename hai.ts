import {IncomingMessage, Server, ServerResponse} from "http";
import { UrlWithParsedQuery } from "url";
import { log, logLevel } from "./common";

export default abstract class hai{
    methods: Map<string, Function> = new Map<string, Function>();
    clientMethod(){
        var m = this.methods;
        return function(target: Function,
                        propertyKey: string,
                        descriptor: PropertyDescriptor){
            m.set(propertyKey, target);
        };
    };

    abstract readonly name: string;
    abstract match(request : IncomingMessage, extra : haiArgs) : boolean;
    abstract run(request : IncomingMessage, response : ServerResponse, extra? : haiArgs) : void;

    api(request: IncomingMessage, response: Server) : boolean {
        return false; //todo: implement api calling
        //check incoming message, some test to see if its an application call or an api call
        //probably just have app.haicat.moe/api/data or like api.app.haicat.moe/data or something
        //if it's not an api call, return false
        //probably could also remove the return type and just have the check in the parent method
        //call the appropriate client method
    };

    log(out : string, level : logLevel = logLevel.debug) : void{
        log(out, level, this.name);
    };
};


export interface haiArgs{
    subdomain: string;
    url: UrlWithParsedQuery;
};