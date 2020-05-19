"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const reg_helper_1 = require("../helpers/reg.helper");
function startCLIServer() {
    const cliApp = express_1.default();
    cliApp.use(body_parser_1.default.json());
    cliApp.use(body_parser_1.default.urlencoded({
        extended: true,
    }));
    cliApp.listen(80, () => console.log("Example app listening on port 80!"));
    cliApp.get("/", (_req, res) => res.send({ "this is cli server": "testing" }));
    // this receives a clientConfig from outbound calls,
    cliApp.post("/register", (req, res) => {
        reg_helper_1.track(req.body);
    });
}
exports.default = startCLIServer;
