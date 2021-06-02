import db from '../db/models';

const findAll = async ( req, res, next ) => {
  const courses = await db.Course.findAll();

  res.json(courses);
};

export default {
  findAll
};