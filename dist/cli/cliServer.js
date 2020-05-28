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
exports.shutdown = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");
const reg_helper_1 = require("../helpers/reg.helper");
let httpServer;
function startCLIServer() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            const cliApp = express();
            cliApp.use(bodyParser.json());
            cliApp.use(bodyParser.urlencoded({
                extended: true,
            }));
            httpServer = https
                .createServer({
                key: fs.readFileSync("./server.key"),
                cert: fs.readFileSync("./server.cert"),
            }, cliApp)
                .listen(443, () => {
                console.log("CLI Server app listening on port 443");
                resolve();
            });
            // this receives a clientConfig from outbound calls,
            cliApp.post("/register", (req, response) => __awaiter(this, void 0, void 0, function* () {
                console.log("CLI Server /register call");
                reg_helper_1.track(req.body);
                response.json({ success: true });
            }));
            cliApp.get("/", (req, response) => __awaiter(this, void 0, void 0, function* () {
                response.json({ message: "Hello World" });
            }));
        });
    });
}
exports.default = startCLIServer;
function shutdown() {
    return __awaiter(this, void 0, void 0, function* () {
        // Function here to shutdown cliApp and the httpServer
        // Primary to be called from test
        return new Promise((res, rej) => {
            httpServer.close((err) => {
                if (err) {
                    console.warn("CLI server could not shut down");
                    rej(err);
                }
                else {
                    console.log("CLI server shut down successfully");
                    res();
                }
            });
        });
    });
}
exports.shutdown = shutdown;
//# sourceMappingURL=cliServer.js.map