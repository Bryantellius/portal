import React, { FunctionComponent } from "react";
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
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">{questionText}</h4>
            
                <QuizQuestionResponse
                    questionId={questionId}
                    type={type}
                    options={options}
                    onUpdate={onUpdate}
                />
            </div>
        </div>
    )
}

export default QuizQuestion