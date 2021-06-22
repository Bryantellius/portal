import React from 'react';
import { ErrorMessage } from 'formik';
import { Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './QuizQuestionOptionEditor.scss';
import LineBreak from '../../shared/components/LineBreak';
import { QuizQuestionType } from '../../../utils/enums';

const QuizQuestionOptionEditor = ({
  questionIndex, 
  optionIndex,
  remove,
  values,
  handleChange,
  handleBlur,
  setFieldValue
}) => {
  const question = values.questions[questionIndex];
  const option = question?.options[optionIndex];

  const handleIsCorrectChanged = e => {
    if (question.type === QuizQuestionType.Select) {
      question.options.forEach((option, index) => {
        setFieldValue(`questions.${ questionIndex }.options.${ index }.isCorrect`, index === optionIndex);
      });
      setFieldValue(`questions.${ questionIndex }.correctAnswer`, option.text);
    } else {
      handleChange(e);

      let correctValues = question.correctAnswer.split(';');
      if (e.target.checked) {
        correctValues.push(option.text);
      } else {
        correctValues = correctValues.filter(value => value !== option.text);
      }

      setFieldValue(`questions.${ questionIndex }.correctAnswer`, correctValues.join(';'));
    }
  };

  const isCorrect = option => {
    return values.questions[questionIndex].correctAnswer.split(';').includes(option.text);
  };

  return (
    <Card className="quiz-question-option-editor">
      <Card.Body>
        <Card.Title>
          Choice { optionIndex + 1 }
        </Card.Title>
        <Form.Group>
          <Form.Label>
            Label
          </Form.Label>
          <Form.Control
            value={option?.text}
            onChange={handleChange}
            onBlur={handleBlur}
            name={`questions.${ questionIndex }.options.${ optionIndex }.text`}
            type="text"
          />
          <ErrorMessage
            name={`questions.${ questionIndex }.options.${ optionIndex }.text`}
            component="div"
            className="field-error"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            <Form.Check
              name={`questions.${ questionIndex }.options.${ optionIndex }.isCorrect`}
              checked={isCorrect(option)}
              inline={true}
              onChange={e => handleIsCorrectChanged(e)}
              onBlur={handleBlur}
              value={true}
            />
            Mark as correct
          </Form.Label>
        </Form.Group>

        <Button
          size="sm"
          variant="danger"
          onClick={() => remove(optionIndex)}
          className="float-right">
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <LineBreak />
      </Card.Body>
    </Card>
  );
};

export default QuizQuestionOptionEditor;