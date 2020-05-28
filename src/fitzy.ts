/* eslint-disable import/extensions */
import dns from "dns";
import ClientConfig from "./models/client-config.model";
import startImportServer from "./import/importServer";
import getAvailablePortNumber from "./helpers/port-number.helper";
import registerWithCli from "./helpers/outbound-calls.helper";
import startDnsServer from "./helpers/dns.helper";
import startCLIServer from "./cli/cliServer";
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

export default async function fitzy(
    apiGatewayUrl: string,
    lambdaFunction: any
): Promise<any> {
    const portNumber = await getAvailablePortNumber();
    await startImportServer(portNumber, lambdaFunction);
    const clientConfig = new ClientConfig(apiGatewayUrl, portNumber);
    registerWithCli(clientConfig);
    // await startDnsServer();
}
