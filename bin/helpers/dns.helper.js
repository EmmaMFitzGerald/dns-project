"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var dns = __importStar(require("native-dns"));
var async = __importStar(require("async"));
var authority = { address: "8.8.8.8", port: 53, type: "udp" };
var clientConfig;
function proxy(question, response, cb) {
    console.log("proxying", question.name);
    var str = clientConfig.apiGatewayUrl;
    var cutString = str.substring(11, str.length);
    console.log("Split", cutString);
    if (cutString === question.name) {
        var request = dns.Request({
            question: question,
            server: {
                address: "127.0.0.1",
                port: clientConfig.localPortNumber,
                type: "udp",
            },
            timeout: 1000,
        });
        request.on("message", function (err, msg) {
            msg.answer.forEach(function (a) { return response.answer.push(a); });
        });
        request.on("end", cb);
        request.send();
    }
    else {
        var request = dns.Request({
            question: question,
            server: authority,
            timeout: 1000,
        });
        request.on("message", function (err, msg) {
            msg.answer.forEach(function (a) { return response.answer.push(a); });
        });
        request.on("end", cb);
        request.send();
    }
    // when we get answers,
}
function handleRequest(request, response) {
    console.log("request from", request.address.address, "for", request.question[0].name);
    console.log("REQ.QUES", request.question);
    // console.log("clientConfig", clientConfig);
    var f = []; // array of functions
    // proxy all questions
    // since proxying is asynchronous, store all callbacks
    request.question.forEach(function (question) {
        // console.log("ques:", question, "resp", response);
        f.push(function (cb) { return proxy(question, response, cb); });
    });
    // do the proxying in parallel
    // when done, respond to the request by sending the response
    async.parallel(f, function () {
        response.send();
    });
}
function startDnsServer(clientConfigur) {
    // console.log("clientConfig", clientConfig);
    clientConfig = clientConfigur;
    var server = dns.createServer();
    server.on("listening", function () {
        return console.log("server listening on", server.address());
    });
    server.on("close", function () { return console.log("server closed", server.address()); });
    server.on("error", function (err, buff, req, res) {
        return console.error(err.stack);
    });
    server.on("socketError", function (err, socket) { return console.error(err); });
    server.on("request", handleRequest);
    server.serve(53);
}
exports.default = startDnsServer;
