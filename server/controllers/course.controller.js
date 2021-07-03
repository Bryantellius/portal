import db from '../db/models';

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

const findAll = async ( req, res ) => {
  let findOptions = {};

  const courses = await db.Course.findAll(findOptions);

  res.json(courses);
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

  res.json(courseUser);
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

  res.json(record);
};


const findById = async (req, res) => {
  const course = await db.Course.findByPk(req.params.id);

  res.json(course);
};

const upsertCourse = async (req, res) => {
  const { id } = req.params;

  const course = {
    id,
    ...req.body
  };

  const savedCourse = await saveOrUpdateModel(course, db.Course);

  savedCourse.setModules(course.modules.map(module => Number.isInteger(module) ? module : module.id));

  res.json(savedCourse);
}

export default {
  findById,
  findAll,
  getUserCourseDetails,
  updateLastCompletedLectureId,
  upsertCourse
};