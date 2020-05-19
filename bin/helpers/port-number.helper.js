"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const portscanner_1 = __importDefault(require("portscanner"));
async function getAvailablePortNumber() {
    // we need a promise
    return new Promise((resolve, reject) => {
        portscanner_1.default.findAPortNotInUse(3000, 3020, "127.0.0.1", (error, port) => {
            if (error) {
                console.error("Oh well something went wrong");
                reject(error);
            }
            else {
                resolve(port);
            }
        });
    });
}
exports.default = getAvailablePortNumber;
