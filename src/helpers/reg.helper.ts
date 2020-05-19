import ClientConfig from "../models/client-config.model";

export const registerArray: Array<ClientConfig> = [];

export function track(apiUrlPortNumber: ClientConfig): void {
    registerArray.push(apiUrlPortNumber);
    // console.log("regArray", registerArray);
}

export function lookup(url: string): number | undefined {
    const foundClientConfig = registerArray.find(
        (object) => object.apiGatewayUrl === url
    );
    if (foundClientConfig) {
        return foundClientConfig.localPortNumber;
    }
    return undefined;
}
