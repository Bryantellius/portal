import React, { FunctionComponent, useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion";
import ApiClient from "../../utils/apiClient";
import AuthService from "../../utils/authService";
import { Button, Card } from "react-bootstrap";


type QuizProps = {
    id: number,
    title: string,
    lectureId: number,
    questions: any[]
};

export const Quiz: FunctionComponent<QuizProps> = ({ id, title, questions }) => {
    const apiClient = new ApiClient()
        , authService = new AuthService();

    const user = authService.getUser();
    const [quizSubmitted, setQuizSubmitted] = useState(false);

    const quizResponsesTemplate = questions.map(question => {
        return {
            quizQuestionId: question.id,
            userId: user.id,
            value: null
        };
    });

    const [quizResponses, setQuizResponses] = useState(quizResponsesTemplate);

    const handleUpdateQuizResponses = (index: number, value: any) => {
        const updatedResponses = quizResponses.slice();
        
        let normalizedValue = value;
        if (Array.isArray(value)) { //multiselect values
            normalizedValue = value.map(selectedOption => {
                return selectedOption.value;
            })
            .join(';');
        }
        else if (typeof value === 'object') {
            normalizedValue = value.value;
        } else {
            normalizedValue = value.toString();
        }

        updatedResponses[index].value = normalizedValue;
        setQuizResponses(updatedResponses);
    }

    const submitQuiz = async () => {
        const response = await apiClient.post(`/quiz/${ id }`, {
            userId: user.id,
            responses: quizResponses
        });
    
        setQuizSubmitted(true);
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Body>
                { 
                    questions && questions.map((question: any, index: number) => {
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
            <Card.Footer>
                <Button variant="primary" onClick={submitQuiz} />
            </Card.Footer>
        </Card>
    );
} 