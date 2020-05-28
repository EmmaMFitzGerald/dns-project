/* eslint-disable import/extensions */
// Outbound calls are from the package as as import to the CLI server

import ClientConfig from "../models/client-config.model";
import makeRequest from "./fetch.helper";

/**
 * Registers an import server with the CLI server
 */

export default async function registerWithCli(
    clientConfig: ClientConfig
): Promise<any> {
    return makeRequest("https://localhost/register", {
        apiGatewayUrl: clientConfig.apiGatewayUrl,
        localPortNumber: clientConfig.localPortNumber,
    });
}
