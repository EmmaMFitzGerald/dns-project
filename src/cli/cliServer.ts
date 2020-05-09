/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import bodyParser from "body-parser";
// import track from "../helpers/register.helper";
// import marshallCall from "../helpers/inbound-calls.helper";
// import { registerWithCli } from "../helpers/outbound-calls.helper";
export default function startCLIServer(): void {
    const cliApp = express();

    cliApp.use(bodyParser.json());
    cliApp.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    cliApp.listen(80, () => console.log("Example app listening on port 80!"));
    cliApp.get("/", (_req: any, res: any) =>
        res.send({ "this is cli server": "testing" })
    );

    // this receives a clientConfig from outbound calls,
    cliApp.post("/register", (req: any, res: any) => {
        console.log("in the register", req.body); // req.body is a clientConfig object
        // track(req.body);
    });
}
