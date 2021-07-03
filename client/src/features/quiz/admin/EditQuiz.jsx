import React, { Fragment, useEffect, useState } from 'react';
import { FieldArray, Form, Formik, Field } from 'formik';
import { Button, Col, Form as BootstrapForm, Row } from 'react-bootstrap';
import QuizQuestionEditor from './QuizQuestionEditor';
import { QuizQuestionType } from '../../../utils/enums';
import { useDispatch, useSelector } from 'react-redux';
import LineBreak from '../../shared/components/LineBreak';
import { useParams } from 'react-router-dom';
import FormikSelect from '../../shared/form/FormikSelect';
import styled from 'styled-components';
import LoadingContainer from '../../shared/components/LoadingContainer';
import { fetchLectures } from '../../lecture/lecture.slice';
import quizService from '../quiz.service';
import lectureService from '../../lecture/lecture.service';

const EditQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState();
  const [lectures, setLectures] = useState();
  const dispatch = useDispatch();

  const quizFormatter = quiz => {
    return {
      id: quiz.id,
      lectureId: quiz.lectureId,
      questions: quiz.quizQuestions.map(question => {
        return {
          id: question.id,
          options: question.quizQuestionOptions,
          text: question.text,
          type: question.type,
          correctAnswer: question.correctAnswer
        };
      })
    };
  };

  const lectureSelectOptions = lectures?.map(lecture => {
    return {
      value: lecture.id,
      label: lecture.title
    };
  });

  useEffect(() => {
    const loadQuiz = async () => {
      const quiz = await quizService.fetchById(id);
      setQuiz(quiz);

      const lectures = await lectureService.fetchAll();
      setLectures(lectures);
    };

    loadQuiz();
    dispatch(fetchLectures());
  }, [dispatch, id]);

  return (
    <LoadingContainer isLoading={!quiz}>
      {
        quiz && <Formik
          enableReinitialize={ true }
          initialValues={ quizFormatter(quiz) }
          onSubmit={ async ( values ) => {
            await quizService.upsert(values);
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
                )}
              </FieldArray>

              <Button variant="primary" type="submit">
                Save Quiz
              </Button>
            </Form>
          )}
        </Formik>
      }
    </LoadingContainer>
  );
};

const QuestionsContainer = styled.div`
  margin-top: 20px;
  max-height: 75vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

export default EditQuiz;