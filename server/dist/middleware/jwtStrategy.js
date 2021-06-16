"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const jwtStrategy = new passport_jwt_1.default.Strategy({
    jwtFromRequest: (req) => req.session.jwt,
    secretOrKey: process.env.SECRET_KEY,
}, (payload, done) => {
    return done(null, payload);
});
exports.default = jwtStrategy;
//# sourceMappingURL=jwtStrategy.js.map