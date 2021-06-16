import db from '../db/models';

const findAll = async ( req, res, next ) => {
  const courses = await db.Course.findAll();

  res.json(courses);
};

const findById = async (req, res) => {
  const course = await db.Course.findByPk(req.params.id);

  res.json(course);
};

export default {
  findById,
  findAll
};