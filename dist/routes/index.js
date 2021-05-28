"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var passport = require("passport");
var api_1 = require("./api");
var auth_1 = require("./auth");
var router = express.Router();
router.use(function (req, res, next) {
    passport.authenticate("bearer", { session: false }, function (err, user, info) {
        if (user)
            req.user = user;
        return next();
    })(req, res, next);
});
router.use("/api", api_1.default);
router.use("/auth", auth_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map