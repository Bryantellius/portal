"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_auth0_1 = __importDefault(require("passport-auth0"));
const auth0Strategy = new passport_auth0_1.default({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENTID,
    clientSecret: process.env.AUTH0_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
}, (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
});
exports.default = auth0Strategy;
//# sourceMappingURL=auth0Strategy.js.map