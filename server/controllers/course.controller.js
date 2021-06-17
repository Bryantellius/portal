import db from '../db/models';

const findAll = async ( req, res ) => {
  let findOptions = {};

  if (req.params.userId) {
    findOptions.include = [{
      model: db.User,
      as: 'users',
      where: {
        id: req.params.userId
      }
    }, {
      all: true,
      nested: true
    }];
  }

  const courses = await db.Course.findAll(findOptions);

  res.json(courses);
};

const findById = async (req, res) => {
  const findOptions = {
    include: [{
      all: true,
      nested: true
    }]
  };

  const course = await db.Course.findByPk(req.params.id, findOptions);

  res.json(course);
};

export default {
  findById,
  findAll
};