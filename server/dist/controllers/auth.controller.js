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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("../utils/security/tokens");
const models_1 = __importDefault(require("../db/models"));
const mailgun_1 = require("../utils/mail/mailgun");
const passwords_1 = require("../utils/security/passwords");
const listRoles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield models_1.default.Role.findAll();
    res.json(roles);
});
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const createUserResult = yield models_1.default.User.create(user);
        const userId = parseInt(createUserResult.get('id'));
        const accessToken = yield tokens_1.CreateToken({ userid: parseInt(createUserResult.get('id')) });
        const changePasswordLink = `http://localhost:3000/auth/password-reset?userId=${userId}&token=${accessToken}`;
        // Production:
        // const link = `https://app.truecoders.io/update/${token}&${result.insertId}`;
        // Email user with link to update password
        const sendEmailResult = yield mailgun_1.sendEmail(user.email, "Create Password", changePasswordLink);
        res.json({
            token: accessToken,
            msg: "User updated!",
            user: userId
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(false);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        delete req.user.password;
        const token = yield tokens_1.CreateToken({ userid: req.user.UserID });
        res.json({
            token,
            user: req.user,
        });
    }
    catch (error) {
        console.log("Incorrect Log In!");
        res.status(500).json(false);
    }
});
const bulkRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files) {
            res.json({ msg: "no go bro" });
            return;
        }
        const { roleID, courseID } = req.body;
        const csv = req.files.csv.data.toString().split("\n");
        const columns = csv[0].split(",");
        const subscribeTasks = Promise.all(csv.map((record, i) => __awaiter(void 0, void 0, void 0, function* () {
            if (i === 0) {
                return;
            }
            const user = {};
            record.split(",").forEach((col, idx) => {
                user[columns[idx]] = col;
            });
            user.roleID = roleID;
            user.password = "temp";
            const createUserResult = yield models_1.default.User.create(user);
            const userId = parseInt(createUserResult.get('id'));
            const classSubscribeResult = yield models_1.default.ClassList.create({
                courseID: courseID,
                userID: userId
            });
            const accessToken = yield tokens_1.CreateToken({ userid: userId });
            // Development:
            const link = `http://localhost:3000/auth/reset-password?userId=${userId}&token=${accessToken}`;
            // Production:
            // const link = `https://app.truecoders.io/update/${token}&${result.insertId}`;
            // Email user with link to update password
            const emailResult = yield mailgun_1.sendEmail(user.email, "Create Password", link);
        })));
        yield subscribeTasks;
        res.json({ msg: "Received csv" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(false);
    }
});
const startPasswordReset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const userResult = yield models_1.default.User.findOne({
            where: {
                email: email
            }
        });
        const userId = parseInt(userResult.get('id'));
        const accessToken = yield tokens_1.CreateToken({ userid: userId });
        const link = `http://localhost:3000/auth/reset-password?userId=${userId}&token=${accessToken}`;
        // Email user with link to update password
        const emailResult = yield mailgun_1.sendEmail(email, "Reset Password", link);
        res.json({
            accessToken,
            msg: "Password reset link sent successfully",
            user: userResult,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(false);
    }
});
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body.user;
    const { token } = req.body.creds;
    const userId = parseInt(req.body.creds.userId.toString());
    const isAuthenticated = yield tokens_1.ValidToken(token);
    if (!isAuthenticated) {
        throw new Error("Invalid token. Please try again later.");
    }
    const userUpdateModel = {
        id: userId,
        password: passwords_1.hashPassword(password)
    };
    const updateResult = yield models_1.default.User.update(userUpdateModel, {
        where: {
            id: userId
        }
    });
    res.json(updateResult);
});
exports.default = {
    login,
    register,
    bulkRegister,
    resetPassword,
    startPasswordReset,
    listRoles
};
//# sourceMappingURL=auth.controller.js.map