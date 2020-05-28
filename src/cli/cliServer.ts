/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from "express";
import * as bodyParser from "body-parser";
import * as https from "https";
import * as fs from "fs";
import { track } from "../helpers/reg.helper";

let httpServer: https.Server;

export default async function startCLIServer(): Promise<void> {
    return new Promise((resolve, reject) => {
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
                resolve();
            });

        // this receives a clientConfig from outbound calls,
        cliApp.post("/register", async (req: any, response: any) => {
            console.log("CLI Server /register call");
            track(req.body);
            response.json({ success: true });
        });

        cliApp.get("/", async (req: any, response: any) => {
            response.json({ message: "Hello World" });
        });
    });
}

export async function shutdown(): Promise<void> {
    // Function here to shutdown cliApp and the httpServer
    // Primary to be called from test
    return new Promise((res, rej) => {
        httpServer.close((err: any) => {
            if (err) {
                console.warn("CLI server could not shut down");
                rej(err);
            } else {
                console.log("CLI server shut down successfully");
                res();
            }
        });
    });
}
