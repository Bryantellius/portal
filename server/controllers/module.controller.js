import db from '../db/models';

const findAll = async (req, res) => {
  const {
    courseId
  } = req.params;

  const data = courseId
    ? await db.Module.findAll({
      where: {
        courseDefinitionId: courseId
      },
      include: db.Module.defaultIncludes(db)
    })
    : await db.Module.findAll({
      include: db.Module.defaultIncludes(db)
    });

  return res.json(data);
};

const findById = async (req, res) => {
  const id = parseInt(req.params.id);

  const module = await db.Module.findByPk(id);

  return res.json(module);
};

const findByCourseId = async (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const module = await db.Module.findAll({
    include: [{
      model: db.Course,
      where: {
        courseId: courseId
      }
    }, {
      model: db.Lecture,
      include: db.Lecture.defaultIncludes(db)
    }]
  });

  return res.json(module);
};

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

const upsertModule = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new Error('no ID found for module');
  }

  const module = req.body;

  const savedModule = await saveOrUpdateModel(module, db.Module);

  savedModule.setLectures(module.lectures);

  return res.json(savedModule);
};

export default {
  findById,
  findByCourseId: findByCourseId,
  findAll,
  upsertModule
};