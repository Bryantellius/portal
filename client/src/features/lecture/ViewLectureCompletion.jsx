import React from 'react';
import { Button, Rate, Result, Statistic, Typography } from 'antd';
import { QuizQuestionType } from '../../utils/enums';
import _ from 'lodash';
import lectureService from './lecture.service';
import { useSelector } from 'react-redux';
import LineBreak from '../shared/components/LineBreak';

const ViewLectureCompletion = ({
  lecture,
  questions,
  responses,
  onRetakeQuiz,
  onContinue
}) => {
  const user = useSelector(state => state.auth.user);
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

  const rateLesson = async rating => {
    await lectureService.addLectureRating(user?.id, lecture?.id, rating);
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

        <LineBreak />
        <Typography.Title level={4} className="text-primary">
          Rate this Lesson
        </Typography.Title>
        <Rate onChange={rateLesson} />
      </div>
    </Result>
  );
};

export default ViewLectureCompletion;