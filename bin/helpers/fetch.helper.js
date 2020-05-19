"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
// eslint-disable-next-line consistent-return
async function makeRequest(url, data) {
    const config = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    return node_fetch_1.default(url, config).then((response) => {
        console.log("response", response);
        return response.json();
    });
}
exports.default = makeRequest;
