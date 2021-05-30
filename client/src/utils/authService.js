"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.saveCredentials = function (accessToken, user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", accessToken);
        axios_1.default.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
    };
    AuthService.prototype.logout = function () {
        delete axios_1.default.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };
    AuthService.prototype.getUser = function () {
        return JSON.parse(localStorage.getItem("user"));
    };
    AuthService.prototype.getToken = function () {
        return localStorage.getItem("token");
    };
    return AuthService;
}());
exports.default = AuthService;
