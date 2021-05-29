"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const accesstoken_1 = __importDefault(require("./accesstoken"));
const classlist_1 = __importDefault(require("./classlist"));
const course_1 = __importDefault(require("./course"));
const curriculum_1 = __importDefault(require("./curriculum"));
const lecture_1 = __importDefault(require("./lecture"));
const module_1 = __importDefault(require("./module"));
const quiz_1 = __importDefault(require("./quiz"));
const quizquestion_1 = __importDefault(require("./quizquestion"));
const quizquestionoption_1 = __importDefault(require("./quizquestionoption"));
const quizquestionresponse_1 = __importDefault(require("./quizquestionresponse"));
const role_1 = __importDefault(require("./role"));
const user_1 = __importDefault(require("./user"));
const basename = path_1.default.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// @ts-ignore
const envConfig = database_1.default[env];
const sequelize = envConfig.use_env_variable
    ? new sequelize_1.Sequelize(process.env[envConfig.use_env_variable], envConfig)
    : new sequelize_1.Sequelize(envConfig.database, envConfig.username, envConfig.password, envConfig);
const modelFiles = fs_1.default
    .readdirSync(path_1.default.resolve("db/models"))
    .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js' || file.slice(-3) === '.ts');
});
const db = {
    sequelize,
    Sequelize: sequelize_1.Sequelize,
    AccessToken: accesstoken_1.default(sequelize, sequelize_1.Sequelize),
    ClassList: classlist_1.default(sequelize, sequelize_1.Sequelize),
    Course: course_1.default(sequelize, sequelize_1.Sequelize),
    Curriculum: curriculum_1.default(sequelize, sequelize_1.Sequelize),
    Lecture: lecture_1.default(sequelize, sequelize_1.Sequelize),
    Module: module_1.default(sequelize, sequelize_1.Sequelize),
    Quiz: quiz_1.default(sequelize, sequelize_1.Sequelize),
    QuizQuestion: quizquestion_1.default(sequelize, sequelize_1.Sequelize),
    QuizQuestionOption: quizquestionoption_1.default(sequelize, sequelize_1.Sequelize),
    QuizQuestionResponse: quizquestionresponse_1.default(sequelize, sequelize_1.Sequelize),
    Role: role_1.default(sequelize, sequelize_1.Sequelize),
    User: user_1.default(sequelize, sequelize_1.Sequelize)
};
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
exports.default = db;
//# sourceMappingURL=index.js.map