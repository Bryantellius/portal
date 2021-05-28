"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var findOneUserById = function (userid) {
    return models_1.default("SELECT u.UserID, u.FirstName, u.LastName, u.email, u.password FROM USERS as u WHERE u.UserID = ?", [userid]);
};
var getOneUserById = function (userid) {
    return models_1.default("SELECT u.UserID, u.FirstName, u.LastName, u.email, u.RoleID, u.AvatarUrl, u.LastLectureID, u._created as created, c.CurriculumID, c.Title as Course, r.Title, r.Access FROM USERS as u INNER JOIN Roles as r ON r.RoleID = u.RoleID INNER JOIN classlist as cl ON cl.UserID = u.UserID INNER JOIN courses as c ON c.CourseID = cl.CourseID WHERE u.UserID = ?", [userid]);
};
var findOneUserByEmail = function (email) {
    return models_1.default("SELECT u.UserID, u.FirstName, u.LastName, u.email, u.password, u.RoleID, u.AvatarUrl, u.LastLectureID, r.Title, r.Access FROM USERS as u INNER JOIN Roles as r ON r.RoleID = u.RoleID WHERE u.email = ?", [email]);
};
var insertUser = function (user) {
    return models_1.default("INSERT INTO Users SET ?", [user]);
};
var insertUserToCourseList = function (record) {
    return models_1.default("INSERT INTO ClassList SET ?", [record]);
};
var updateUser = function (userid, user) {
    return models_1.default("UPDATE Users SET ? WHERE UserID = ?", [user, userid]);
};
var removeUser = function (userid) {
    return models_1.default("DELETE FROM Users WHERE UserID = ?", [userid]);
};
exports.default = {
    findOneUserByEmail: findOneUserByEmail,
    findOneUserById: findOneUserById,
    getOneUserById: getOneUserById,
    insertUser: insertUser,
    insertUserToCourseList: insertUserToCourseList,
    updateUser: updateUser,
    removeUser: removeUser,
};
//# sourceMappingURL=users.js.map