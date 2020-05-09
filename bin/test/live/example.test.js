"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable func-names */
var mocha_1 = require("mocha");
// eslint-disable-next-line import/extensions
var importServer_1 = __importDefault(require("../../import/importServer"));
// eslint-disable-next-line import/extensions
var cliServer_1 = __importDefault(require("../../cli/cliServer"));
var client_config_model_1 = __importDefault(require("../../models/client-config.model"));
var outbound_calls_helper_1 = require("../../helpers/outbound-calls.helper");
var port_number_helper_1 = __importDefault(require("../../helpers/port-number.helper"));
// describe("Cli Server Tests", () => {
//     it("should return 200 status code", async () => {
//         const res = await request(cliApp).get("/");
//         expect(res.status).to.equal(200);
//     });
//     it("should receive the api gateway url and port number and keep track of it", async () => {
//         const data = { apiUrl: "testUrl" };
//         const response = await postToServer("http://localhost:80", data);
//         expect(response.array.length).to.equal(1);
//     });
// });
mocha_1.describe("Import Server Tests", function () {
    //     it("should start the import server", async () => {
    //         await startImportServer();
    //         const res = await fetch("http://localhost:3000");
    //         console.log(res.status);
    //         expect(res.status).to.equal(200);
    //     });
    //     it("should start server on next available port and keep track of the port number", async () => {
    //         const data = { apiUrl: "AnotherUrl" };
    //         await postToServer("http://localhost:80", data);
    //         await startImportServer();
    //         // const res = await fetch("http://localhost:3001");
    //         // console.log(res.status);
    //         // expect(res.status).to.equal(200);
    //     });
    //     it("should return the info array", async () => {
    //         expect(info.length).to.equal(2)
    //     });
    mocha_1.it("test", function () { return __awaiter(void 0, void 0, void 0, function () {
        var portNumber, clientConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cliServer_1.default();
                    return [4 /*yield*/, port_number_helper_1.default()];
                case 1:
                    portNumber = _a.sent();
                    return [4 /*yield*/, importServer_1.default(portNumber)];
                case 2:
                    _a.sent();
                    clientConfig = new client_config_model_1.default("http://www.google.com", portNumber);
                    // // register this client config with the CLI server
                    return [4 /*yield*/, outbound_calls_helper_1.registerWithCli(clientConfig)];
                case 3:
                    // // register this client config with the CLI server
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
function lambdaFunction() {
    return 1;
}
