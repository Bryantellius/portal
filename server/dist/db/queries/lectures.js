"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = __importDefault(require("../query"));
const getOneLecture = (id) => {
    return query_1.default("SELECT * FROM Lectures WHERE LectureID = ?", [id]);
};
const getOneLectureByTopicID = (id) => {
    return query_1.default("SELECT * FROM Lectures WHERE TopicID = ?", [id]);
};
const getAllLectures = () => {
    return query_1.default("SELECT * FROM Lectures");
};
const insertLecture = (body) => {
    return query_1.default("INSERT INTO Lectures SET ?", [body]);
};
exports.default = {
    getOneLecture,
    getOneLectureByTopicID,
    getAllLectures,
    insertLecture,
};
//# sourceMappingURL=lectures.js.map