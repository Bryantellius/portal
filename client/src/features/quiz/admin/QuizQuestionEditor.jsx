import React, { Fragment } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Field, FieldArray, ErrorMessage } from 'formik';
import { QuizQuestionType } from '../../../utils/enums';
import QuizQuestionOptionEditor from './QuizQuestionOptionEditor';
import FormikSelect from '../../shared/form/FormikSelect';
import LineBreak from '../../shared/components/LineBreak';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import './QuizQuestionEditor.scss';

const QuizQuestionEditor = ({
  question,
  questionIndex,
  values,
  handleChange,
  handleBlur,
  remove,
  setFieldValue,
  ...props
}) => {
  const hasOptions = () => {
    return values.questions[questionIndex]?.type
      && (
        parseInt(values.questions[questionIndex]?.type) === QuizQuestionType.Select
        || parseInt(values.questions[questionIndex]?.type) === QuizQuestionType.MultiSelect
      );
  };

  const questionTypeSelectOptions = [
    { label: 'True/False', value: QuizQuestionType.TrueFalse },
    { label: 'Text', value: QuizQuestionType.Text },
    { label: 'Single Selection', value: QuizQuestionType.Select },
    { label: 'Multiple Selection', value: QuizQuestionType.MultiSelect }
  ];

  const trueFalseSelectOptions = [
    { label: 'True', value: true },
    { label: 'False', value: false }
  ];

  return (
    <Card variant="secondary" { ...props } className="quiz-question-editor">
      <Card.Body>
        <Card.Title>
          Question { questionIndex + 1 }
        </Card.Title>
        <Form.Group>
          <Form.Label>Question Text</Form.Label>
          <Field
            as={ Form.Control }
            name={ `questions.${ questionIndex }.text` }
            placeholder="Question Text"
            type="text"
          />
          <ErrorMessage
            name={ `friends.${ questionIndex }.text` }
            component="div"
            className="field-error"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Type
          </Form.Label>
          <Field
            component={ FormikSelect }
            options={ questionTypeSelectOptions }
            name={ `questions.${ questionIndex }.type` }
          />
        </Form.Group>
        {
          values.questions[questionIndex].type === QuizQuestionType.Text &&
          <Form.Group>
            <Form.Label>
              Correct Answer
            </Form.Label>
            <Form.Control
              type="text"
              value={ values.questions[questionIndex].correctAnswer || '' }
              onChange={ handleChange }
              onBlur={ handleBlur }
              name={ `questions.${ questionIndex }.correctAnswer` }
            />
          </Form.Group>
        }
        {
          values.questions[questionIndex].type === QuizQuestionType.TrueFalse &&
          <Form.Group>
            <Form.Label>
              Correct Answer
            </Form.Label>
            <Field
              component={ FormikSelect }
              options={ trueFalseSelectOptions }
              name={ `questions.${ questionIndex }.correctAnswer` }
            />
          </Form.Group>
        }
        {
          hasOptions() &&
          <Fragment>
            <Form.Label>
              Choices
            </Form.Label>
            <FieldArray name={ `questions.${ questionIndex }.options` }>
              { ( { remove, push } ) => (
                <Fragment>
                  <Button
                    size="sm"
                    className="ml-4"
                    variant="primary"
                    onClick={ () => push({ value: '', label: '' }) }>
                    Add Choice
                  </Button>
                  <LineBreak />
                  <QuestionOptionsContainer>
                    <Row noGutters={ true }>
                      {
                        question.options.length > 0
                        && question.options.map(( option, index ) => (
                          <Col xs={ 12 } md={ 6 } xl={ 4 } key={ index }>
                            <QuizQuestionOptionEditor
                              questionIndex={ questionIndex }
                              optionIndex={ index }
                              key={ index }
                              handleBlur={ handleBlur }
                              handleChange={ handleChange }
                              values={ values }
                              remove={ remove }
                              setFieldValue={ setFieldValue }
                            />
                          </Col>
                        ))
                      }
                    </Row>
                  </QuestionOptionsContainer>
                </Fragment>
              ) }
            </FieldArray>
          </Fragment>
        }
        <Button
          size="sm"
          variant="danger"
          onClick={ () => remove(questionIndex) }
          className="float-right">
          <FontAwesomeIcon icon={ faTrash } />
        </Button>
        <br style={ { clear: 'both' } } />
      </Card.Body>
    </Card>
  );
};

const QuestionOptionsContainer = styled.div`
  margin-top: 15px;
`;

export default QuizQuestionEditor;