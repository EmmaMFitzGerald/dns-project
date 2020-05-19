"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const fitzy_1 = __importDefault(require("../../fitzy"));
const cliServer_1 = __importDefault(require("../../cli/cliServer"));
const reg_helper_1 = require("../../helpers/reg.helper");
function myLambdaFunction() {
    return 1;
}
mocha_1.describe("DNS Server Tests", () => {
    mocha_1.it("test dns", async () => {
        await cliServer_1.default();
        await fitzy_1.default("https://ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world", myLambdaFunction());
        console.log("registerArray:", reg_helper_1.registerArray);
    });
    // it("test dns", async () => {
    //     console.log("regArray", registerArray);
    //     await dns.lookup(
    //         "ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world",
    //         (err: any, address: any, family: any) =>
    //             console.log("address: %j family: IPv%s", address, family)
    //     );
    // });
    // it("test dns", async () => {
    //     console.log("regArray", registerArray);
    //     await dns.lookup(
    //         "ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world",
    //         (err: any, address: any, family: any) =>
    //             console.log("address: %j family: IPv%s", address, family)
    //     );
    // });
});
