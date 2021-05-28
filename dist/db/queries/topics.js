"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var getOneTopic = function (id) {
    return models_1.default("SELECT * FROM Topics WHERE TopicID = ?", [id]);
};
var getTopicsByCurriculum = function (id) {
    return models_1.default("select t.TopicID, t.ModuleID, t.Title, m.CurriculumID, m.Title as Module, m.ModuleID from topics as t INNER JOIN modules as m ON m.ModuleID = t.ModuleID WHERE m.CurriculumID = ?", [id]);
};
var insertTopic = function (body) {
    return models_1.default("INSERT INTO Topics SET ?", [body]);
};
exports.default = {
    getOneTopic: getOneTopic,
    getTopicsByCurriculum: getTopicsByCurriculum,
    insertTopic: insertTopic,
};
//# sourceMappingURL=topics.js.map