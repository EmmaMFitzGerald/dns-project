/* eslint-disable import/extensions */
import express from "express";

import bodyParser from "body-parser";
import marshallCall from "../helpers/inbound-calls.helper";
import { lookup } from "../helpers/reg.helper";
import { helloWorld } from "../lambda";

let importApp: express.Application;

export default async function startImportServer(
    portNumber: number
): Promise<any> {
    importApp = express();
    importApp.use(bodyParser.json());
    importApp.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    importApp.listen(portNumber, () =>
        console.log(`Example app listening on port ${portNumber}!`)
    );

    importApp.get("/", async (req: any, res: any) => {
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
        console.log("in / route", response);
        return response;
    });
}
