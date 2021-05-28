"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var getAllModulesByCurriculum = function (id) {
    return models_1.default("SELECT * FROM Modules WHERE CurriculumID = ?", [id]);
};
var getOneModuleByTopicID = function (id) {
    return models_1.default("SELECT * FROM Modules WHERE TopicID = ?", [id]);
};
var getAllModules = function () {
    return models_1.default("SELECT * FROM Modules");
};
var insertModule = function (body) {
    return models_1.default("INSERT INTO Modules SET ?", [body]);
};
exports.default = {
    getAllModulesByCurriculum: getAllModulesByCurriculum,
    getOneModuleByTopicID: getOneModuleByTopicID,
    getAllModules: getAllModules,
    insertModule: insertModule,
};
//# sourceMappingURL=modules.js.map