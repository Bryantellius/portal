import path from 'path';
import { Sequelize } from 'sequelize';
import config from '../../config/database.json';
import CourseFactory from './course';
import LectureFactory from './lecture';
import ModuleFactory from './module';
import QuizFactory from './quiz';
import QuizQuestionFactory from './quizquestion';
import QuizQuestionOptionFactory from './quizquestionoption';
import QuizQuestionResponseFactory from './quizquestionresponse';
import RoleFactory from './role';
import UserFactory from './user';
import ExerciseFactory from './exercise';
import VideoFactory from './video';
import ExerciseVideoFactory from './exercisevideo';
import QuizVideoFactory from './quizvideo';
import LectureVideoFactory from './lecturevideo';
import QuizSubmissionFactory from './quizsubmission';
import ExerciseSubmissionFactory from './exercisesubmission';
import CourseUserFactory from './courseuser';
import CourseDefinitionFactory from './coursedefinition';
import ExerciseCommentFactory from './exercisecomment';
import LectureRatingFactory from './lecturerating';
import ExerciseRatingFactory from './exerciserating';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const envConfig = config[env];

const sequelize = envConfig.use_env_variable
  ? new Sequelize(process.env[envConfig.use_env_variable], envConfig)
  : new Sequelize(envConfig.database, envConfig.username, envConfig.password, envConfig);

// const modelFiles = fs
//   .readdirSync(path.resolve("db/models"))
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js' || file.slice(-3) === '.ts');
//   });

const db = {
  sequelize,
  Sequelize,
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
  QuizSubmission: QuizSubmissionFactory(sequelize, Sequelize),
  ExerciseSubmission: ExerciseSubmissionFactory(sequelize, Sequelize),
  // CourseModule: CourseModuleFactory(sequelize, Sequelize),
  CourseUser: CourseUserFactory(sequelize, Sequelize),
  CourseDefinition: CourseDefinitionFactory(sequelize, Sequelize),
  ExerciseComment: ExerciseCommentFactory(sequelize, Sequelize),
  LectureRating: LectureRatingFactory(sequelize, Sequelize),
  ExerciseRating: ExerciseRatingFactory(sequelize, Sequelize)
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].loadScopes) {
    db[modelName].loadScopes(db);
  }
});

sequelize.sync({
  alter: true
});

export default db;
