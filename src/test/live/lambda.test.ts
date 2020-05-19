import { describe, it } from "mocha";
import { expect } from "chai";
import https from "https";
import http from "http";
import supertest from "supertest";
import { helloWorld } from "../../lambda";
import startImportServer from "../../import/importServer";
import startCLIServer from "../../cli/cliServer";

describe("Lambda function tests", () => {
    it("tests lambda function call", async () => {
        const event = {
            body: "",
            headers: {},
            httpMethod: "GET",
            isBase64Encoded: false,
            path: "",
            pathParameters: {},
            queryStringParameters: {},
            stageVariables: {},
            requestContext: {},
            resource: "",
        };
        const response = await helloWorld(event);
        expect(response.statusCode).to.equal(200);
    });
    // it("calls lambda function when hitting '/' 3000 import server route", async () => {
    //     startImportServer(3000);
    //     http.get("http://localhost:3000");
    // });
});
