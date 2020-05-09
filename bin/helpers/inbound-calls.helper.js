"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Inbound calls are from the CLI server to the Import server ////take any req object and client config that has been matched by the url
var node_fetch_1 = __importDefault(require("node-fetch"));
function marshallCall(portNum, httpMethod, reqBody) {
    var config = {
        method: httpMethod,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: reqBody,
    };
    return node_fetch_1.default("localhost:" + portNum, config).then(function (response) {
        console.log("response", response);
        return response.json();
    });
}
exports.default = marshallCall;
