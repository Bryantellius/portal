"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = __importDefault(require("../query"));
const findToken = (tokenid, token) => {
    return query_1.default("SELECT * FROM AccessTokens WHERE TokenID = ? AND Token = ?", [
        tokenid,
        token,
    ]);
};
const findTokenByVal = (token) => {
    return query_1.default("SELECT * FROM AccessTokens WHERE Token = ?", [token]);
};
const addToken = (userid) => {
    return query_1.default("INSERT INTO AccessTokens SET UserID = ?", [userid]);
};
const updateToken = (TokenID, token) => {
    return query_1.default("UPDATE AccessTokens SET token = ? WHERE TokenID = ?", [
        token,
        TokenID,
    ]);
};
exports.default = {
    findToken,
    findTokenByVal,
    addToken,
    updateToken,
};
//# sourceMappingURL=tokens.js.map