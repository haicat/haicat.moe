import { IncomingMessage, ServerResponse } from "http";
import hai, { haiArgs } from "../hai";

export default class extends hai{
    name = "art";

    match(request : IncomingMessage, extra : haiArgs){
        return extra.subdomain == "art";
    };

    run(request : IncomingMessage, response : ServerResponse, extra : haiArgs){
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(">w>");
        response.end();
        return;
    };
};