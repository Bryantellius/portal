import React, { Fragment, useEffect } from 'react';
import { FieldArray, Form, Formik, Field } from 'formik';
import { Button, Col, Form as BootstrapForm, Row } from 'react-bootstrap';
import QuizQuestionEditor from './QuizQuestionEditor';
import { QuizQuestionType } from '../../../utils/enums';
import { useDispatch, useSelector } from 'react-redux';
import LineBreak from '../../shared/components/LineBreak';
import { fetchQuiz, saveQuiz } from '../quiz.slice';
import { useParams } from 'react-router-dom';
import Loading from '../../shared/components/Loading';
import FormikSelect from '../../shared/components/FormikSelect';
import styled from 'styled-components';

const EditQuiz = () => {
  const { id } = useParams();
  const quiz = useSelector(state => state.quiz.quiz);
  const dispatch = useDispatch();

  const quizFormatter = apiQuiz => {
    return {
      id: apiQuiz.id,
      lectureId: apiQuiz.lectureId,
      questions: apiQuiz.quizQuestions.map(question => {
        return {
          id: question.id,
          options: question.quizQuestionOptions,
          text: question.text,
          type: question.type
        };
      })
    };
  };

  const lectures = useSelector(state => state.lecture.lectures);

  const lectureSelectOptions = lectures.map(lecture => {
    return {
      value: lecture.id,
      label: lecture.title
    };
  });

  useEffect(() => {
    dispatch(fetchQuiz(id));
  }, [dispatch, id]);


  return quiz ?
    <Formik
      enableReinitialize={ true }
      initialValues={ quizFormatter(quiz) }
      onSubmit={ async ( values ) => {
        dispatch(saveQuiz(values));
      }}>
      {({
        values,
        handleChange,
        handleBlur,
        setFieldValue
      }) => (
        <Form>
          <BootstrapForm.Group>
            <BootstrapForm.Label>
              Lecture
            </BootstrapForm.Label>
            <Field
              component={FormikSelect}
              options={ lectureSelectOptions }
              name="lectureId"
            />
          </BootstrapForm.Group>
          <BootstrapForm.Label>
            Questions
          </BootstrapForm.Label>
          <FieldArray name="questions">
            {({ insert, remove, push }) => (
              <Fragment>
                <Button
                  size="sm"
                  variant="primary"
                  className="ml-4"
                  onClick={ () => push({ options: [], text: '', type: QuizQuestionType.Text }) }>
                  Add Question
                </Button>

                <LineBreak />

                <QuestionsContainer>
                  <Row>
                  {
                    values.questions.length > 0 &&
                    values.questions.map(( question, index ) => {
                      if (!question.correctAnswer) {
                        question.correctAnswer = null;
                      }
                      return (
                        <Col
                          key={index}
                          xs={ 12 }
                          md={ 10 }
                          xl={ 8 }
                          className="offset-md-1 offset-xl-2">
                          <QuizQuestionEditor
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            question={question}
                            values={values}
                            questionIndex={index}
                            remove={remove}
                            setFieldValue={setFieldValue}
                          />
                        </Col>
                      )
                    })
                  }
                  </Row>
                </QuestionsContainer>
              </Fragment>
            ) }
          </FieldArray>

          <Button variant="primary" type="submit">
            Save Quiz
          </Button>
        </Form>
      ) }
    </Formik>
    : <Loading />;
};

const QuestionsContainer = styled.div`
  margin-top: 20px;
  max-height: 75vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

export default EditQuiz;