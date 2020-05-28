import { URL } from "url";
import ClientConfig from "../models/client-config.model";

export const registerArray: Array<{
    hostName: string;
    localPortNumber: number;
}> = [];

export function track(config: ClientConfig): void {
    const suppliedUrl = new URL(config.apiGatewayUrl);

    registerArray.push({
        hostName: suppliedUrl.hostname,
        localPortNumber: config.localPortNumber,
    });

    console.log("registered domains is now:", registerArray);
}
