import React, { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import { QuizQuestionType } from "../../utils/enums";
import QuizQuestionResponse from "./QuizQuestionResponse";

type QuizQuestionProps = {
    questionId: number,
    quizId: number,
    type: QuizQuestionType
    questionText: string,
    options: Array<{ 
        text: string,
        value: string,
        sortOrder: number
    }>
    onUpdate: any
};

const QuizQuestion: FunctionComponent<QuizQuestionProps> = ({
    questionId, 
    type,
    questionText,
    options,
    onUpdate
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
                />
            </Card.Body>
        </Card>
    );
}

export default QuizQuestion