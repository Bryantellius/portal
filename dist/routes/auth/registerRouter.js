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
var express = require("express");
var fileUpload = require("express-fileupload");
var users_1 = require("../../db/queries/users");
var tokens_1 = require("../../db/queries/tokens");
var tokens_2 = require("../../utils/security/tokens");
var passwords_1 = require("../../utils/security/passwords");
var mailgun_1 = require("../../utils/mail/mailgun");
var router = express.Router();
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, classSub, token, link, emailResult, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                req.body.user.password = "temp";
                return [4 /*yield*/, users_1.default.insertUser(req.body.user)];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, users_1.default.insertUserToCourseList({
                        CourseID: req.body.classlist.CourseID,
                        UserID: result.insertId,
                    })];
            case 2:
                classSub = _a.sent();
                return [4 /*yield*/, tokens_2.CreateToken({ userid: result.insertId })];
            case 3:
                token = _a.sent();
                link = "http://localhost:3000/update/" + token + "&" + result.insertId;
                return [4 /*yield*/, mailgun_1.sendEmail(req.body.user.email, "Create Password", link)];
            case 4:
                emailResult = _a.sent();
                res.json({
                    token: token,
                    msg: "User updated!",
                    user: result.insertId,
                });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).json(false);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.use(fileUpload());
router.post("/bulk", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, RoleID, CourseID, csv, columns;
    return __generator(this, function (_b) {
        if (!req.files) {
            res.json({ msg: "no go bro" });
            return [2 /*return*/];
        }
        _a = req.body, RoleID = _a.RoleID, CourseID = _a.CourseID;
        csv = req.files.csv.data.toString().split("\n");
        columns = csv[0].split(",");
        csv.forEach(function (record, i) {
            if (i === 0) {
                return;
            }
            var user = {};
            record.split(",").forEach(function (col, idx) {
                user[columns[idx]] = col;
            });
            try {
                (function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result, classSub, token, link, emailResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                user.RoleID = RoleID;
                                user.password = "temp";
                                return [4 /*yield*/, users_1.default.insertUser(user)];
                            case 1:
                                result = _a.sent();
                                return [4 /*yield*/, users_1.default.insertUserToCourseList({
                                        CourseID: CourseID,
                                        UserID: result.insertId,
                                    })];
                            case 2:
                                classSub = _a.sent();
                                return [4 /*yield*/, tokens_2.CreateToken({ userid: result.insertId })];
                            case 3:
                                token = _a.sent();
                                link = "http://localhost:3000/update/" + token + "&" + result.insertId;
                                return [4 /*yield*/, mailgun_1.sendEmail(user.Email, "Create Password", link)];
                            case 4:
                                emailResult = _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
            catch (error) {
                console.log(error);
                res.status(500).json(false);
            }
        });
        res.json({ msg: "Received csv" });
        return [2 /*return*/];
    });
}); });
router.post("/reset", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, token, link, emailResult, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, users_1.default.findOneUserByEmail(req.body.email)];
            case 1:
                result = (_a.sent())[0];
                return [4 /*yield*/, tokens_2.CreateToken({ userid: result.insertId })];
            case 2:
                token = _a.sent();
                link = "http://localhost:3000/update/" + token + "&" + result.UserID;
                return [4 /*yield*/, mailgun_1.sendEmail(req.body.email, "Reset Password", link)];
            case 3:
                emailResult = _a.sent();
                res.json({
                    token: token,
                    msg: "User created!",
                    user: result,
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(500).json(false);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.put("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var inDatabase, password, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, tokens_1.default.findTokenByVal(req.body.creds.token)];
            case 1:
                inDatabase = _a.sent();
                if (!(inDatabase.length > 0)) return [3 /*break*/, 3];
                delete req.body.user.email;
                password = req.body.user.password;
                req.body.user.password = passwords_1.hashPassword(password);
                return [4 /*yield*/, users_1.default.updateUser(parseInt(req.body.creds.UserID), req.body.user)];
            case 2:
                result = _a.sent();
                res.json({
                    successful: inDatabase.length > 0,
                    msg: "User account created!",
                });
                return [3 /*break*/, 4];
            case 3:
                res.json({ msg: "User cannot update information." });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(500).json(false);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=registerRouter.js.map