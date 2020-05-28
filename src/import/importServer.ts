/* eslint-disable import/extensions */
import * as express from "express";

import * as bodyParser from "body-parser";
// import marshallCall from "../helpers/inbound-calls.helper";

let importApp: express.Application;

export default async function startImportServer(
    portNumber: number,
    lambdaFunction: any
): Promise<void> {
    importApp = express();
    importApp.use(bodyParser.json());
    importApp.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    importApp.listen(portNumber);

    importApp.get("/", async (req: any, res: any) => {
        // lambdaFunction could either be an asynchronous function/promise or not
        // We need to figure iout if we shoudl await  or not
        console.log("reached the import server route");
        const response = await lambdaFunction();
        res.json(response);
    });
}
