// import { describe, it } from "mocha";
// import { expect } from "chai";
// import https from "https";
// import http from "http";
// import fetch from "node-fetch";
// import { helloWorld } from "../../lambda";
// import startImportServer from "../../import/importServer";
// import startCLIServer from "../../cli/cliServer";

// describe("Lambda function tests", () => {
//     it("starts calls helloWorld", async () => {
//         const hello = await helloWorld();
//         expect(hello.body).to.equal("hello world");
//     });
    
//     it("starts import server and calls helloworld", async () => {
//         startImportServer(3000);
//         http.get("http://localhost:3000");
//     });
    
//     it("posts to api", async () => {
//         startCLIServer();
//         const data = { test: "test" };
//         const config = {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         };
//         return fetch(
//             "https://ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world",
//             config
//         )
//             .then(
//                 (response: any): Promise<any> => {
//                     console.log(response);
//                     return response.json();
//                 }
//             )
//             .then((json) => {
//                 console.log(json);
//             });
//     });
//     it("get request to api", async () => {
//         const config = {
//             method: "GET",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//             },
//         };
//         return fetch(
//             "https://ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world",
//             config
//         )
//             .then(
//                 (response: any): Promise<any> => {
//                     console.log(response);
//                     return response.json();
//                 }
//             )
//             .then((json) => {
//                 console.log(json);
//             });
//     });
// });
