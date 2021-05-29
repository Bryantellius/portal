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
const models_1 = __importDefault(require("../db/models"));
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const quiz = yield models_1.default.Quiz.findByPk(parseInt(id));
    return res.json(quiz);
});
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lectureId } = req.params;
    const quiz = yield models_1.default.Quiz.findAll();
    return res.json(quiz);
});
const findByLectureId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lectureId } = req.params;
    const quiz = yield models_1.default.Quiz.findAll({
        where: {
            lectureId
        }
    });
    return res.json(quiz);
});
const submitResponses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, responses } = req.body;
    for (let response of responses) {
        yield models_1.default.QuizQuestionResponse.create({
            quizQuestionId: response.quizQuestionId,
            value: response.value,
            userId: userId
        });
    }
    res.json({
        success: true
    });
});
exports.default = {
    findById,
    findAll,
    findByLectureId,
    submitResponses
};
//# sourceMappingURL=quiz.controller.js.map