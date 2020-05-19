import { describe, it } from "mocha";
import http from "http";
import fitzy from "../../fitzy";
import startCLIServer from "../../cli/cliServer";
import { registerArray } from "../../helpers/reg.helper";
import { helloWorld } from "../../lambda";

function myLambdaFunction(): number {
    return 1;
}

describe("DNS Server Tests", () => {
    it("test dns", async () => {
        await startCLIServer();
            await fitzy(
                "https://ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world",
                helloWorld
            );
            console.log("registerArray:", registerArray);
    });
});
