/* eslint-disable import/extensions */
// Outbound calls are from the package as as import to the CLI server

import ClientConfig from "../models/client-config.model";
import makeRequest from "./fetch.helper";

/**
 * Registers an import server with the CLI server
 */
// eslint-disable-next-line import/prefer-default-export
export async function registerWithCli(
    clientConfig: ClientConfig
): Promise<any> {
    // api url, and port number
    return makeRequest("http://localhost:80/register", {
        apiGatewayUrl: clientConfig.apiGatewayUrl,
        localPortNumber: clientConfig.localPortNumber,
    });
}
