"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const authenticateUser = (req, res, next) => {
    passport_1.default.authenticate("bearer", { session: false }, (err, user, info) => {
        if (user) {
            req.user = user;
        }
        return next();
    })(req, res, next);
};
exports.default = authenticateUser;
//# sourceMappingURL=auth.js.map