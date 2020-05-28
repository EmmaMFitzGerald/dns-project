/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import bodyParser from "body-parser";
import https from "https";
import fs from "fs";
import fetch from "node-fetch";
import { track } from "../helpers/reg.helper";
import marshallCall from "../helpers/inbound-calls.helper";

export default function startCLIServer(): void {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const cliApp = express();
    cliApp.use(bodyParser.json());
    cliApp.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    https
        .createServer(
            {
                key: fs.readFileSync("../server.key"),
                cert: fs.readFileSync("../server.cert"),
            },
            cliApp
        )
        .listen(443, () => {
            console.log("Example app listening on port 443");
        });

    let portNumber: number;
    // this receives a clientConfig from outbound calls,
    cliApp.post("/register", async (req: any, res: any) => {
        portNumber = req.body.localPortNumber;
        // console.log("in / route", req.body)
        track(req.body);
    });

    cliApp.get("/", async (req: any, res: any) => {
        res.json({ message: "Hello World" });
    });
}

// cliApp.get("/", (req: any, res: any) => {
//     console.log("here");
//     // console.log("req.body", req.body);
//     // const { httpMethod } = req.body.input;
//     // const portNum = portNumber;
//     // let resp;
//     // if (req.body.input.body && req.body.input.queryStringParameters) {
//     //     resp = {
//     //         ...req.body.input.queryStringParameters,
//     //         ...req.body.input.body,
//     //     };
//     // } else if (
//     //     req.body.input.body &&
//     //     req.body.input.queryStringParameters === null
//     // ) {
//     //     resp = req.body.input.body;
//     // } else {
//     //     resp = req.body.input.queryStringParameter;
//     // }
//     // marshallCall(portNum, httpMethod, resp);
// });
