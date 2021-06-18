import React from 'react';
import { Card } from 'react-bootstrap';
import QuizQuestionInput from './QuizQuestionInput';

const QuizQuestion = ({
  questionId,
  type,
  questionText,
  options,
  onUpdate,
  isCorrect,
  usePreviousSubmission,
  previousResponse,
  submitted = false,
  correctAnswers = []
}) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {questionText}
                </Card.Title>

                <QuizQuestionInput
                    questionId={questionId}
                    type={type}
                    options={options}
                    onUpdate={onUpdate}
                    isCorrect={isCorrect}
                    submitted={submitted}
                    correctAnswers={correctAnswers}
                    previousResponse={previousResponse}
                    disabled={usePreviousSubmission}
                />
            </Card.Body>
        </Card>
    );
}

export default QuizQuestion