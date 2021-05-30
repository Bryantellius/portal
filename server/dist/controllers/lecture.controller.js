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
const path_1 = __importDefault(require("path"));
const { Lecture, Module } = models_1.default;
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lectureId } = req.params;
    let includes = [
        { all: true, nested: true }
    ];
    if (req.params.curriculumId) {
        includes.push({
            model: Module,
            attributes: ["curriculumId"],
            where: {
                curriculumId: req.params.curriculumId
            }
        });
    }
    let whereCriteria = {};
    if (lectureId !== undefined) {
        whereCriteria.lectureId = req.params.lectureId;
    }
    const findOptions = {
        where: whereCriteria,
        include: includes
    };
    const lectures = yield Lecture.findAll(findOptions);
    res.json(lectures);
});
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const lecture = yield Lecture.findByPk(parseInt(req.params.id), {
        include: { all: true }
    });
    res.json(lecture);
});
const getLectureContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const lecture = yield models_1.default.Lecture.findByPk(id);
    const filePath = path_1.default.join(process.cwd(), "../lectures", lecture.fileName);
    lecture.id;
    res.sendFile(filePath);
});
exports.default = {
    findAll,
    findById,
    getLectureContent
};
//# sourceMappingURL=lecture.controller.js.map