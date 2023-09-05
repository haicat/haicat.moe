"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
class hai {
    log(out, level = common_1.logLevel.debug) {
        (0, common_1.log)(out, level, this.name);
    }
    ;
}
exports.default = hai;
;
;
