import React, { FunctionComponent } from "react";
import Select from "react-select";
import { QuizQuestionType } from "../../utils/enums";

type QuizQuestionResponseProps = {
    questionId: number,
    type: QuizQuestionType,
    options: Array<any>,
    onUpdate: any
}

const QuizQuestionResponse: FunctionComponent<QuizQuestionResponseProps> = ({ 
    questionId, 
    type, 
    options,
    onUpdate
}) => {
    const nameAttribute = `question-${ questionId }`;
    const selectOptions = options && options.length > 0 
        ? options.map(option => {
            return {
                label: option.text,
                value: option.value
            };
        })
        : [];

    switch (type) {
        case QuizQuestionType.TrueFalse:
            return (
                <div className="quiz-question-response form">
                    <div className="form-check">
                        <label className="form-check-label">
                            <input 
                                type="radio"
                                className="form-check-input" 
                                name={nameAttribute} 
                                value="true" 
                                onChange={(event: any) => onUpdate(event.target.value)}
                            />
                            True
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input 
                                type="radio" 
                                className="form-check-input" 
                                name={nameAttribute} 
                                value="false" 
                                onChange={(event: any) => onUpdate(event.target.value)}
                            />
                            False
                        </label>
                    </div>
                </div>
            );
        case QuizQuestionType.Text:
            return (
                <div className="quiz-question-response form">
                    <input 
                        type="text" 
                        className="form-control" 
                        name={nameAttribute} 
                        placeholder="Enter your answer"
                        onChange={event => onUpdate(event.target.value)}
                    />
                </div>
            );
        case QuizQuestionType.Select:
            return (
                <Select
                    closeMenuOnSelect={true}
                    options={selectOptions}
                    onChange={(val: any) => onUpdate(val)}
                />
            );
        case QuizQuestionType.MultiSelect:
            return (
                <div className="quiz-question-response form">

                    <Select
                        closeMenuOnSelect={false}
                        isMulti
                        options={selectOptions}
                        onChange={(val: any) => onUpdate(val)}
                    />
                </div>
            );
        default: 
            return <></>;
    }
}

export default QuizQuestionResponse;