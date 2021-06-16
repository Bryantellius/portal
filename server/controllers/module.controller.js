import db from '../db/models';

const findAll = async ( req, res ) => {
  const courseId = parseInt(req.params.courseId);
  const data = courseId
    ? await db.Module.findAll({
      include: [{
        model: db.Course,
        where: {
          id: courseId
        }
      }]
    })
    : await db.Module.findAll();

  res.json(data);
};

const findById = async ( req, res ) => {
  const id = parseInt(req.params.id);

  const module = await db.Module.findByPk(id);

  res.json(module);
};

const findByCourseId = async ( req, res ) => {
  const courseId = parseInt(req.params.courseId);
  const module = await db.Module.findAll({
    include: [{
      model: db.Course,
      where: {
        courseId: courseId
      }
    }]
  });

  res.json(module);
};

export default {
  findById,
  findByCourseId: findByCourseId,
  findAll
};