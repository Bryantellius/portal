"use strict";
exports.__esModule = true;
var express_1 = require("express");
var lecture_controller_1 = require("../../controllers/lecture.controller");
var lectureRouter = express_1.Router({ mergeParams: true });
lectureRouter.get("/", lecture_controller_1["default"].findAll);
lectureRouter.get("/:id", lecture_controller_1["default"].findById);
lectureRouter.get("/:id/content", lecture_controller_1["default"].getLectureContent);
exports["default"] = lectureRouter;
