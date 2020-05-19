"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const dns = __importStar(require("native-dns"));
// import registerArray from "../../helpers/register.helper";
mocha_1.describe("DNS Server Tests", () => {
    mocha_1.it("test dns", async () => {
        // await startDnsServer();
        await dns.lookup("ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world", (err, address, family) => console.log("address: %j family: IPv%s", address, family));
    });
    mocha_1.it("test dns", async () => {
        await dns.lookup("ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world", (err, address, family) => console.log("address: %j family: IPv%s", address, family));
    });
});
mocha_1.describe("DNS Server Tests", () => {
    mocha_1.it("test dns", async () => {
        dns.lookup("ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world", (err, address, family) => console.log("address: %j family: IPv%s", address, family));
    });
    // it("test dns", async () => {
    //     await dns.lookup(
    //         "simpleurl.com",
    //         (err: any, address: any, family: any) =>
    //             console.log("address: %j family: IPv%s", address, family)
    //     );
    // });
});
