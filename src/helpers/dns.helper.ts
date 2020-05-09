/* eslint-disable @typescript-eslint/no-explicit-any */
import * as dns from "native-dns";
import * as async from "async";
import ClientConfig from "../models/client-config.model";

const authority = { address: "8.8.8.8", port: 53, type: "udp" };
let clientConfig: ClientConfig;

function proxy(question: any, response: any, cb: any): void {
    console.log("proxying", question.name);

    const str = clientConfig.apiGatewayUrl;
    const cutString = str.substring(11, str.length);

    console.log("Split", cutString);
    if (cutString === question.name) {
        const request = dns.Request({
            question, // forwarding the question
            server: {
                address: "127.0.0.1",
                port: clientConfig.localPortNumber,
                type: "udp",
            }, // this is the DNS server we are asking
            timeout: 1000,
        });
        request.on("message", (err: any, msg: any) => {
            msg.answer.forEach((a: any) => response.answer.push(a));
        });

        request.on("end", cb);
        request.send();
    } else {
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

    // when we get answers,
}

function handleRequest(request: any, response: any): void {
    console.log(
        "request from",
        request.address.address,
        "for",
        request.question[0].name
    );

    console.log("REQ.QUES", request.question);
    // console.log("clientConfig", clientConfig);
    const f: any = []; // array of functions

    // proxy all questions
    // since proxying is asynchronous, store all callbacks
    request.question.forEach((question: any) => {
        // console.log("ques:", question, "resp", response);
        f.push((cb: any) => proxy(question, response, cb));
    });

    // do the proxying in parallel
    // when done, respond to the request by sending the response
    async.parallel(f, () => {
        response.send();
    });
}

export default function startDnsServer(clientConfigur: ClientConfig): any {
    // console.log("clientConfig", clientConfig);
    clientConfig = clientConfigur;
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
