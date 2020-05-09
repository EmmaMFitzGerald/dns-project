import { describe, it } from "mocha";
import * as dns from "native-dns";
import startDnsServer from "../../helpers/dns.helper";
import ClientConfig from "../../models/client-config.model";

describe("Import Server Tests", () => {
    it("test dns", () => {
        const clientConfig = new ClientConfig("http://www.google.com", 3000);
        startDnsServer(clientConfig);
    });
});
