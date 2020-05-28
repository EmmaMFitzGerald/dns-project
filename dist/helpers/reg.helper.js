"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.track = exports.registerArray = void 0;
const url_1 = require("url");
exports.registerArray = [];
function track(config) {
    const suppliedUrl = new url_1.URL(config.apiGatewayUrl);
    exports.registerArray.push({
        hostName: suppliedUrl.hostname,
        localPortNumber: config.localPortNumber,
    });
    console.log("registered domains is now:", exports.registerArray);
}
exports.track = track;
//# sourceMappingURL=reg.helper.js.map