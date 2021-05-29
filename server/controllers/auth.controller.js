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
exports.__esModule = true;
var tokens_1 = require("../utils/security/tokens");
var models_1 = require("../db/models");
var mailgun_1 = require("../utils/mail/mailgun");
var passwords_1 = require("../utils/security/passwords");
var listRoles = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var roles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1["default"].Role.findAll()];
            case 1:
                roles = _a.sent();
                res.json(roles);
                return [2 /*return*/];
        }
    });
}); };
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, createUserResult, userId, accessToken, changePasswordLink, sendEmailResult, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                user = req.body;
                return [4 /*yield*/, models_1["default"].User.create(user)];
            case 1:
                createUserResult = _a.sent();
                userId = parseInt(createUserResult.get('id'));
                return [4 /*yield*/, tokens_1.CreateToken({ userid: parseInt(createUserResult.get('id')) })];
            case 2:
                accessToken = _a.sent();
                changePasswordLink = "http://localhost:3000/auth/password-reset?userId=" + userId + "&token=" + accessToken;
                return [4 /*yield*/, mailgun_1.sendEmail(user.email, "Create Password", changePasswordLink)];
            case 3:
                sendEmailResult = _a.sent();
                res.json({
                    token: accessToken,
                    msg: "User updated!",
                    user: userId
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).json(false);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                delete req.user.password;
                return [4 /*yield*/, tokens_1.CreateToken({ userid: req.user.UserID })];
            case 1:
                token = _a.sent();
                res.json({
                    token: token,
                    user: req.user
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log("Incorrect Log In!");
                res.status(500).json(false);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var bulkRegister = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, roleID_1, courseID_1, csv, columns_1, subscribeTasks, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                if (!req.files) {
                    res.json({ msg: "no go bro" });
                    return [2 /*return*/];
                }
                _a = req.body, roleID_1 = _a.roleID, courseID_1 = _a.courseID;
                csv = req.files.csv.data.toString().split("\n");
                columns_1 = csv[0].split(",");
                subscribeTasks = Promise.all(csv.map(function (record, i) { return __awaiter(void 0, void 0, void 0, function () {
                    var user, createUserResult, userId, classSubscribeResult, accessToken, link, emailResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (i === 0) {
                                    return [2 /*return*/];
                                }
                                user = {};
                                record.split(",").forEach(function (col, idx) {
                                    user[columns_1[idx]] = col;
                                });
                                user.roleID = roleID_1;
                                user.password = "temp";
                                return [4 /*yield*/, models_1["default"].User.create(user)];
                            case 1:
                                createUserResult = _a.sent();
                                userId = parseInt(createUserResult.get('id'));
                                return [4 /*yield*/, models_1["default"].ClassList.create({
                                        courseID: courseID_1,
                                        userID: userId
                                    })];
                            case 2:
                                classSubscribeResult = _a.sent();
                                return [4 /*yield*/, tokens_1.CreateToken({ userid: userId })];
                            case 3:
                                accessToken = _a.sent();
                                link = "http://localhost:3000/auth/reset-password?userId=" + userId + "&token=" + accessToken;
                                return [4 /*yield*/, mailgun_1.sendEmail(user.email, "Create Password", link)];
                            case 4:
                                emailResult = _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }));
                return [4 /*yield*/, subscribeTasks];
            case 1:
                _b.sent();
                res.json({ msg: "Received csv" });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.log(error_3);
                res.status(500).json(false);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var startPasswordReset = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, userResult, userId, accessToken, link, emailResult, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                email = req.body.email;
                return [4 /*yield*/, models_1["default"].User.findOne({
                        where: {
                            email: email
                        }
                    })];
            case 1:
                userResult = _a.sent();
                userId = parseInt(userResult.get('id'));
                return [4 /*yield*/, tokens_1.CreateToken({ userid: userId })];
            case 2:
                accessToken = _a.sent();
                link = "http://localhost:3000/auth/reset-password?userId=" + userId + "&token=" + accessToken;
                return [4 /*yield*/, mailgun_1.sendEmail(email, "Reset Password", link)];
            case 3:
                emailResult = _a.sent();
                res.json({
                    accessToken: accessToken,
                    msg: "Password reset link sent successfully",
                    user: userResult
                });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.log(error_4);
                res.status(500).json(false);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var resetPassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var password, token, userId, isAuthenticated, userUpdateModel, updateResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = req.body.user.password;
                token = req.body.creds.token;
                userId = parseInt(req.body.creds.userId.toString());
                return [4 /*yield*/, tokens_1.ValidToken(token)];
            case 1:
                isAuthenticated = _a.sent();
                if (!isAuthenticated) {
                    throw new Error("Invalid token. Please try again later.");
                }
                userUpdateModel = {
                    id: userId,
                    password: passwords_1.hashPassword(password)
                };
                return [4 /*yield*/, models_1["default"].User.update(userUpdateModel, {
                        where: {
                            id: userId
                        }
                    })];
            case 2:
                updateResult = _a.sent();
                res.json(updateResult);
                return [2 /*return*/];
        }
    });
}); };
exports["default"] = {
    login: login,
    register: register,
    bulkRegister: bulkRegister,
    resetPassword: resetPassword,
    startPasswordReset: startPasswordReset,
    listRoles: listRoles
};
