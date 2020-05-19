"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const inbound_calls_helper_1 = __importDefault(require("../helpers/inbound-calls.helper"));
let importApp;
async function startImportServer(portNumber) {
    importApp = express_1.default();
    importApp.use(body_parser_1.default.json());
    importApp.use(body_parser_1.default.urlencoded({
        extended: true,
    }));
    importApp.listen(portNumber, () => console.log(`Example app listening on port ${portNumber}!`));
    importApp.get("/", (req, res) => {
        console.log("req.body", req.body);
        const { httpMethod } = req.body.input;
        const portNum = portNumber;
        let resp;
        if (req.body.input.body && req.body.input.queryStringParameters) {
            resp = Object.assign(Object.assign({}, req.body.input.queryStringParameters), req.body.input.body);
        }
        else if (req.body.input.body &&
            req.body.input.queryStringParameters === null) {
            resp = req.body.input.body;
        }
        else {
            resp = req.body.input.queryStringParameter;
        }
        inbound_calls_helper_1.default(portNum, httpMethod, resp);
    });
}
exports.default = startImportServer;
