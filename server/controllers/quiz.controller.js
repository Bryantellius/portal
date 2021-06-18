import db from '../db/models';
import _ from 'lodash';
import { QuizQuestionType } from '../utils/enums';

const findById = async ( req, res ) => {
  const { id } = req.params;

  const quiz = await db.Quiz.findByPk(parseInt(id), {
    include: [
      {
        model: db.QuizQuestion,
        include: [{
          model: db.QuizQuestionOption
        }]
      }
    ]
  });

  return res.json(quiz);
};

const findAll = async ( req, res ) => {
  const { lectureId } = req.params;

  const quiz = await db.Quiz.findAll({
    include: [{
      all: true,
      nested: true
    }]
  });

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

const saveQuiz = async (req, res) => {
  const isUpdate = !!req.params.id;

  let quizAttributes = {
    lectureId: req.body.lectureId
  };

  if (isUpdate) {
    quizAttributes.id = req.params.id;
  }

  const saveQuiz = async () => {
    if (req.params.id) {
      const quiz = await db.Quiz.findOne({
        where: {
          id: req.params.id
        }
      });

      quiz.lectureId = quizAttributes.lectureId;

      await quiz.save();

      return quiz;
    } else {
      return db.Quiz.create(quizAttributes);
    }
  };

  const quiz = await saveQuiz();

  const quizQuestionPromises = req.body.questions.map(async question => {
    let quizQuestionAttributes = {
      text: question.text,
      type: question.type,
      quizId: req.params.id
    };

    if (!!question.id) {
      quizQuestionAttributes.id = question.id;
    }

    const saveQuizQuestion = async () => {
      if (!!quizQuestionAttributes.id) {
        const quizQuestion = await db.QuizQuestion.findOne({
          where: {
            id: quizQuestionAttributes.id
          }
        });

        quizQuestion.text = question.text;
        quizQuestion.type = question.type;
        quizQuestion.sortOrder = question.sortOrder;

        await quizQuestion.save();

        return quizQuestion;
      } else {
        return db.QuizQuestion.create(quizQuestionAttributes);
      }
    };

    const quizQuestion = await saveQuizQuestion();

    const quizQuestionOptionPromises = question.options.map(async option => {
      const quizQuestionOptionAttributes = {
        quizQuestionId: option.quizQuestionId,
        text: option.text,
        value: option.value
      };

      if (!!option.id) {
        quizQuestionOptionAttributes.id = option.id;
      }

      const saveQuizQuestionOption = async () => {
        if (!!quizQuestionOptionAttributes.id) {
          const dbOption = await db.QuizQuestionOption.findOne({
            where: {
              id: quizQuestionOptionAttributes.id
            }
          });

          dbOption.text = option.text;
          dbOption.value = option.value;
          await dbOption.save();

          return dbOption;
        } else {
          return db.QuizQuestionOption.create(quizQuestionOptionAttributes);
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


  // const saveAction = isUpdate
  //   ? db.Quiz.update(dbFormattedQuiz, {
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [{
  //       model: db.QuizQuestion,
  //       include: [{
  //         model: db.QuizQuestionOption
  //       }]
  //     }]
  //   })
  //   : db.Quiz.create(dbFormattedQuiz);

  res.json(quiz);
};

export default {
  findById,
  findAll,
  findByLectureId,
  submitResponses,
  saveQuiz
};