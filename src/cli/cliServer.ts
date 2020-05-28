/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import bodyParser from "body-parser";
import https from "https";
import fs from "fs";
import { track } from "../helpers/reg.helper";

let httpServer: any;

export default function startCLIServer(): void {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const cliApp = express();
    cliApp.use(bodyParser.json());
    cliApp.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    httpServer = https
        .createServer(
            {
                key: fs.readFileSync("./server.key"),
                cert: fs.readFileSync("./server.cert"),
            },
            cliApp
        )
        .listen(443, () => {
            console.log("CLI Server app listening on port 443");
        });

    // this receives a clientConfig from outbound calls,
    cliApp.post("/register", async (req: any) => {
        track(req.body);
    });

    cliApp.get("/", async (req: any, res: any) => {
        res.json({ message: "Hello World" });
    });
}

export function shutdown(): void {
    // Function here to shutdown cliApp and the httpServer
    // Primary to be called from test
    httpServer.close();
    // throw new Error("Not yet implemented");
}
