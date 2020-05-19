/* eslint-disable eqeqeq */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as dns from "native-dns";
import * as async from "async";
import ClientConfig from "../models/client-config.model";
import { registerArray } from "./reg.helper";

const authority = { address: "8.8.8.8", port: 53, type: "udp" };

function proxy(question: any, response: any, cb: any): void {
    console.log("proxying", question.name);
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
    // console.log(
    //     "request from",
    //     request.address.address,
    //     "for",
    //     request.question[0].name
    // );
    console.log("reg array", registerArray);
    console.log("req.ques", request.question);

    const f: any = []; // array of functions

    request.question.forEach((question: any) => {
        registerArray.forEach((clientConfig: ClientConfig) => {
            const newUrl = new URL(clientConfig.apiGatewayUrl);
            const myUrl = newUrl.host + newUrl.pathname;
            if (myUrl == question.name || newUrl.href == question.name) {
                const override: any = {};
                override.name = question.name;
                override.address = "127.0.0.1";
                override.ttl = 600;
                override.port = clientConfig.localPortNumber;
                response.answer.push(dns.A(override));
            } else {
                f.push((cb: any) => proxy(question, response, cb));
            }
        });
    });

    async.parallel(f, () => {
        console.log(response.answer[0].address);
        response.send();
    });
}

export default function startDnsServer(): any {
    const server = dns.createServer();

    server.on("listening", () =>
        console.log("server listening on", server.address())
    );

    server.on("close", () => console.log("server closed", server.address()));

    server.on("error", (err: any, buff: any, req: any, res: any) =>
        console.error(err.stack)
    );

    server.on("socketError", (err: any, socket: any) => console.error(err));

    server.on("request", handleRequest);

    server.serve(53);
}
