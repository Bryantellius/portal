import React from 'react';
import { Field, ErrorMessage } from 'formik';
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
  const handleIsCorrectChanged = e => {
    if (values.questions[questionIndex]?.type === QuizQuestionType.Select) {
      values.questions[questionIndex].options.forEach((option, index) => {
        setFieldValue(`questions.${ questionIndex }.options.${ index }.isCorrect`, index === optionIndex);
      });
    } else {
      handleChange(e);
    }
  };

  const option = values.questions[questionIndex]?.options[optionIndex];
  return (
    <Card className="quiz-question-option-editor">
      <Card.Body>
        <Card.Title>
          Choice { optionIndex + 1 }
        </Card.Title>
        <Form.Group>
          <Form.Label>
            Identifier/Value
            <br />
            <small className="text-muted">
              Just use the label if you aren't sure
            </small>
          </Form.Label>
          <Form.Control
            value={option?.value}
            onChange={handleChange}
            onBlur={handleBlur}
            name={`questions.${ questionIndex }.options.${ optionIndex }.value`}
            type="text"
          />
          <ErrorMessage
            name={`questions.${ questionIndex }.options.${ optionIndex }.value`}
            component="div"
            className="field-error"
          />
        </Form.Group>
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
              checked={!!option?.isCorrect}
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