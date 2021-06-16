import db from '../db/models';
import _ from 'lodash';
import { QuizQuestionType } from '../utils/enums';

const findById = async ( req, res ) => {
  const { id } = req.params;

  const quiz = await db.Quiz.findByPk(parseInt(id));

  return res.json(quiz);
};

const findAll = async ( req, res ) => {
  const { lectureId } = req.params;

  const quiz = await db.Quiz.findAll();

  return res.json(quiz);
};

const findByLectureId = async ( req, res ) => {
  const { lectureId } = req.params;

  const quiz = await db.Quiz.findAll({
    where: {
      lectureId
    }
  });

  return res.json(quiz);
};

const submitResponses = async ( req, res ) => {
  const {
    userId,
    responses,
    quizId
  } = req.body;

  const correctAnswers = await db.QuizQuestionCorrectAnswer.findAll({
    include: {
      model: db.QuizQuestion,
      where: {
        quizId: quizId
      }
    }
  });

  for (let response of responses) {
    await db.QuizQuestionResponse.create({
      quizQuestionId: response.quizQuestionId,
      value: response.value,
      userId: userId
    });

    const correctAnswer = correctAnswers.find(answer => answer.quizQuestionId === response.quizQuestionId);
    response.correctAnswers = correctAnswer.answer.split(';');
    const quizQuestion = correctAnswer.quizQuestion;

    switch (quizQuestion.type) {
      case QuizQuestionType.TrueFalse:
      case QuizQuestionType.Select:
        response.isCorrect = correctAnswer.answer === response.value;
        break;
      case QuizQuestionType.Text:
        response.isCorrect = correctAnswer.answer.split(';').includes(response.value);
        break;
      case QuizQuestionType.MultiSelect:
        response.isCorrect = _.xor(response.isCorrect = correctAnswer.answer.split(';'), response.value.split(';')).length === 0;
        break;
    }
  }

  const totalQuestions = responses.length;
  const totalCorrect = responses
    .filter(response => response.isCorrect)
    .length;

  const score = totalCorrect / parseFloat(totalQuestions);

  await db.QuizSubmission.create({
    quizId,
    userId,
    score
  });

  res.json({
    success: true,
    responses: responses,
    score
  });
};

export default {
  findById,
  findAll,
  findByLectureId,
  submitResponses
};