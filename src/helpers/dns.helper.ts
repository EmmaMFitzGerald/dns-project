/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as dns from "native-dns";
import * as async from "async";
import { EventEmitter } from "events";
import { Server } from "http";
import { registerArray } from "./reg.helper";

const eventEmitter = new EventEmitter();

const authority = { address: "8.8.8.8", port: 53, type: "udp" };

function proxy(question: any, response: any, cb: any): void {
    console.log("proxying", question);
    // console.log("registerArray in proxy", registerArray);

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
    console.log("this is the name to compare to ", request.question[0].name);
    const f: any = []; // array of functions
    const result = registerArray.find(
        (url) => url.apiGatewayUrl === request.question[0].name
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
        f.push((cb: any) => proxy(request.question[0].name, response, cb));
    }

    // request.question.forEach((question: any) => {
    //     registerArray.forEach((clientConfig: ClientConfig) => {
    //         const newUrl = new URL(clientConfig.apiGatewayUrl);
    //         const myUrl = newUrl.host + newUrl.pathname;
    //         // const myUrl = newUrl.host;
    //         // const myUrl = newUrl.origin;
    //         if (
    //             newUrl == question.name ||
    //             newUrl.href == question.name ||
    //             newUrl.hostname == question.name ||
    //             newUrl.origin == question.name ||
    //             myUrl == question.name
    //         ) {
    //             const override: any = {};
    //             override.name = question.name;
    //             override.address = "127.0.0.1";
    //             override.ttl = 600;
    //             override.port = clientConfig.localPortNumber;
    //             eventEmitter.emit(
    //                 "domainIntercepted",
    //                 override.name,
    //                 override.address
    //             );
    //             // find a way to call resolveHook
    //             // resolveHook(newUrl.host, ip)
    //             response.answer.push(dns.A(override));
    //         } else {
    //             f.push((cb: any) => proxy(question, response, cb));
    //         }
    //     });
    // });

    async.parallel(f, () => {
        console.log("response in async.parallel", response.answer[0].name);
        console.log(response.answer[0].address);
        response.send();
    });
}

export default function startDnsServer(
    resolveHook: (domainName: string, ipAddress: string) => void
): any {
    const server = dns.createServer();

    server.on("listening", () =>
        console.log("server listening on", server.address())
    );

    server.on("close", () => console.log("server closed", server.address()));

    server.on("error", (err: any, buff: any, req: any, res: any) =>
        console.error(err.stack)
    );

    server.on("socketError", (err: any, socket: any) => console.error(err));

    /*
        resolveHook is a func the user passed in
        handleRequest is a func that is handlign the server.on/request message

        I need to give handleRequest my resolveHook function too
        so that when handlRequest actually handles something, it can call resolveHook(domainName, ipAddress);
    */

    eventEmitter.on("domainIntercepted", resolveHook);

    server.on("request", handleRequest);

    server.serve(53);
}
