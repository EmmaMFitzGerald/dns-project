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
Object.defineProperty(exports, "__esModule", { value: true });
const portscanner = require("portscanner");
function getAvailablePortNumber() {
    return __awaiter(this, void 0, void 0, function* () {
        // we need a promise
        return new Promise((resolve, reject) => {
            portscanner.findAPortNotInUse(3000, 3020, "127.0.0.1", (error, port) => {
                if (error) {
                    console.error("Oh well something went wrong");
                    reject(error);
                }
                else {
                    resolve(port);
                }
            });
        });
    });
}
exports.default = getAvailablePortNumber;
//# sourceMappingURL=port-number.helper.js.map