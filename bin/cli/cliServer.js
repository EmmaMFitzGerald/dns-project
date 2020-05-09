"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-explicit-any */
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
// import track from "../helpers/register.helper";
// import marshallCall from "../helpers/inbound-calls.helper";
// import { registerWithCli } from "../helpers/outbound-calls.helper";
function startCLIServer() {
    var cliApp = express_1.default();
    cliApp.use(body_parser_1.default.json());
    cliApp.use(body_parser_1.default.urlencoded({
        extended: true,
    }));
    cliApp.listen(80, function () { return console.log("Example app listening on port 80!"); });
    cliApp.get("/", function (_req, res) {
        return res.send({ "this is cli server": "testing" });
    });
    // this receives a clientConfig from outbound calls,
    cliApp.post("/register", function (req, res) {
        console.log("in the register", req.body); // req.body is a clientConfig object
        // track(req.body);
    });
}
exports.default = startCLIServer;
