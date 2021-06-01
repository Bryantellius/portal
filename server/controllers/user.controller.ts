import db from '../db/models';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { writeFile } from 'fs';
import { hashPassword } from '../utils/security/passwords';

const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(parseInt(id), {
      include: [{
        all: true,
        nested: true
      }]
    });

    console.log(user);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const getSignedInUser = async (req: Request, res: Response, next: NextFunction) => {
  const authUser = req.user;
  console.log(authUser);
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, classList } = req.body;

    user.password = hashPassword(user.password);
    const createResponse: any = await db.User.create(user);
    classList.userId = createResponse.insertId;
    const courseSubscriptionResponse: any = await db.ClassList.create(classList);

    res.json(courseSubscriptionResponse);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = req.body;

    if (user.avatarUrl) {
      user.avatarUrl = user.avatarUrl + path.extname(user.fileName);
      delete user.fileName;
    }

    const updateUserResponse: any = await db.User.update(user, {
      where: {
        id: id
      }
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const uploadAssets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files) {
      res.json({ msg: 'no go bro' });
      return;
    }

    const newImage: any = req.files.image;
    const id = req.body.id;
    const imagePath = path.join(
      __dirname,
      `../public/assets/img/${id}${path.extname(newImage.name)}`
    );

    const buffer = Buffer.from(newImage.data, 'base64');

    writeFile(imagePath, buffer, (err: Error) => {
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
  findById,
  createUser,
  updateUser,
  uploadAssets,
  getSignedInUser
};