"use strict";
exports.__esModule = true;
var express_1 = require("express");
var course_controller_1 = require("../../controllers/course.controller");
var courseRouter = express_1.Router({ mergeParams: true });
courseRouter.get('/', course_controller_1["default"].findAll);
exports["default"] = courseRouter;
