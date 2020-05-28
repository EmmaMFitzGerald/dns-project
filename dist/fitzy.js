"use strict";
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
const client_config_model_1 = require("./models/client-config.model");
const importServer_1 = require("./import/importServer");
const port_number_helper_1 = require("./helpers/port-number.helper");
const outbound_calls_helper_1 = require("./helpers/outbound-calls.helper");
// export default async function fitzy(
//     apiGatewayUrl: string,
//     lambdaFunction: any
// ): Promise<any> {
//     const portNumber = await getAvailablePortNumber();
//     await startImportServer(portNumber);
//     const clientConfig = new ClientConfig(apiGatewayUrl, portNumber);
//     registerWithCli(clientConfig);
//     await startDnsServer();
// }
function fitzy(apiGatewayUrl, lambdaFunction) {
    return __awaiter(this, void 0, void 0, function* () {
        const portNumber = yield port_number_helper_1.default();
        console.log("Acquired port number");
        yield importServer_1.default(portNumber, lambdaFunction);
        console.log("started ImportServer");
        const clientConfig = new client_config_model_1.default(apiGatewayUrl, portNumber);
        yield outbound_calls_helper_1.default(clientConfig);
        console.log("registered with CLI server");
    });
}
exports.default = fitzy;
//# sourceMappingURL=fitzy.js.map