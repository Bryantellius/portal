import React from "react";
import {
    Form
} from 'react-bootstrap';
import Select from "react-select";
import { QuizQuestionType } from "../../utils/enums";

const QuizQuestionResponse = ({
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
                    <div className="mb-3">
                        <Form.Check
                            label="True"
                            type="radio"
                            value="true"
                            name={nameAttribute} 
                            onChange={(event) => onUpdate(event.target.value)}
                        />
                        <Form.Check
                            label="False"
                            type="radio"
                            value="false"
                            name={nameAttribute}
                            onChange={(event) => onUpdate(event.target.value)}
                        />
                    </div>
                </div>
            );
        case QuizQuestionType.Text:
            return (
                    <Form.Control
                        type="text" 
                        placeholder="Enter your answer"
                        name={nameAttribute}
                        onChange={event => onUpdate(event.target.value)}
                    />
            );
        case QuizQuestionType.Select:
            return (
                <Select
                    closeMenuOnSelect={true}
                    options={selectOptions}
                    onChange={(val) => onUpdate(val)}
                />
            );
        case QuizQuestionType.MultiSelect:
            return (
                <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={selectOptions}
                    onChange={(val) => onUpdate(val)}
                />
            );
        default: 
            return <></>;
    }
}

export default QuizQuestionResponse;