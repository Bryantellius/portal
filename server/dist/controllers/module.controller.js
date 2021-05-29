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
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const curriculumId = parseInt(req.params.curriculumId);
    const data = curriculumId !== undefined
        ? yield models_1.default.Module.findAll({
            where: {
                curriculumId: curriculumId
            }
        })
        : yield models_1.default.Module.findAll();
    res.json(data);
});
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const module = yield models_1.default.Module.findByPk(id);
    res.json(module);
});
const findByCurriculumId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const module = yield models_1.default.Module.findAll({
        where: {
            curriculumId: req.params.id
        }
    });
    res.json(module);
});
exports.default = {
    findById,
    findByCurriculumId,
    findAll
};
//# sourceMappingURL=module.controller.js.map