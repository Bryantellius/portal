import db from '../db/models';

const listRoles = async (req, res) => {
  const roles = await db.Role.findAll();

  return res.json(roles);
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
    return res.json(existingUser);
  } else {
    await db.User.create(user);
    const createdUser = await getAuth0User(user.auth0Id);
    return res.json(createdUser);
  }
};

const findByAuth0Id = async (req, res) => {
  const user = await getAuth0User(req.params.sub);
  return res.json(user);
};

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