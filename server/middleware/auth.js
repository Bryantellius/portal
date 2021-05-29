"use strict";
exports.__esModule = true;
var passport_1 = require("passport");
var authenticateUser = function (req, res, next) {
    passport_1["default"].authenticate("bearer", { session: false }, function (err, user, info) {
        if (user) {
            req.user = user;
        }
        return next();
    })(req, res, next);
};
exports["default"] = authenticateUser;
