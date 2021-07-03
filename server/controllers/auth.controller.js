import db from '../db/models';
import Sequelize from 'sequelize';

const listRoles = async ( req, res ) => {
  const roles = await db.Role.findAll();

  res.json(roles);
};

const linkAuth0User = async (req, res) => {
  const user = {
    auth0Id: req.params.sub,
    ...req.body
  };

  let existingUser = await db.User.findOne({
    where: {
      auth0Id: req.params.sub
    }
  });

  if (existingUser) {
    for (let key of Object.keys(user)) {
      existingUser[key] = user[key] || existingUser[key];
    }
    existingUser.avatarUrl = user.avatarUrl || user.picture || existingUser.avatarUrl;

    await existingUser.save();
    res.json(existingUser);
  } else {
    await db.User.create(req.body);
    const createdUser = await getAuth0User(user.auth0Id);
    res.json(createdUser);
  }
};

const findByAuth0Id = async (req, res) => {
  const user = await getAuth0User(req.params.sub);
  res.json(user);
}

const getAuth0User = async sub => {
  return await db.User.findOne({
    where: {
      auth0Id: sub
    },
    include: [{
      model: db.CourseUser
    },
      db.Role
    ]
  });
};

export default {
  linkAuth0User,
  findByAuth0Id
};