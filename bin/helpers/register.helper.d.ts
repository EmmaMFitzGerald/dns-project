import ClientConfig from "../models/client-config.model";
export default class Register {
    registerArray: Array<ClientConfig>;
    track(apiUrlPortNumber: ClientConfig): void;
    lookup(url: string): ClientConfig | undefined;
}
