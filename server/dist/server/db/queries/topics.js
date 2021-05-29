"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = __importDefault(require("../query"));
const getOneTopic = (id) => {
    return query_1.default("SELECT * FROM Topics WHERE TopicID = ?", [id]);
};
const getTopicsByCurriculum = (id) => {
    return query_1.default("select t.TopicID, t.ModuleID, t.Title, m.CurriculumID, m.Title as Module, m.ModuleID from topics as t INNER JOIN modules as m ON m.ModuleID = t.ModuleID WHERE m.CurriculumID = ?", [id]);
};
const insertTopic = (body) => {
    return query_1.default("INSERT INTO Topics SET ?", [body]);
};
exports.default = {
    getOneTopic,
    getTopicsByCurriculum,
    insertTopic,
};
//# sourceMappingURL=topics.js.map