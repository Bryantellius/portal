import React from 'react';
import { Card } from 'react-bootstrap';
import QuizQuestionInput from './QuizQuestionInput';

const QuizQuestion = ({
  question,
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
                    {question?.text}
                </Card.Title>

                <QuizQuestionInput
                    questionId={question?.id}
                    type={question?.type}
                    options={question?.options}
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