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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var config_1 = require("../config");
var authService_1 = require("./authService");
var authService = new authService_1.default();
var ApiClient = /** @class */ (function () {
    function ApiClient(config) {
        this.client = axios_1.default.create({
            baseURL: config_1.default.apiRoot,
            timeout: config_1.default.apiTimeout || 1000,
            headers: {
                "Content-Type": "application/json"
            }
        });
        var savedToken = localStorage.getItem("token"), savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedToken !== undefined
            && savedUser !== undefined) {
            this.persistAuth(savedToken, savedUser);
        }
        this.initInterceptors();
    }
    Object.defineProperty(ApiClient.prototype, "isAuthenticated", {
        get: function () {
            return this.accessToken !== undefined
                && this.user !== undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiClient.prototype, "accessToken", {
        get: function () {
            return localStorage.getItem("token");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiClient.prototype, "user", {
        get: function () {
            var userJSON = localStorage.getItem("user");
            if (!userJSON)
                return null;
            return JSON.parse(userJSON);
        },
        enumerable: false,
        configurable: true
    });
    ApiClient.prototype.authenticate = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, authResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        credentials = {
                            email: email,
                            password: password
                        };
                        return [4 /*yield*/, this.post("/auth/login", credentials)];
                    case 1:
                        authResponse = _a.sent();
                        if (authResponse && authResponse.token) {
                            this.persistAuth(authResponse.token, authResponse.user);
                        }
                        return [2 /*return*/, authResponse.data];
                }
            });
        });
    };
    ApiClient.prototype.get = function (url, config) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.get(url, config)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    ApiClient.prototype.put = function (url, data, config) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.put(url, data, config)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    ApiClient.prototype.post = function (url, data, config) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.post(url, data, config)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    ApiClient.prototype.delete = function (url, config) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.delete(url, config)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    ApiClient.prototype.options = function (url, config) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.options(url, config)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    ApiClient.prototype.persistAuth = function (accessToken, user) {
        localStorage.setItem("token", this.accessToken);
        localStorage.setItem("user", JSON.stringify(this.user));
        this.client.defaults.headers.common["Authorization"] = "Bearer " + this.accessToken;
    };
    ApiClient.prototype.handleAuthError = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            var originalRequest;
            return __generator(this, function (_a) {
                originalRequest = error.config;
                switch (error.response.status) {
                    case 401:
                    case 403:
                        authService.logout();
                        throw new Error("You are not logged in.");
                    default:
                        throw new Error("Unknown error in api call");
                }
                return [2 /*return*/];
            });
        });
    };
    ApiClient.prototype.initInterceptors = function () {
        var _this = this;
        this.client.interceptors.response.use(function (response) { return response; }, function (error) { return _this.handleAuthError(error); });
    };
    return ApiClient;
}());
exports.default = ApiClient;
