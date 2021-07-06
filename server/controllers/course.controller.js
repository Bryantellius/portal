import db from '../db/models';
import { Op } from 'sequelize';

const saveOrUpdateModel = async (model, type) => {
  if (model.id) {
    const existing = await type.findByPk(model.id);
    for (let key of Object.keys(model)) {
      existing[key] = model[key];
    }

    return await existing.save();
  } else {
    return type.create(model);
  }
};

const findAll = async (req, res, next) => {
  let findOptions = {};
  const {
    userId
  } = req.params;

  // if (userId) {
  //   findOptions.where = {
  //     '$courses.courseUsers.user.id$': userId
  //   };
  // }
  const courses = await db.CourseDefinition.findAll(findOptions);

  return res.json(courses);
};

const getUserCourseDetails = async (req, res) => {
  const {
    userId,
    courseId
  } = req.params;

  const courseUser = await db.CourseUser.findOne({
    where: {
      userId,
      courseId
    }
  });

  return res.json(courseUser);
};

const updateLastCompletedLectureId = async (req, res) => {
  const {
    userId,
    courseId
  } = req.params;

  const record = await db.CourseUser.findOne({
    where: {
      userId,
      courseId
    }
  });

  record.lastCompletedLectureId = req.body.lastCompletedLectureId;

  await record.save();

  return res.json(record);
};


const findById = async (req, res) => {
  const course = await db.CourseDefinition.findByPk(req.params.id);

  return res.json(course);
};

const upsertCourse = async (req, res) => {
  const { id } = req.params;

  const course = {
    id,
    ...req.body
  };

  const savedCourse = await saveOrUpdateModel(course, db.Course);

  savedCourse.setModules(course.modules.map(module => Number.isInteger(module) ? module : module.id));

  return res.json(savedCourse);
};

const getCourseSchedule = async (req, res) => {
  const {
    id
  } = req.params;

  const result = await db.Course.findAll({
    where: {
      courseDefinitionId: id,
      endDate: {
        [Op.gte]: new Date()
      }
    }
  });

  return res.json(result);
};

const upsertCourseIteration = async (req, res) => {
  const {
    courseId,
    id
  } = req.params;

  const courseIteration = {
    id,
    courseDefinitionId: courseId,
    ...req.body
  };

  const result = await saveOrUpdateModel(courseIteration, db.Course);

  return res.json(result);
};

export default {
  findById,
  findAll,
  getUserCourseDetails,
  updateLastCompletedLectureId,
  upsertCourse,
  getCourseSchedule,
  upsertCourseIteration
};