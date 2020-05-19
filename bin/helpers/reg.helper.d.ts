import ClientConfig from "../models/client-config.model";
export declare const registerArray: Array<ClientConfig>;
export declare function track(apiUrlPortNumber: ClientConfig): void;
export declare function lookup(url: string): number | undefined;
