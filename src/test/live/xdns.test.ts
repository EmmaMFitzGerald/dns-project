import { describe, it } from "mocha";
import * as dns from "native-dns";
// import { expect } from "chai";
import https from "https";
import startDnsServer from "../../helpers/dns.helper";
// import ClientConfig from "../../models/client-config.model";
// import Register from "../../helpers/register.helper";
import { registerArray } from "../../helpers/reg.helper";
// import registerArray from "../../helpers/register.helper";

describe("DNS Server Tests", () => {
    it("test dns", async () => {
        // await startDnsServer();
        await dns.lookup(
            "ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world",
            (err: any, address: any, family: any) =>
                console.log("address: %j family: IPv%s", address, family)
        );
    });
    it("test dns", async () => {
        await dns.lookup(
            "ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world",
            (err: any, address: any, family: any) =>
                console.log("address: %j family: IPv%s", address, family)
        );
    });
});

describe("DNS Server Tests", () => {
    it("test api", async () => {
        https.get(
            "https://ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world"
        );
    });
    it("test dns", async () => {
        dns.lookup(
            "ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world",
            (err: any, address: any, family: any) =>
                console.log("address: %j family: IPv%s", address, family)
        );
    });
    it("test api", async () => {
        https.get(
            "https://ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world"
        );
    });
    // it("calls lambda function when hitting '/' 3000 import server route", async () => {
    //     // startCLIServer();
    //     https.get(
    //         "https://ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world"
    //     );
    // });
});
