import React, { useState } from 'react';
import QuizQuestion from './QuizQuestion';
import ApiClient from '../../utils/apiClient';
import AuthService from '../../utils/authService';
import { Button, Card } from 'react-bootstrap';

export const Quiz = ({ id, title, questions }) => {
    const apiClient = new ApiClient()
        , authService = new AuthService();

    const user = authService.getUser();
    const [, setQuizSubmitted] = useState(false);

    const quizResponsesTemplate = questions.map(question => {
        return {
            quizQuestionId: question.id,
            userId: user.id,
            value: null
        };
    });

    const [quizResponses, setQuizResponses] = useState(quizResponsesTemplate);

    const handleUpdateQuizResponses = (index, value) => {
        const updatedResponses = quizResponses.slice();
        
        let normalizedValue = value;
        if (Array.isArray(value)) { //multiselect values
            normalizedValue = value.map(selectedOption => {
                return selectedOption.value;
            })
            .join(';');
        } else if (typeof value === 'object') {
            normalizedValue = value.value;
        } else {
            normalizedValue = value.toString();
        }

        updatedResponses[index].value = normalizedValue;
        setQuizResponses(updatedResponses);
    }

    const submitQuiz = async () => {
        await apiClient.post(`/quiz/${ id }`, {
            userId: user.id,
            responses: quizResponses
        });
    
        setQuizSubmitted(true);
    }

    return (
        <Card id="quiz">
            <Card.Header>
                <Card.Title>
                    <h2>{title}</h2>
                </Card.Title>
                <Card.Body>
                { 
                    questions && questions.map((question, index) => {
                        return (
                            <QuizQuestion
                                key={question.id}
                                quizId={id}
                                questionId={question.id}
                                type={question.type}
                                questionText={question.text}
                                options={question.options}
                                onUpdate={handleUpdateQuizResponses.bind(this, index)}
                            />
                        );
                    })
                }
                </Card.Body>
            </Card.Header>
            <Card.Footer className="text-center">
                <Button variant='primary' onClick={submitQuiz}>Submit Responses</Button>
            </Card.Footer>
        </Card>
    );
};