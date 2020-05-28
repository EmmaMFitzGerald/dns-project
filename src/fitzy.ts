import ClientConfig from "./models/client-config.model";
import startImportServer from "./import/importServer";
import getAvailablePortNumber from "./helpers/port-number.helper";
import registerWithCli from "./helpers/outbound-calls.helper";
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
): Promise<void> {
    const portNumber = await getAvailablePortNumber();
    console.log("Acquired port number");

    await startImportServer(portNumber, lambdaFunction);
    console.log("started ImportServer");

    const clientConfig = new ClientConfig(apiGatewayUrl, portNumber);
    await registerWithCli(clientConfig);
    console.log("registered with CLI server");
}
