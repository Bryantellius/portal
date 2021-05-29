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
exports.getQuestionOptionsByQuestionId = exports.getQuestionsByQuizId = exports.getQuizByLectureId = exports.getAll = void 0;
const query_1 = __importDefault(require("../query"));
const enums_1 = require("../../../client/utils/enums");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const quizzes = yield query_1.default("SELECT * FROM quizzes");
    return quizzes;
});
exports.getAll = getAll;
const getQuizByLectureId = (lectureId) => __awaiter(void 0, void 0, void 0, function* () {
    const quizzes = yield query_1.default("SELECT * FROM quizzes WHERE QuizID = ?", [lectureId]);
    return Promise.all(quizzes.map((quiz) => __awaiter(void 0, void 0, void 0, function* () {
        const quizQuestions = yield getQuestionsByQuizId(quiz.QuizID);
        quiz.Questions = quizQuestions;
        return quiz;
    })));
});
exports.getQuizByLectureId = getQuizByLectureId;
const getQuestionsByQuizId = (quizId) => __awaiter(void 0, void 0, void 0, function* () {
    let questions = yield query_1.default("SELECT * FROM quizquestions WHERE QuizID = ?", [quizId]);
    return Promise.all(questions.map((question) => __awaiter(void 0, void 0, void 0, function* () {
        switch (question.Type) {
            case enums_1.QuizQuestionType.Select:
            case enums_1.QuizQuestionType.MultiSelect:
                const questionOptions = yield getQuestionOptionsByQuestionId(question.QuizQuestionID);
                question.Options = questionOptions;
                return question;
            case enums_1.QuizQuestionType.TrueFalse:
            case enums_1.QuizQuestionType.Text:
            default:
                return question;
        }
    })));
});
exports.getQuestionsByQuizId = getQuestionsByQuizId;
const getQuestionOptionsByQuestionId = (quizQuestionId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield query_1.default("SELECT * FROM quizquestionoptions WHERE QuizQuestionID = ?", [quizQuestionId]);
});
exports.getQuestionOptionsByQuestionId = getQuestionOptionsByQuestionId;
//# sourceMappingURL=quizzes.js.map