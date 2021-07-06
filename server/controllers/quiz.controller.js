import db from '../db/models';
import _ from 'lodash';
import { QuizQuestionType } from '../utils/enums';

const findById = async (req, res) => {
  const { id } = req.params;

  const quiz = await db.Quiz.findByPk(parseInt(id),
    {
      include: [{
        model: db.QuizQuestion,
        include: [
          db.QuizQuestionOption
        ]
      }],
      where: {
        id: req.params.id
      }
    }
  );

  return res.json(quiz);
};

const findAll = async (req, res) => {
  const { lectureId, userId } = req.params;

  const filters = [];
  if (!!lectureId) {
    filters.push();
  }

  if (!!userId) {
    filters.push({
      userId
    });
  }

  const whereCriteria = filters.length > 0
    ? {
      where: filters.reduce((map, filter) => {
        return {
          ...map,
          ...filter
        };
      }, {})
    } : undefined;


  const quiz = await db.Quiz.findAll({
    where: whereCriteria,
    include: [{
      model: db.QuizQuestion,
      include: [
        db.QuizQuestionOption
      ]
    },
      db.Lecture
    ]
  });

  return res.json(quiz);
};

const findByLectureId = async (req, res) => {
  const { lectureId } = req.params;

  const quiz = await db.Quiz.findAll({
    where: {
      lectureId
    }
  });

  return res.json(quiz);
};

const submitResponses = async (req, res) => {
  const {
    userId,
    quizId
  } = req.body;

  let responses = req.body.quizQuestionResponses;

  for (let response of responses) {
    response.value = Array.isArray(response.value) ? response.value.join(';') : response.value;
    await db.QuizQuestionResponse.create({
      quizQuestionId: response.quizQuestionId,
      value: response.value,
      userId: userId
    });

    const quizQuestion = await db.QuizQuestion.findByPk(response.quizQuestionId);

    response.correctAnswers = quizQuestion.correctAnswer.split(';');

    const correctAnswer = quizQuestion.correctAnswer;
    switch (quizQuestion.type) {
      case QuizQuestionType.TrueFalse:
      case QuizQuestionType.Select:
        response.isCorrect = correctAnswer === response.value.toString();
        break;
      case QuizQuestionType.Text:
        response.isCorrect = correctAnswer.split(';').includes(response.value);
        break;
      case QuizQuestionType.MultiSelect:
        response.isCorrect = _.xor(correctAnswer.split(';'), response.value.split(';')).length === 0;
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

  return res.json({
    success: true,
    responses: responses,
    score
  });
};

const saveQuiz = async (req, res) => {
  const isUpdate = !!req.params.id;

  const saveQuiz = async () => {
    if (req.params.id) {
      const quiz = await db.Quiz.findOne({
        where: {
          id: req.params.id
        }
      });

      quiz.lectureId = req.params.lectureId;

      await quiz.save();

      return quiz;
    } else {
      return db.Quiz.create({
        lectureId: req.params.lectureId,
        title: req.params.title
      });
    }
  };

  const quiz = await saveQuiz();

  const quizQuestionPromises = req.body.questions.map(async question => {
    const saveQuizQuestion = async () => {
      if (!!question.id) {
        const quizQuestion = await db.QuizQuestion.findOne({
          where: {
            id: question.id
          }
        });

        quizQuestion.text = question.text;
        quizQuestion.type = question.type;
        quizQuestion.sortOrder = question.sortOrder;
        quizQuestion.correctAnswer = question.correctAnswer;

        await quizQuestion.save();

        return quizQuestion;
      } else {
        return db.QuizQuestion.create(question);
      }
    };

    const quizQuestion = await saveQuizQuestion();

    const quizQuestionOptionPromises = question.options.map(async option => {
      const saveQuizQuestionOption = async () => {
        if (!!option.id) {
          const dbOption = await db.QuizQuestionOption.findOne({
            where: {
              id: option.id
            }
          });

          dbOption.text = option.text;
          dbOption.value = option.text;
          await dbOption.save();

          return dbOption;
        } else {
          return db.QuizQuestionOption.create(option);
        }
      };

      const quizQuestionOption = await saveQuizQuestionOption();

      return quizQuestionOption;
    });

    const quizQuestionOptions = await Promise.all(quizQuestionOptionPromises);

    await quizQuestion.setQuizQuestionOptions(quizQuestionOptions);

    return quizQuestion;
  });

  const quizQuestions = await Promise.all(quizQuestionPromises);

  await quiz.setQuizQuestions(quizQuestions);

  return res.json(quiz);
};

const getUserSubmissions = async (req, res) => {
  const submissions = await db.QuizSubmission.findAll({
    where: {
      userId: req.params.userId || req.params.id
    },
    include: [
      {
        model: db.Quiz,
        include: [
          {
            model: db.QuizSubmission,
            include: [
              db.QuizQuestionResponse
            ]
          },
          {
            model: db.QuizQuestion,
            include: [
              db.QuizQuestionOption,
              {
                model: db.QuizQuestionResponse,
                where: {
                  id: req.params.userId
                }
              }
            ]
          },
          db.Lecture
        ]
      }
    ]
  });
  return res.json(submissions);
};

const deleteQuiz = async (req, res) => {
  const result = await db.Quiz.destroy({
    where: {
      id: req.params.id
    }
  });

  return res.json(result);
};

export default {
  findById,
  findAll,
  findByLectureId,
  submitResponses,
  getUserSubmissions,
  saveQuiz,
  deleteQuiz
};