// // /* eslint-disable import/extensions */
// // /* eslint-disable func-names */
// import { describe, it } from "mocha";
// // import { expect } from "chai";
// // // eslint-disable-next-line import/extensions
// // import startImportServer from "../../import/importServer";
// // // eslint-disable-next-line import/extensions
// // import startCLIServer from "../../cli/cliServer";
// // import ClientConfig from "../../models/client-config.model";
// // import registerWithCli from "../../helpers/outbound-calls.helper";
// // import getAvailablePortNumber from "../../helpers/port-number.helper";
// // import marshallCall from "../../helpers/inbound-calls.helper";
// // import { registerArray } from "../../helpers/reg.helper";
// // // // describe("Cli Server Tests", () => {
// // // //     it("should return 200 status code", async () => {
// // // //         const res = await request(cliApp).get("/");

// import getAvailablePortNumber from "../../helpers/port-number.helper";
// import startImportServer from "../../import/importServer";
// import registerWithCli from "../../helpers/outbound-calls.helper";
// import ClientConfig from "../../models/client-config.model";
// import startCLIServer from "../../cli/cliServer";

// // // //         expect(res.status).to.equal(200);
// // // //     });

// // // //     it("should receive the api gateway url and port number and keep track of it", async () => {

// // // //         const data = { apiUrl: "testUrl" };
// // // //         const response = await postToServer("http://localhost:80", data);

// // // //         expect(response.array.length).to.equal(1);
// // // //     });
// // // // });

// describe("Import Server Tests", () => {
//     //     //     //     it("should start the import server", async () => {
//     //     //     //         await startImportServer();
//     //     //     //         const res = await fetch("http://localhost:3000");
//     //     //     //         console.log(res.status);
//     //     //     //         expect(res.status).to.equal(200);
//     //     //     //     });

//     //     //     //     it("should start server on next available port and keep track of the port number", async () => {
//     //     //     //         const data = { apiUrl: "AnotherUrl" };
//     //     //     //         await postToServer("http://localhost:80", data);
//     //     //     //         await startImportServer();
//     //     //     //         // const res = await fetch("http://localhost:3001");
//     //     //     //         // console.log(res.status);
//     //     //     //         // expect(res.status).to.equal(200);
//     //     //     //     });

//     //     //     //     it("should return the info array", async () => {
//     //     //     //         expect(info.length).to.equal(2)
//     //     //     //     });

//     // it("test", async () => {
//     //         startCLIServer();

//     //         //         // START ============1============2==============3============ END
//     //         //         //   XX         XX                  XX           X              XX
//     //         //         //   yy          yy   >> zz           yyy
//     //         //         //   aa   a     a    a   a     a  a   aaa    a   a aa  aa  aa  a

//     //         //         /*
//     //         //             import * as fitzy from "fitzy";
//     //         //             fityz.start("http://www.google.com", lambdaFunction());

//     //         //         */
//     //         //         // await determineApiUrl();

//     //         // const portNumber = await getImportServerPortNumber();
//     //         const portNumber = await getAvailablePortNumber();
//     //         await startImportServer(portNumber);
//     //         //         // b y here we should have a running local/import server
//     //         const clientConfig = new ClientConfig(
//     //             "http://www.google.com",
//     //             portNumber
//     //         );
//     //         //         // // register this client config with the CLI server
//     //         registerWithCli(clientConfig);
//     //         console.log(registerArray);
//     //         //         // testMyLocalServerIsResponding();
//     //         //         // testTheCliServerMarshallsACallToMyFunction();

//     //         //         // const clientConfigur = await register.lookup("http://www.123.com"); // port number or undefined;
//     //         //         // if (clientConfigur) {
//     //         //         //     console.log("reached the registeWithCli");
//     //         //         //     registerWithCli(clientConfigur);
//     //         //         // }
//     //         //         // const httpMethod = "GET";
//     //         //         // const body = {};

//     //         //         // marshallCall();

//     //         //         // if (portNum) {
//     //         //         // POST the query paramters and the BODY params
//     //         //         // } else {
//     //         //         //     // fw this request to the DNS stuff
//     //         //         //     // DNS look up 123.com and continue
//     //         //         // }
//     //         //     });
//     //     });

//     it("test", async () => {
//         console.log("starting test");
//         //         // START ============1============2==============3============ END
//         //         //   XX         XX                  XX           X              XX
//         //         //   yy          yy   >> zz           yyy
//         //         //   aa   a     a    a   a     a  a   aaa    a   a aa  aa  aa  a

//         //         /*
//         //             import * as fitzy from "fitzy";
//         //             fityz.start("http://www.google.com", lambdaFunction());

//         //         */
//         //         // await determineApiUrl();
//         await startCLIServer();
//         const portNumber = await getAvailablePortNumber();
//         await startImportServer(portNumber);

//         const clientConfig = new ClientConfig(
//             "https://ksgtgllggj.execute-api.us-east-1.amazonaws.com/dev/hello-world",
//             portNumber
//         );

//         registerWithCli(clientConfig);
//     });
// });
