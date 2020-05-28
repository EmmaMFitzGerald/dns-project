import { describe, it } from "mocha";
import { expect, assert } from "chai";

import startCLIServer from "../../cli/cliServer";
import fitzy from "../../fitzy";
import makeGetRequest from "../../helpers/makeGetRequest.helper";
import checkRespStatus from "../../helpers/checkRespStatus.helper";
import startDnsServer from "../../helpers/dns.helper";

async function helloWorld(): Promise<object> {
    return { message: "Hello World" };
}

describe("Lambda function tests", () => {
    it("Are the servers listening", async () => {
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

    it("helloWorld", async () => {
        assert.deepEqual(await helloWorld(), { message: "Hello World" });
    });

    it("importServer calls our function", async () => {
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
        await fitzy("api-url.com", helloWorld);

        let bollocksWasIntercepted = false;

        // start dns server
        // Callback that fires with intercepted domains
        await startDnsServer((domainName: string, ipAddress: string) => {
            console.log("In event emitter");
            console.log("domainName:", domainName);
            console.log("ipAddress", ipAddress);
            if (
                (domainName ===
                    "ksgtgllggj.execute-api.us-east-1.amazonaws.com" ||
                    domainName ===
                        "https://ksgtgllggj.execute-api.us-east-1.amazonaws.com") &&
                ipAddress === "127.0.0.1"
            ) {
                bollocksWasIntercepted = true;
            }
            console.log("bollocksWasIntercepted:", bollocksWasIntercepted);
        });
        // dns.on("domainIntercepted", (domainName: string, ipAddress: string) => {
        //     if (domainName === "www.bollocks.com" && ipAddress ===  "127.0.0.1") {
        //         bollocksWasIntercepted = true;
        //     }
        // });
        // const response = await makeGetRequest("https://apigateway.url.com");
        const response: object = await makeGetRequest(
            "https://ksgtgllggj.execute-api.us-east-1.amazonaws.com"
        );
        console.log("bollocks after call", bollocksWasIntercepted);
        // expect(bollocksWasIntercepted).to.equal(true);
        console.log("response", response);
        assert.deepEqual(response, { message: "Hello World" });
    });

    // it("see if helloworld is being called when that api is being hit", async () => {
    //     const response: object = await makeGetRequest(
    //         "https://ksgtgllggj.execute-api.us-east-1.amazonaws.com"
    //     );
    //     console.log("response", response);
    //     assert.deepEqual(response, { message: "Hello World" });
    // });
});
