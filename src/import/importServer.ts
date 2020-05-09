/* eslint-disable import/extensions */
import express from "express";

import bodyParser from "body-parser";

// import { register } from "../helpers/outbound-calls.helper";

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

    importApp.post("/", (req: any, res: any) => {
        // call lambda function here
        // post result to cli
    });
}

// importApp.post("/register", (req: any, res: any) => {
//     // http://localhost/register
//     const array = register(req.body);
//     console.log("array", array);
//     res.json({
//         array,
//     });
// });
