"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var getOneLecture = function (id) {
    return models_1.default("SELECT * FROM Lectures WHERE LectureID = ?", [id]);
};
var getOneLectureByTopicID = function (id) {
    return models_1.default("SELECT * FROM Lectures WHERE TopicID = ?", [id]);
};
var getAllLectures = function () {
    return models_1.default("SELECT * FROM Lectures");
};
var insertLecture = function (body) {
    return models_1.default("INSERT INTO Lectures SET ?", [body]);
};
exports.default = {
    getOneLecture: getOneLecture,
    getOneLectureByTopicID: getOneLectureByTopicID,
    getAllLectures: getAllLectures,
    insertLecture: insertLecture,
};
//# sourceMappingURL=lectures.js.map