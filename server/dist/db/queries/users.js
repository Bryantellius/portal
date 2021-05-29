"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = __importDefault(require("../query"));
const findOneUserById = (userid) => {
    return query_1.default("SELECT u.UserID, u.FirstName, u.LastName, u.email, u.password FROM USERS as u WHERE u.UserID = ?", [userid]);
};
const getOneUserById = (userid) => {
    return query_1.default("SELECT u.UserID, u.FirstName, u.LastName, u.email, u.RoleID, u.AvatarUrl, u.LastLectureID, u._created as created, c.CurriculumID, c.Title as Course, r.Title, r.Access FROM USERS as u INNER JOIN Roles as r ON r.RoleID = u.RoleID INNER JOIN classlist as cl ON cl.UserID = u.UserID INNER JOIN courses as c ON c.CourseID = cl.CourseID WHERE u.UserID = ?", [userid]);
};
const findOneUserByEmail = (email) => {
    return query_1.default("SELECT u.UserID, u.FirstName, u.LastName, u.email, u.password, u.RoleID, u.AvatarUrl, u.LastLectureID, r.Title, r.Access FROM USERS as u INNER JOIN Roles as r ON r.RoleID = u.RoleID WHERE u.email = ?", [email]);
};
const insertUser = (user) => {
    return query_1.default("INSERT INTO Users SET ?", [user]);
};
const insertUserToCourseList = (record) => {
    return query_1.default("INSERT INTO ClassList SET ?", [record]);
};
const updateUser = (userid, user) => {
    return query_1.default("UPDATE Users SET ? WHERE UserID = ?", [user, userid]);
};
const removeUser = (userid) => {
    return query_1.default("DELETE FROM Users WHERE UserID = ?", [userid]);
};
exports.default = {
    findOneUserByEmail,
    findOneUserById,
    getOneUserById,
    insertUser,
    insertUserToCourseList,
    updateUser,
    removeUser,
};
//# sourceMappingURL=users.js.map