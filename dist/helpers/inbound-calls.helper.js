"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Inbound calls are from the CLI server to the Import server ////take any req object and client config that has been matched by the url
const node_fetch_1 = require("node-fetch");
function marshallCall(portNum, httpMethod, reqBody) {
    const config = {
        method: httpMethod,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: reqBody,
    };
    return node_fetch_1.default(`localhost:${portNum}`, config).then((response) => {
        console.log("response", response);
        return response.json();
    });
}
exports.default = marshallCall;
//# sourceMappingURL=inbound-calls.helper.js.map