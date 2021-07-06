import db from '../db/models';
import { Op } from 'sequelize';

const findByTitle = async (req, res) => {
  const videos = await db.Video.findAll({
    where: {
      title: {
        [Op.like]: `%${req.params.query}%`
      }
    },
    sort: [
      ['title', 'DESC']
    ]
  });

  return res.json(videos);
};

export default {
  findByTitle
};