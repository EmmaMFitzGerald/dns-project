"use strict";
/* eslint-disable import/extensions */
// Outbound calls are from the package as as import to the CLI server
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_helper_1 = require("./fetch.helper");
/**
 * Registers an import server with the CLI server
 */
function registerWithCli(clientConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch_helper_1.default("https://localhost/register", {
            apiGatewayUrl: clientConfig.apiGatewayUrl,
            localPortNumber: clientConfig.localPortNumber,
        });
    });
}
exports.default = registerWithCli;
//# sourceMappingURL=outbound-calls.helper.js.map