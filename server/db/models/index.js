import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import config from "../../config/database.json";
import AccessTokenFactory from "./accesstoken"
import ClassListFactory from "./courseuser";
import CourseFactory from "./course";
import LectureFactory from "./lecture";
import ModuleFactory from "./module";
import QuizFactory from "./quiz";
import QuizQuestionFactory from "./quizquestion";
import QuizQuestionOptionFactory from "./quizquestionoption";
import QuizQuestionResponseFactory from "./quizquestionresponse";
import RoleFactory from "./role";
import UserFactory from "./user";
import ExerciseFactory from './exercise';
import VideoFactory from './video';
import ExerciseVideoFactory from './exercisevideo';
import QuizVideoFactory from './quizvideo';
import LectureVideoFactory from './lecturevideo';
import QuizQuestionCorrectAnswerFactory from './quizquestioncorrectanswer';
import QuizSubmissionFactory from './quizsubmission';
import ExerciseSubmissionFactory from './exercisesubmission';

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
  CourseUser: ClassListFactory(sequelize, Sequelize),
  Course: CourseFactory(sequelize, Sequelize),
  Lecture: LectureFactory(sequelize, Sequelize),
  Module: ModuleFactory(sequelize, Sequelize),
  Quiz: QuizFactory(sequelize, Sequelize),
  QuizQuestion: QuizQuestionFactory(sequelize, Sequelize),
  QuizQuestionOption: QuizQuestionOptionFactory(sequelize, Sequelize),
  QuizQuestionResponse: QuizQuestionResponseFactory(sequelize, Sequelize),
  Role: RoleFactory(sequelize, Sequelize),
  User: UserFactory(sequelize, Sequelize),
  Video: VideoFactory(sequelize, Sequelize),
  Exercise: ExerciseFactory(sequelize, Sequelize),
  LectureVideo: LectureVideoFactory(sequelize, Sequelize),
  ExerciseVideo: ExerciseVideoFactory(sequelize, Sequelize),
  QuizVideo: QuizVideoFactory(sequelize, Sequelize),
  QuizQuestionCorrectAnswer: QuizQuestionCorrectAnswerFactory(sequelize, Sequelize),
  QuizSubmission: QuizSubmissionFactory(sequelize, Sequelize),
  ExerciseSubmission: ExerciseSubmissionFactory(sequelize, Sequelize)
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  } 
});

sequelize.sync();

export default db;
