import React, { useState } from "react";
import { Form } from 'react-bootstrap';
import Select from "react-select";
import { QuizQuestionType } from "../../utils/enums";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import IncorrectAnswerLabel from './IncorrectAnswerLabel';

const QuizQuestionResponse = ({
  questionId,
  type,
  options,
  onUpdate,
  isCorrect,
  submitted,
  correctAnswers
}) => {
  const [value, setValue] = useState();
  const nameAttribute = `question-${ questionId }`;
  const selectOptions = options && options.length > 0
    ? options.map(option => {
      return {
        label: option.text,
        value: option.value
      };
    })
    : [];

  const handleUpdate = value => {
    setValue(value);
    onUpdate(value);
  };


  const ResponseInput = () => {
    switch (type) {
      case QuizQuestionType.TrueFalse:
        return (
          <div className="mb-3 d-inline-block w-90 ml-2">
            <Form.Check
              label="True"
              type="radio"
              value="true"
              checked={value === "true"}
              name={ nameAttribute }
              onChange={ ( event ) => handleUpdate(event.target.value) }
            />
            <Form.Check
              label="False"
              type="radio"
              value="false"
              checked={value === "false"}
              name={ nameAttribute }
              onChange={ ( event ) => handleUpdate(event.target.value) }
            />
          </div>
        );
      case QuizQuestionType.Text:
        return (
          <Form.Control
            className="d-inline-block w-90 ml-2"
            type="text"
            placeholder="Enter your answer"
            value={value}
            name={ nameAttribute }
            onChange={ event => handleUpdate(event.target.value) }
          />
        );
      case QuizQuestionType.Select:
        return (
          <Select
            className="d-inline-block w-90 ml-2"
            value={value}
            closeMenuOnSelect={ true }
            options={ selectOptions }
            onChange={ ( val ) => handleUpdate(val) }
          />
        );
      case QuizQuestionType.MultiSelect:
        return (
          <Select
            className="d-inline-block w-90 ml-2"
            closeMenuOnSelect={ false }
            isMulti
            options={ selectOptions }
            value={value}
            onChange={ ( val ) => handleUpdate(val) }
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="quiz-question-response form">
      {
        submitted && (
          isCorrect
            ? <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
            : <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />
        )
      }
      {
        submitted && !isCorrect && (
          <IncorrectAnswerLabel correctAnswers={correctAnswers} />
        )
      }
      <ResponseInput />
    </div>
  );
};

export default QuizQuestionResponse;