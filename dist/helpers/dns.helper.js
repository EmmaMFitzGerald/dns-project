"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServer = exports.shutdownDnsServer = exports.handleRequest = void 0;
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-explicit-any */
const dns = require("native-dns");
const async = require("async");
const events_1 = require("events");
const reg_helper_1 = require("./reg.helper");
const eventEmitter = new events_1.EventEmitter();
let server;
const authority = { address: "8.8.8.8", port: 53, type: "udp" };
function proxy(question, response, cb) {
    console.log("proxying", question);
    console.log("registerArray in proxy", reg_helper_1.registerArray);
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
    console.log("this is the name to compare to", request.question[0].name);
    const f = []; // array of functions
    const result = reg_helper_1.registerArray.find((url) => url.hostName === request.question[0].name);
    if (result !== undefined) {
        const override = {};
        override.name = request.question[0].name;
        override.address = "127.0.0.1";
        override.ttl = 600;
        eventEmitter.emit("domainIntercepted", override.name, override.address);
        // find a way to call resolveHook
        // resolveHook(newUrl.host, ip)
        response.answer.push(dns.A(override));
    }
    else {
        console.log("going to have to proxy this", request.question[0].name);
        f.push((cb) => proxy(request.question[0], response, cb));
    }
    async.parallel(f, () => {
        // console.log("response in async.parallel", response.answer[0].name);
        // console.log(response.answer[0].address);
        response.send();
    });
}
exports.handleRequest = handleRequest;
function startDnsServer(resolveHook) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            server = dns.createServer();
            server.on("listening", () => {
                console.log("DNS server listening on", server.address());
                server.on("error", (err, buff, req, res) => {
                    console.error("error:");
                    console.error(err.stack);
                });
                server.on("socketError", (err, socket) => {
                    console.error("socketError:");
                    console.error(err);
                });
                eventEmitter.on("domainIntercepted", resolveHook);
                server.on("request", handleRequest);
                resolve();
            });
            server.serve(53);
        });
    });
}
exports.default = startDnsServer;
function shutdownDnsServer() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Closing DNS server");
        server.close();
    });
}
exports.shutdownDnsServer = shutdownDnsServer;
function getServer() {
    return server;
}
exports.getServer = getServer;
//# sourceMappingURL=dns.helper.js.map