import db from '../db/models';

import path from 'path';

const { Lecture, Module } = db;

const saveOrUpdateModel = async (model, type) => {
  if (model.id) {
    const existing = await type.findByPk(model.id);
    for (let key of Object.keys(model)) {
      existing[key] = model[key];
    }

    return await existing.save();
  } else {
    return type.create(model);
  }
};

const findAll = async ( req, res ) => {

  const { lectureId } = req.params;

  let includes = [
    db.Exercise
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
};

const upsertLecture = async (req, res) => {
  const { id } = req.params;
  const lecture = {
    id,
    ...req.body
  };

  const savedLecture = await saveOrUpdateModel(lecture, db.Lecture);

  const savedLectureVideos = [];
  lecture.videos = lecture.videos || [];
  for (let video of lecture.videos) {
    savedLectureVideos.push(await saveOrUpdateModel(video, db.Video));
  }

  savedLecture.setVideos(savedLectureVideos);

  lecture.exercise = lecture.exercise || {};
  const savedExercise = await saveOrUpdateModel(lecture.exercise, db.Exercise);

  const savedVideos = [];
  lecture.exercise.videos = lecture.exercise.videos || [];
  for (let video of lecture.exercise.videos) {
    savedVideos.push(await saveOrUpdateModel(video, db.Video));
  }

  savedExercise.setVideos(savedVideos);

  savedLecture.setExercise(savedExercise);

  lecture.quiz = lecture.quiz || {};
  lecture.quiz.videos = lecture.quiz.videos || [];

  const savedQuiz = await saveOrUpdateModel(lecture.quiz, db.Quiz);

  const savedQuizVideos = [];
  for (let video of lecture.quiz.videos) {
    savedQuizVideos.push(await saveOrUpdateModel(video, db.Video));
  }

  savedQuiz.setVideos(savedQuizVideos);

  savedLecture.setQuiz(savedQuiz);

  res.json(savedLecture);
};

export default {
  findAll,
  findById,
  getLectureContent,
  createLecture,
  upsertLecture
};