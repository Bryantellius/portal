"use strict";
exports.__esModule = true;
var express_1 = require("express");
var module_controller_1 = require("../../controllers/module.controller");
var moduleRouter = express_1.Router({ mergeParams: true });
moduleRouter.get('/:id', module_controller_1["default"].findById);
moduleRouter.get('/', module_controller_1["default"].findAll);
exports["default"] = moduleRouter;
