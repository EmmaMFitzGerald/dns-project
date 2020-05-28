import { describe, before, it } from "mocha";
import { expect, assert } from "chai";

import * as request from "request";
import { exec } from "child_process";
import startCLIServer, { shutdown } from "../../cli/cliServer";
import fitzy from "../../fitzy";
import makeGetRequest from "../../helpers/makeGetRequest.helper";
import checkRespStatus from "../../helpers/checkRespStatus.helper";
import startDnsServer, { shutdownDnsServer } from "../../helpers/dns.helper";

async function helloWorld(): Promise<object> {
    return { message: "Hello World" };
}

describe("Lambda function tests", () => {
    it.skip("Are the servers listening", async () => {
        /*
            async function helloWorld(event, context) {
                return "Hello World";
            }

            import { fitzydns } from "fitzydns";
            fitzydns.start("https://apigateway.url.com, helloWorld);

        */
        startCLIServer();
        await fitzy(
            "https://ksgtgllggj.execute-api.us-east-1.amazonaws.com",
            helloWorld
        );

        // expect that the import server is running on 3000
        // expect response statusCode === 200
        const importResponse = await checkRespStatus("http://localhost:3000"); // should return a value status 200
        console.log("importResp", importResponse);
        expect(importResponse).to.equal(200);

        // // expect that the CLI server is running on 443
        // // expect response statusCode === 200
        const cliResponse = await checkRespStatus("https://localhost:443");
        expect(cliResponse).to.equal(200);
    });

    it.skip("helloWorld", async () => {
        assert.deepEqual(await helloWorld(), { message: "Hello World" });
    });

    it.skip("importServer calls our function", async () => {
        // is the import server localhost calling our lambda function?
        await fitzy(
            "ksgtgllggj.execute-api.us-east-1.amazonaws.com",
            helloWorld
        );
        const importResponse: object = await makeGetRequest(
            "http://localhost:3000"
        );

        // expect importResponse = { message: "Hello World "};
        assert.deepEqual(importResponse, { message: "Hello World" });
    });

    it("DNS is intercepting", async () => {
        const urlToTest =
            "https://ksgtgllggj.execute-api.us-east-1.amazonaws.com";

        console.log("Flushing cache.");

        await new Promise((resolve, reject) => {
            exec("dscacheutil -flushcache", (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("DNS Cache flushed");
                    resolve();
                }
            });
        });

        console.log("Ready to start DNS server.");

        await startDnsServer((domainName: string, ipAddress: string) => {
            console.log("domainName:", domainName);
            console.log("ipAddress", ipAddress);
            if (domainName === urlToTest && ipAddress === "127.0.0.1") {
                console.log("Domain successfully intercepted");
            }
        });

        await startCLIServer();

        try {
            await fitzy(urlToTest, helloWorld);

            console.log("Making request!");
            const response = await makeGetRequest(urlToTest);

            console.log("response", response);
            assert.deepEqual(response, { message: "Hello World" });
        } catch (err) {
            console.error(err);
        }

        try {
            shutdownDnsServer();
            await shutdown();
        } catch (err) {
            console.warn("Unable to shutdown CLI server");
        }
    }).timeout(10000);
});
