"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable eqeqeq */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-explicit-any */
const dns = __importStar(require("native-dns"));
const async = __importStar(require("async"));
const reg_helper_1 = require("./reg.helper");
const authority = { address: "8.8.8.8", port: 53, type: "udp" };
function proxy(question, response, cb) {
    console.log("proxying", question.name);
    // console.log("registerArray in proxy", registerArray);
    const request = dns.Request({
        question,
        server: authority,
        timeout: 1000,
    });
    request.on("message", (err, msg) => {
        msg.answer.forEach((a) => response.answer.push(a));
    });
    request.on("end", cb);
    request.send();
}
function handleRequest(request, response) {
    // console.log(
    //     "request from",
    //     request.address.address,
    //     "for",
    //     request.question[0].name
    // );
    console.log("reg array", reg_helper_1.registerArray);
    console.log("req.ques", request.question);
    const f = []; // array of functions
    request.question.forEach((question) => {
        reg_helper_1.registerArray.forEach((clientConfig) => {
            const newUrl = new URL(clientConfig.apiGatewayUrl);
            const myUrl = newUrl.host + newUrl.pathname;
            if (myUrl == question.name || newUrl.href == question.name) {
                const override = {};
                override.name = question.name;
                override.address = "127.0.0.1";
                override.ttl = 600;
                override.port = clientConfig.localPortNumber;
                response.answer.push(dns.A(override));
            }
            else {
                f.push((cb) => proxy(question, response, cb));
            }
        });
    });
    async.parallel(f, () => {
        console.log(response.answer[0].address);
        response.send();
    });
}
exports.handleRequest = handleRequest;
function startDnsServer() {
    const server = dns.createServer();
    server.on("listening", () => console.log("server listening on", server.address()));
    server.on("close", () => console.log("server closed", server.address()));
    server.on("error", (err, buff, req, res) => console.error(err.stack));
    server.on("socketError", (err, socket) => console.error(err));
    server.on("request", handleRequest);
    server.serve(53);
}
exports.default = startDnsServer;
