"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serverUrl = "http://localhost:3000";
var clientConfig = {
    serverUrl: serverUrl,
    apiRoot: serverUrl + "/api",
    apiTimeout: 10000
};
exports.default = clientConfig;
