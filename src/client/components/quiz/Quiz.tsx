import React, { FunctionComponent, useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion";
import ApiClient from "../../utils/apiClient";
import AuthService from "../../utils/authService";


type QuizProps = {
    id: number,
    title: string,
    lectureId: number,
    lectureGroupId: number
    questions: any[]
}

export const Quiz: FunctionComponent<QuizProps> = ({ id, title, questions }) => {
    const apiClient = new ApiClient()
        , authService = new AuthService();

    const user = authService.getUser();
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizResponses, setQuizResponses] = useState(questions.map(question => {
        return {
            quizQuestionId: question.id,
            userId: user.id,
            value: null
        };
    }));

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
        <div className="quiz card">
            <h3 className="card-header">{title}</h3>
            <div className="card-body">
            { 
                questions.map((question: any, index: number) => {
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
            </div>
            <div className="card-footer text-center">
                <button type="button" className="btn btn-primary" onClick={submitQuiz}>
                    Submit Quiz
                </button>
            </div>
        </div>
    );
} 