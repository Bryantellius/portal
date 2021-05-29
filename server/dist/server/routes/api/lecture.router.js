"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lecture_controller_1 = __importDefault(require("../../controllers/lecture.controller"));
const lectureRouter = express_1.Router({ mergeParams: true });
lectureRouter.get("/", lecture_controller_1.default.findAll);
lectureRouter.get("/:id", lecture_controller_1.default.findById);
lectureRouter.get("/:id/content", lecture_controller_1.default.getLectureContent);
exports.default = lectureRouter;
//# sourceMappingURL=lecture.router.js.map