"use strict";
/* eslint-disable import/extensions */
// Outbound calls are from the package as as import to the CLI server
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_helper_1 = __importDefault(require("./fetch.helper"));
/**
 * Registers an import server with the CLI server
 */
async function registerWithCli(clientConfig) {
    return fetch_helper_1.default("http://localhost:80/register", {
        apiGatewayUrl: clientConfig.apiGatewayUrl,
        localPortNumber: clientConfig.localPortNumber,
    });
}
exports.default = registerWithCli;
