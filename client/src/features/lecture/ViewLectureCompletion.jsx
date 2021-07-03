import React from 'react';
import { Button, Result, Statistic } from 'antd';
import { QuizQuestionType } from '../../utils/enums';
import _ from 'lodash';

const ViewLectureCompletion = ({
  questions,
  responses,
  onRetakeQuiz,
  onContinue
}) => {

  const isCorrect = (response) => {
    const question = questions.find(question => response.quizQuestionId === question.id);
    const value = response.value;

    switch (question.type) {
      case QuizQuestionType.Select:
      case QuizQuestionType.TrueFalse:
        return value.toString() === question.correctAnswer.toString();
      case QuizQuestionType.Text:
        return question.correctAnswer.split(';').includes(value);
      case QuizQuestionType.MultiSelect:
        return _.xor( question.correctAnswer.split(';'), Array.isArray(value) ? value : value.split(';')).length === 0;
    }
  };

  const totalCorrect = responses?.filter(isCorrect)?.length;
  const totalQuestions = questions?.length;
  return (
    <Result
      status="success"
      title="Lesson complete"
      subtitle="Check your email and discord periodically for instructor feedback."
      extra={[
        <Button
          type="default"
          key="retake-quiz"
          onClick={onRetakeQuiz}>
          Retake Quiz
        </Button>,
        <Button
          type="primary"
          key="next-lesson"
          onClick={onContinue}>
          Next Lesson
        </Button>
      ]}>
      <div className="desc">
        <Statistic title="Quiz Score" value={totalCorrect} suffix={`/ ${ totalQuestions }`} />
      </div>
    </Result>
  );
};

export default ViewLectureCompletion;