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
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const child_process_1 = require("child_process");
const cliServer_1 = require("../../cli/cliServer");
const fitzy_1 = require("../../fitzy");
const makeGetRequest_helper_1 = require("../../helpers/makeGetRequest.helper");
const checkRespStatus_helper_1 = require("../../helpers/checkRespStatus.helper");
const dns_helper_1 = require("../../helpers/dns.helper");
function helloWorld() {
    return __awaiter(this, void 0, void 0, function* () {
        return { message: "Hello World" };
    });
}
mocha_1.describe("Lambda function tests", () => {
    mocha_1.it.skip("Are the servers listening", () => __awaiter(void 0, void 0, void 0, function* () {
        /*
            async function helloWorld(event, context) {
                return "Hello World";
            }

            import { fitzydns } from "fitzydns";
            fitzydns.start("https://apigateway.url.com, helloWorld);

        */
        cliServer_1.default();
        yield fitzy_1.default("https://ksgtgllggj.execute-api.us-east-1.amazonaws.com", helloWorld);
        // expect that the import server is running on 3000
        // expect response statusCode === 200
        const importResponse = yield checkRespStatus_helper_1.default("http://localhost:3000"); // should return a value status 200
        console.log("importResp", importResponse);
        chai_1.expect(importResponse).to.equal(200);
        // // expect that the CLI server is running on 443
        // // expect response statusCode === 200
        const cliResponse = yield checkRespStatus_helper_1.default("https://localhost:443");
        chai_1.expect(cliResponse).to.equal(200);
    }));
    mocha_1.it.skip("helloWorld", () => __awaiter(void 0, void 0, void 0, function* () {
        chai_1.assert.deepEqual(yield helloWorld(), { message: "Hello World" });
    }));
    mocha_1.it.skip("importServer calls our function", () => __awaiter(void 0, void 0, void 0, function* () {
        // is the import server localhost calling our lambda function?
        yield fitzy_1.default("ksgtgllggj.execute-api.us-east-1.amazonaws.com", helloWorld);
        const importResponse = yield makeGetRequest_helper_1.default("http://localhost:3000");
        // expect importResponse = { message: "Hello World "};
        chai_1.assert.deepEqual(importResponse, { message: "Hello World" });
    }));
    mocha_1.it("DNS is intercepting", () => __awaiter(void 0, void 0, void 0, function* () {
        const urlToTest = "https://ksgtgllggj.execute-api.us-east-1.amazonaws.com";
        console.log("Flushing cache.");
        yield new Promise((resolve, reject) => {
            child_process_1.exec("dscacheutil -flushcache", (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log("DNS Cache flushed");
                    resolve();
                }
            });
        });
        console.log("Ready to start DNS server.");
        yield dns_helper_1.default((domainName, ipAddress) => {
            console.log("domainName:", domainName);
            console.log("ipAddress", ipAddress);
            if (domainName === urlToTest && ipAddress === "127.0.0.1") {
                console.log("Domain successfully intercepted");
            }
        });
        yield cliServer_1.default();
        try {
            yield fitzy_1.default(urlToTest, helloWorld);
            console.log("Making request!");
            const response = yield makeGetRequest_helper_1.default(urlToTest);
            console.log("response", response);
            chai_1.assert.deepEqual(response, { message: "Hello World" });
        }
        catch (err) {
            console.error(err);
        }
        try {
            dns_helper_1.shutdownDnsServer();
            yield cliServer_1.shutdown();
        }
        catch (err) {
            console.warn("Unable to shutdown CLI server");
        }
    })).timeout(10000);
});
//# sourceMappingURL=general.test.js.map