"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var findToken = function (tokenid, token) {
    return models_1.default("SELECT * FROM AccessTokens WHERE TokenID = ? AND Token = ?", [
        tokenid,
        token,
    ]);
};
var findTokenByVal = function (token) {
    return models_1.default("SELECT * FROM AccessTokens WHERE Token = ?", [token]);
};
var addToken = function (userid) {
    return models_1.default("INSERT INTO AccessTokens SET UserID = ?", [userid]);
};
var updateToken = function (TokenID, token) {
    return models_1.default("UPDATE AccessTokens SET token = ? WHERE TokenID = ?", [
        token,
        TokenID,
    ]);
};
exports.default = {
    findToken: findToken,
    findTokenByVal: findTokenByVal,
    addToken: addToken,
    updateToken: updateToken,
};
//# sourceMappingURL=tokens.js.map