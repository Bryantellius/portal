"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var loginRouter_1 = require("./loginRouter");
var registerRouter_1 = require("./registerRouter");
var router = express.Router();
router.get("/test", function (req, res, next) {
    try {
        res.status(200).json({ msg: "Auth Test" });
    }
    catch (error) {
        next(error);
    }
});
router.use("/login", loginRouter_1.default);
router.use("/register", registerRouter_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map