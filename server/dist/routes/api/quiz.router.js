"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_controller_1 = __importDefault(require("../../controllers/quiz.controller"));
const quizRouter = express_1.Router({ mergeParams: true });
quizRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return req.params.lectureId
        ? yield quiz_controller_1.default.findByLectureId(req, res, next)
        : yield quiz_controller_1.default.findAll(req, res, next);
}));
quizRouter.get("/:id", quiz_controller_1.default.findById);
quizRouter.post("/:id", quiz_controller_1.default.submitResponses);
exports.default = quizRouter;
//# sourceMappingURL=quiz.router.js.map