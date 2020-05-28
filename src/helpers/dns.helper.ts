/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as dns from "native-dns";
import * as async from "async";
import { EventEmitter } from "events";
import { registerArray } from "./reg.helper";

const eventEmitter = new EventEmitter();

let server: any;

const authority = { address: "8.8.8.8", port: 53, type: "udp" };

function proxy(question: any, response: any, cb: any): void {
    console.log("proxying", question);
    console.log("registerArray in proxy", registerArray);

    const request = dns.Request({
        question, // forwarding the question
        server: authority, // this is the DNS server we are asking
        timeout: 1000,
    });

    request.on("message", (err: any, msg: any) => {
        msg.answer.forEach((a: any) => response.answer.push(a));
    });

    request.on("end", cb);
    request.send();
}

export function handleRequest(request: any, response: any): void {
    console.log("this is the name to compare to", request.question[0].name);
    const f: any = []; // array of functions

    const result = registerArray.find(
        (url) => url.hostName === request.question[0].name
    );

    if (result !== undefined) {
        const override: any = {};
        override.name = request.question[0].name;
        override.address = "127.0.0.1";
        override.ttl = 600;
        eventEmitter.emit("domainIntercepted", override.name, override.address);
        // find a way to call resolveHook
        // resolveHook(newUrl.host, ip)
        response.answer.push(dns.A(override));
    } else {
        console.log("going to have to proxy this", request.question[0].name);
        f.push((cb: any) => proxy(request.question[0], response, cb));
    }

    async.parallel(f, () => {
        // console.log("response in async.parallel", response.answer[0].name);
        // console.log(response.answer[0].address);
        response.send();
    });
}

export default async function startDnsServer(
    resolveHook: (domainName: string, ipAddress: string) => void
): Promise<any> {
    return new Promise((resolve, reject) => {
        server = dns.createServer();

        server.on("listening", () => {
            console.log("DNS server listening on", server.address());

            server.on("error", (err: any, buff: any, req: any, res: any) => {
                console.error("error:");

                console.error(err.stack);
            });

            server.on("socketError", (err: any, socket: any) => {
                console.error("socketError:");
                console.error(err);
            });

            eventEmitter.on("domainIntercepted", resolveHook);

            server.on("request", handleRequest);

            resolve();
        });

        server.serve(53);
    });
}

export async function shutdownDnsServer(): Promise<void> {
    console.log("Closing DNS server");
    server.close();
}

export function getServer(): any {
    return server;
}
