"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerArray = [];
function track(apiUrlPortNumber) {
    exports.registerArray.push(apiUrlPortNumber);
    // console.log("regArray", registerArray);
}
exports.track = track;
function lookup(url) {
    const foundClientConfig = exports.registerArray.find((object) => object.apiGatewayUrl === url);
    if (foundClientConfig) {
        return foundClientConfig.localPortNumber;
    }
    return undefined;
}
exports.lookup = lookup;
