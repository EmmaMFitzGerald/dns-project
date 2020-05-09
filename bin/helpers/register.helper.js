"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Register = /** @class */ (function () {
    function Register() {
        this.registerArray = [];
    }
    Register.prototype.track = function (apiUrlPortNumber) {
        this.registerArray.push(apiUrlPortNumber);
        console.log(this.registerArray);
    };
    Register.prototype.lookup = function (url) {
        var foundClientConfig = this.registerArray.find(function (object) { return object.apiGatewayUrl === url; });
        if (foundClientConfig) {
            return foundClientConfig;
        }
        return undefined;
    };
    return Register;
}());
exports.default = Register;
