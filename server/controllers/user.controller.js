import db from '../db/models';
import path from 'path';
import { writeFile } from 'fs';
import { hashPassword } from '../utils/security/passwords';

const findAll = async (req, res) => {
  const users = await db.User.findAll({
    include: [{
      model: db.Role
    }]
  });

  res.json(users);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const user = await db.User.findByPk(parseInt(id), {
    include: [
      {
        model: db.CourseUser,
        include: [
          {
            model: db.Course
          }
        ]
      },
      {
        model: db.QuizSubmission,
        separate: true,
        include: [
        {
          model: db.QuizQuestionResponse,
        },
        {
          model: db.Quiz,
          include: [
            {
              model: db.QuizQuestion,
              include: [
                {
                  model: db.QuizQuestionOption
                }
              ]
            }
          ]
        }
      ],
    },
    {
      model: db.ExerciseSubmission,
      separate: true,
      include: [
        {
          model: db.Exercise
        }
      ]
    }]
  });

  res.json(user);
};

const findByAuth0Id = async (req, res) => {
  const auth0Id = req.params.auth0Id || req.body.auth0Id;

  const user = await db.User.findOne({
    where: {
      auth0Id: auth0Id
    }
  });

  res.json(user);
};

const getSignedInUser = async (req, res, next) => {
  const authUser = req.user;
};

const createUser = async (req, res) => {
  const { user } = req.body;

  // user.password = hashPassword(user.password);
  const createResponse = await db.User.create(user);
  // const courseSubscriptionResponse = await db.ClassList.create(classList);

  // res.json(courseSubscriptionResponse);

  res.json(createResponse);
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


const deleteUser = async (req, res) => {
  const deleteResponse = await db.User.destroy({
    where: {
      id: req.params.id
    }
  });

  res.json(deleteResponse);
};

export default {
  findAll,
  findById,
  createUser,
  updateUser,
  getSignedInUser,
  findByAuth0Id,
  deleteUser
};