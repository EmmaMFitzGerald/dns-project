"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var dns_helper_1 = __importDefault(require("../../helpers/dns.helper"));
var client_config_model_1 = __importDefault(require("../../models/client-config.model"));
mocha_1.describe("Import Server Tests", function () {
    mocha_1.it("test dns", function () {
        var clientConfig = new client_config_model_1.default("http://www.google.com", 3000);
        dns_helper_1.default(clientConfig);
    });
});
