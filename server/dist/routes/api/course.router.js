"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = __importDefault(require("../../controllers/course.controller"));
const courseRouter = express_1.Router({ mergeParams: true });
courseRouter.get('/', course_controller_1.default.findAll);
exports.default = courseRouter;
//# sourceMappingURL=course.router.js.map