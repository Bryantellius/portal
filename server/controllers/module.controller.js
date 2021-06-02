import db from '../db/models';

const findAll = async ( req, res ) => {
  const curriculumId = parseInt(req.params.curriculumId);
  const data = curriculumId !== undefined
    ? await db.Module.findAll({
      where: {
        curriculumId: curriculumId
      }
    })
    : await db.Module.findAll();

  res.json(data);
};

const findById = async ( req, res ) => {
  const id = parseInt(req.params.id);

  const module = await db.Module.findByPk(id);

  res.json(module);
};

const findByCurriculumId = async ( req, res ) => {
  const id = parseInt(req.params.id);
  const module = await db.Module.findAll({
    where: {
      curriculumId: req.params.id
    }
  });

  res.json(module);
};

export default {
  findById,
  findByCurriculumId,
  findAll
};