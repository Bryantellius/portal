"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var getAllCourses = function () {
    return models_1.default("SELECT * FROM Courses");
};
exports.default = { getAllCourses: getAllCourses };
//# sourceMappingURL=courses.js.map