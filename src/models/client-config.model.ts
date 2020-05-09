export default class ClientConfig {
    public apiGatewayUrl: string;

    public localPortNumber: number;

    constructor(apiGatewayUrl: string, localPortNumber: number) {
        this.apiGatewayUrl = apiGatewayUrl;
        this.localPortNumber = localPortNumber;
    }
}
