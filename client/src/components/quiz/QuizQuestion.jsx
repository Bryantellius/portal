import React from 'react';
import { Card } from 'react-bootstrap';
import QuizQuestionResponse from './QuizQuestionResponse';

const QuizQuestion = ({
  questionId,
  type,
  questionText,
  options,
  onUpdate,
  isCorrect,
  submitted = false,
  correctAnswers = []
}) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {questionText}
                </Card.Title>

                <QuizQuestionResponse
                    questionId={questionId}
                    type={type}
                    options={options}
                    onUpdate={onUpdate}
                    isCorrect={isCorrect}
                    submitted={submitted}
                    correctAnswers={correctAnswers}
                />
            </Card.Body>
        </Card>
    );
}

export default QuizQuestion