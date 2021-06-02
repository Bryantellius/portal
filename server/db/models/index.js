import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import config from "../../config/database";
import AccessTokenFactory from "./accesstoken"
import ClassListFactory from "./classlist";
import CourseFactory from "./course";
import CurriculumFactory from "./curriculum";
import LectureFactory from "./lecture";
import ModuleFactory from "./module";
import QuizFactory from "./quiz";
import QuizQuestionFactory from "./quizquestion";
import QuizQuestionOptionFactory from "./quizquestionoption";
import QuizQuestionResponseFactory from "./quizquestionresponse";
import RoleFactory from "./role";
import UserFactory from "./user";


const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// @ts-ignore
const envConfig= config[env];

const sequelize = envConfig.use_env_variable
    ? new Sequelize(process.env[envConfig.use_env_variable], envConfig)
    : new Sequelize(envConfig.database, envConfig.username, envConfig.password, envConfig);

const modelFiles = fs
  .readdirSync(path.resolve("db/models"))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js' || file.slice(-3) === '.ts');
  });

const db = {
  sequelize,
  Sequelize,
  AccessToken: AccessTokenFactory(sequelize, Sequelize),
  ClassList: ClassListFactory(sequelize, Sequelize),
  Course: CourseFactory(sequelize, Sequelize),
  Curriculum: CurriculumFactory(sequelize, Sequelize),
  Lecture: LectureFactory(sequelize, Sequelize),
  Module: ModuleFactory(sequelize, Sequelize),
  Quiz: QuizFactory(sequelize, Sequelize),
  QuizQuestion: QuizQuestionFactory(sequelize, Sequelize),
  QuizQuestionOption: QuizQuestionOptionFactory(sequelize, Sequelize),
  QuizQuestionResponse: QuizQuestionResponseFactory(sequelize, Sequelize),
  Role: RoleFactory(sequelize, Sequelize),

  User: UserFactory(sequelize, Sequelize)
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  } 
});

export default db;
