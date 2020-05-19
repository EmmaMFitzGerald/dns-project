"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_config_model_1 = __importDefault(require("./models/client-config.model"));
const importServer_1 = __importDefault(require("./import/importServer"));
const port_number_helper_1 = __importDefault(require("./helpers/port-number.helper"));
const outbound_calls_helper_1 = __importDefault(require("./helpers/outbound-calls.helper"));
const dns_helper_1 = __importDefault(require("./helpers/dns.helper"));
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
async function fitzy(apiGatewayUrl, lambdaFunction) {
    const portNumber = await port_number_helper_1.default();
    await importServer_1.default(portNumber);
    const clientConfig = new client_config_model_1.default(apiGatewayUrl, portNumber);
    outbound_calls_helper_1.default(clientConfig);
    await dns_helper_1.default();
}
exports.default = fitzy;
