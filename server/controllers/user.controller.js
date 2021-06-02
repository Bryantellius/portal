import db from '../db/models';
import path from 'path';
import { writeFile } from 'fs';
import { hashPassword } from '../utils/security/passwords';

const findAll = async (req, res) => {
  const users = await db.User.findAll({
    include: [{
      model: db.Role,
      as: 'role'
    }]
  });

  res.json(users);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const user = await db.User.findByPk(parseInt(id), {
    include: [{
      all: true,
      nested: true
    }]
  });

  console.log(user);
  res.json(user);
};

const getSignedInUser = async (req, res, next) => {
  const authUser = req.user;
};

const createUser = async (req, res) => {
  const { user, classList } = req.body;

  user.password = hashPassword(user.password);
  const createResponse = await db.User.create(user);
  classList.userId = createResponse.insertId;
  const courseSubscriptionResponse = await db.ClassList.create(classList);

  res.json(courseSubscriptionResponse);
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.body;

    if (user.avatarUrl) {
      user.avatarUrl = user.avatarUrl + path.extname(user.fileName);
      delete user.fileName;
    }

    const updateUserResponse = await db.User.update(user, {
      where: {
        id: id
      }
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const uploadAssets = async (req, res, next) => {
  try {
    if (!req.files) {
      res.json({ msg: 'no go bro' });
      return;
    }

    const newImage = req.files.image;
    const id = req.body.id;
    const imagePath = path.join(
      __dirname,
      `../public/assets/img/${id}${path.extname(newImage.name)}`
    );

    const buffer = Buffer.from(newImage.data, 'base64');

    writeFile(imagePath, buffer, err => {
      if (err) {
        next(err);
      }
      res.send({ msg: 'File Uploaded' });
    });
  } catch (err) {
    next(err);
  }
};

export default {
  findAll,
  findById,
  createUser,
  updateUser,
  uploadAssets,
  getSignedInUser
};