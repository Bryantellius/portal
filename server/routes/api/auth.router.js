"use strict";
exports.__esModule = true;
var express_1 = require("express");
var express_fileupload_1 = require("express-fileupload");
var passport_1 = require("passport");
var auth_controller_1 = require("../../controllers/auth.controller");
var authRouter = express_1["default"].Router({ mergeParams: true });
authRouter.use(express_fileupload_1["default"]());
authRouter.post("/login", passport_1["default"].authenticate("local"), auth_controller_1["default"].login);
authRouter.post("/register", auth_controller_1["default"].register);
authRouter.post("/bulk-register", auth_controller_1["default"].bulkRegister);
authRouter.post("/forgot-password", auth_controller_1["default"].startPasswordReset);
authRouter.post("/reset-password", auth_controller_1["default"].resetPassword);
authRouter.get("/roles", auth_controller_1["default"].listRoles);
exports["default"] = authRouter;
