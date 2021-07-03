import React from 'react';
import { Card } from 'antd';
import QuizQuestionInput from './QuizQuestionInput';
import LineBreak from '../shared/components/LineBreak';

const QuizQuestion = ({
  questionIndex,
  question,
  onUpdate,
  isCorrect,
  usePreviousSubmission,
  previousResponse,
  submitted = false,
  correctAnswers = [],
}) => {
    return (
      <>
        <Card style={{ marginBottom: '20px'}}>
          <Card.Meta
            title={`Question ${ questionIndex + 1}:`}
            description={question?.text}
          />
          <LineBreak/>
          <QuizQuestionInput
            question={question}
            questionIndex={questionIndex}
            correctAnswers={correctAnswers}
            isCorrect={isCorrect}
            usePreviousSubmission={usePreviousSubmission}
          />
        </Card>
      </>
    );
}

export default QuizQuestion