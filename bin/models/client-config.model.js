"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientConfig {
    constructor(apiGatewayUrl, localPortNumber) {
        this.apiGatewayUrl = apiGatewayUrl;
        this.localPortNumber = localPortNumber;
    }
}
exports.default = ClientConfig;
