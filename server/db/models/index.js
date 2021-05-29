"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var sequelize_1 = require("sequelize");
var database_1 = require("../../config/database");
var accesstoken_1 = require("./accesstoken");
var classlist_1 = require("./classlist");
var course_1 = require("./course");
var curriculum_1 = require("./curriculum");
var lecture_1 = require("./lecture");
var module_1 = require("./module");
var quiz_1 = require("./quiz");
var quizquestion_1 = require("./quizquestion");
var quizquestionoption_1 = require("./quizquestionoption");
var quizquestionresponse_1 = require("./quizquestionresponse");
var role_1 = require("./role");
var user_1 = require("./user");
var basename = path_1["default"].basename(__filename);
var env = process.env.NODE_ENV || 'development';
// @ts-ignore
var envConfig = database_1["default"][env];
if (envConfig.use_env_variable) {
    var sequelize = new sequelize_1.Sequelize(process.env[envConfig.use_env_variable], envConfig);
}
else {
    var sequelize = new sequelize_1.Sequelize(envConfig.database, envConfig.username, envConfig.password, envConfig);
}
var modelFiles = fs_1["default"]
    .readdirSync(path_1["default"].resolve("src/server/db/models"))
    .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js' || file.slice(-3) === '.ts');
});
var db = {
    sequelize: sequelize,
    Sequelize: sequelize_1.Sequelize,
    AccessToken: accesstoken_1["default"](sequelize, sequelize_1.Sequelize),
    ClassList: classlist_1["default"](sequelize, sequelize_1.Sequelize),
    Course: course_1["default"](sequelize, sequelize_1.Sequelize),
    Curriculum: curriculum_1["default"](sequelize, sequelize_1.Sequelize),
    Lecture: lecture_1["default"](sequelize, sequelize_1.Sequelize),
    Module: module_1["default"](sequelize, sequelize_1.Sequelize),
    Quiz: quiz_1["default"](sequelize, sequelize_1.Sequelize),
    QuizQuestion: quizquestion_1["default"](sequelize, sequelize_1.Sequelize),
    QuizQuestionOption: quizquestionoption_1["default"](sequelize, sequelize_1.Sequelize),
    QuizQuestionResponse: quizquestionresponse_1["default"](sequelize, sequelize_1.Sequelize),
    Role: role_1["default"](sequelize, sequelize_1.Sequelize),
    User: user_1["default"](sequelize, sequelize_1.Sequelize)
};
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
exports["default"] = db;
