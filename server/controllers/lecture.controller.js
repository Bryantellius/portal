import db from '../db/models';

import path from 'path';

const { Lecture, Module } = db;

const findAll = async ( req, res ) => {

  const { lectureId } = req.params;

  let includes = [
    { all: true, nested: true }
  ];

  if (req.params.courseId) {
    includes.push({
      model: Module,
      include: [{
        model: db.Course,
        where: {
          id: req.params.courseId
        }
      }],
      order: [
        [db.QuizQuestion, 'sortOrder', 'DESC'],
        [db.QuizQuestionOption, 'sortOrder', 'DESC']
      ]
    });
  }

  let whereCriteria = {};

  if (lectureId !== undefined) {
    whereCriteria.lectureId = req.params.lectureId;
  }

  const findOptions = {
    where: whereCriteria,
    include: includes
  };

  const lectures = await Lecture.findAll(findOptions);

  res.json(lectures);
};

const findById = async ( req, res ) => {
  const lecture = await Lecture.findByPk(parseInt(req.params.id), {
    include: { all: true }
  });

  res.json(lecture);
};

const getLectureContent = async ( req, res, next ) => {
  const { id } = req.params;

  const lecture = await db.Lecture.findByPk(id);

  const filePath = path.join(process.cwd(), 'lectures', lecture.fileName);
  lecture.id;
  res.sendFile(filePath);
};

const createLecture = async (req, res) => {
  const lecture = req.body;
  const createLectureResponse = await db.Lecture.create(lecture);

  res.json(createLectureResponse);
}

export default {
  findAll,
  findById,
  getLectureContent,
  createLecture
};