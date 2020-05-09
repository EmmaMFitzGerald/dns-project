// eslint-disable-next-line import/extensions
import ClientConfig from "../models/client-config.model";

export default class Register {
    registerArray: Array<ClientConfig> = [];

    track(apiUrlPortNumber: ClientConfig): void {
        this.registerArray.push(apiUrlPortNumber);
        console.log(this.registerArray);
    }

    lookup(url: string): ClientConfig | undefined {
        const foundClientConfig = this.registerArray.find(
            (object) => object.apiGatewayUrl === url
        );
        if (foundClientConfig) {
            return foundClientConfig;
        }
        return undefined;
    }
}
