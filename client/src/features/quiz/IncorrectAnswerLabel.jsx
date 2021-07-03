import React from 'react';

const IncorrectAnswerLabel = ({
  correctAnswers = []
}) => {
  return (
    <span className="d-inline-block w-90 quiz-answer-correction text-danger ml-1 mb-2">
      Correct answer(s): { correctAnswers.join(',') }
    </span>
  );
};

export default IncorrectAnswerLabel;
