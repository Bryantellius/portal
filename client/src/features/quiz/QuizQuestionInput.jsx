import React  from 'react';
import { Select, Input } from 'formik-antd';
import { QuizQuestionType } from "../../utils/enums";
import {  useFormikContext } from 'formik';
import TrueFalse from '../shared/form/TrueFalse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import IncorrectAnswerLabel from './IncorrectAnswerLabel';
import _ from 'lodash';

const QuizQuestionInput = ({
  questionIndex,
  question,
  submitted,
  usePreviousSubmission,
  correctAnswers
}) => {
  const {
    type,
    quizQuestionOptions
  } = question;

  const nameAttribute = `quizQuestionResponses.${ questionIndex }.value`;
  const selectOptions = quizQuestionOptions && quizQuestionOptions.length > 0
    ? quizQuestionOptions.map(option => {
      return {
        label: option.text,
        value: option.value
      };
    })
    : [];

  switch (type) {
    case QuizQuestionType.TrueFalse:
      return (
        <TrueFalse
          name={nameAttribute}
          disabled={usePreviousSubmission}
        />
      )
    case QuizQuestionType.Text:
      return (
        <Input
          name={ nameAttribute }
          disabled={usePreviousSubmission}
        />
      );
    case QuizQuestionType.Select:
      return (
        <Select
          name={ nameAttribute }
          disabled={usePreviousSubmission}
          style={{ width: '100%' }}
          options={ selectOptions }
        />
      );
    case QuizQuestionType.MultiSelect:
      return (
        <Select
          name={ nameAttribute }
          allowClear
          disabled={usePreviousSubmission}
          style={{ width: '100%' }}
          mode="multiple"
          options={selectOptions}
        />
      );
    default:
      return <></>;
  }
};

const ValidationSummary = ({
  questionIndex,
  question,
  usePreviousSubmission,
  correctAnswers
}) => {
  const {
    values
  } = useFormikContext();

  const isCorrect = () => {
    const value = values.quizQuestionResponses[questionIndex].value;

    switch (question.type) {
      case QuizQuestionType.Select:
      case QuizQuestionType.TrueFalse:
        return value === question.correctAnswer;
      case QuizQuestionType.Text:
        return question.correctAnswer.split(';').includes(value);
      case QuizQuestionType.MultiSelect:
        return _.xor( question.correctAnswer.split(';'), value.split(';')).length === 0;
    }
  };
  return (
    <>
      {
        usePreviousSubmission && (
          isCorrect()
            ? <FontAwesomeIcon icon={ faCheckCircle } className="text-success" />
            : <FontAwesomeIcon icon={ faTimesCircle } className="text-danger" />
        )
      }
      {
        usePreviousSubmission && !isCorrect() && <IncorrectAnswerLabel correctAnswers={ correctAnswers } />
      }
    </>
  );
}

const InputWithValidation = ({
  ...props
}) => {
  return (
    <>
      <ValidationSummary {...props} />
      <QuizQuestionInput {...props} />
    </>
  );
}

export default InputWithValidation;