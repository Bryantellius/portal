"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var resources_1 = require("./resources");
var users_1 = require("./users");
var adminRouter_1 = require("./adminRouter");
var router = express.Router();
router.use("/admin", adminRouter_1.default);
router.use("/resources", resources_1.default);
router.use("/users", users_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map