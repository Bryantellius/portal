"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = __importDefault(require("../query"));
const getAllModulesByCurriculum = (id) => {
    return query_1.default("SELECT * FROM Modules WHERE CurriculumID = ?", [id]);
};
const getOneModuleByTopicID = (id) => {
    return query_1.default("SELECT * FROM Modules WHERE TopicID = ?", [id]);
};
const getAllModules = () => {
    return query_1.default("SELECT * FROM Modules");
};
const insertModule = (body) => {
    return query_1.default("INSERT INTO Modules SET ?", [body]);
};
exports.default = {
    getAllModulesByCurriculum,
    getOneModuleByTopicID,
    getAllModules,
    insertModule,
};
//# sourceMappingURL=modules.js.map