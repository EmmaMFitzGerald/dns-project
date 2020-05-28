import { describe, it } from "mocha";
import { expect, assert } from "chai";

import startCLIServer, { shutdown } from "../../cli/cliServer";
import fitzy from "../../fitzy";
import makeGetRequest from "../../helpers/makeGetRequest.helper";
import checkRespStatus from "../../helpers/checkRespStatus.helper";
import startDnsServer from "../../helpers/dns.helper";

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

    it("dns is intercepting", async () => {
        // We should call startCLIServer here....
        startCLIServer();

        try {
            const urlToTest =
                "https://ksgtgllggj.execute-api.us-east-1.amazonaws.com";

            await fitzy(urlToTest, helloWorld);

            // start dns server
            // Callback that fires with intercepted domains
            await startDnsServer((domainName: string, ipAddress: string) => {
                console.log("domainName:", domainName);
                console.log("ipAddress", ipAddress);
                if (domainName === urlToTest && ipAddress === "127.0.0.1") {
                    console.log("Domain successfully intercepted");
                }
            });

            const response: object = await makeGetRequest(urlToTest);

            console.log("response", response);
            assert.deepEqual(response, { message: "Hello World" });
        } catch (err) {
            // And call shutdown() here
            shutdown();
        }
    });
});
