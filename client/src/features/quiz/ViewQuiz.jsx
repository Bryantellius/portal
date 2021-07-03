import React, { useEffect, useState } from 'react';
import QuizQuestion from './QuizQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { submitQuiz } from './store/quiz.thunks';
import { Formik, FieldArray, Form } from 'formik';
import { Affix, Button, Typography } from 'antd';
import { ArrowRightOutlined, CheckOutlined, RetweetOutlined } from '@ant-design/icons';

const ViewQuiz = ({
  id,
  lecture,
  questions,
  onSubmitted
}) => {
  const dispatch = useDispatch();
  const [usePreviousSubmission, setUsePreviousSubmission] = useState(false);
  const getInitialValues = () => {
    return {
      userId: user?.id,
      quizId: id,
      quizQuestionResponses: quizResponsesTemplate
    };
  }

  const quizSubmissions = useSelector(state => state.quiz.userSubmissions);
  const user = useSelector(state => state.auth.user);
  const currentQuizSubmission = quizSubmissions?.filter(submission => submission.quizId === id)?.slice(-1)[0];
  const quizResponsesTemplate = questions.map(question => {
    return {
      quizQuestionId: question.id,
      userId: user.id,
      value: ''
    };
  });
  const [initialValues, setInitialValues] = useState(getInitialValues());

  useEffect(() => {
    if (currentQuizSubmission && currentQuizSubmission.id) {
      setUsePreviousSubmission(true);
      setInitialValues(currentQuizSubmission);
    }
  }, [currentQuizSubmission]);

  const [quizResponses, setQuizResponses] = useState(quizResponsesTemplate);

  const isAnswerCorrect = questionId => {
    return quizResponses?.find(response => response.quizQuestionId === questionId)
      ?.isCorrect;
  };

  const getCorrectAnswers = questionId => {
    const question = questions.find(question => question.id === questionId);

    return question.correctAnswer.split(';');
  };


  const handleSubmit = async values => {
    await dispatch(submitQuiz(values));
    onSubmitted(values.quizQuestionResponses);
  };

  const resetQuiz = () => {
    setInitialValues(getInitialValues());
    setUsePreviousSubmission(false);
  };

  const nextLecture = () => {

  }

  return (
    <>
      <Formik
        initialValues={ initialValues }
        enableReinitialize={ true }
        onSubmit={ handleSubmit }>
        <Form>

          <h2 className="">
            { lecture?.title } Quiz
          </h2>

          {
            usePreviousSubmission &&
              <Typography.Paragraph
                style={{textAlign: 'right', width: '100%'}}
                strong>
                Your Score:  { currentQuizSubmission.score * 100 }%
              </Typography.Paragraph>
          }

          <FieldArray name="responses">
            {() => (
              questions && questions.map((question, index) => {
                return (
                  <QuizQuestion
                    key={ index }
                    questionIndex={ index }
                    question={ question }
                    correctAnswers={ getCorrectAnswers(question.id) }
                    usePreviousSubmission={ usePreviousSubmission }
                  />
                );
              })
            )}
          </FieldArray>

          <Affix
            style={{ position: 'absolute', right: 0 }}
            offsetBottom={10}>
            {
              usePreviousSubmission
                ?
                <>
                  <Button
                    size="large"
                    type="default"
                    style={{ right: 0 }}
                    onClick={resetQuiz}
                    icon={ <RetweetOutlined />}>
                    Retake Quiz
                  </Button>
                  <Button
                  size="large"
                  type="primary"
                  style={{ right: 0 }}
                  onClick={nextLecture}
                  icon={ <ArrowRightOutlined />}>
                  Next Lecture
                </Button>
                </>
              : <Button
                  type="primary"
                  size="large"
                  shape="round"
                  htmlType="submit"
                  icon={<CheckOutlined />}>
                  Submit
                </Button>
            }
          </Affix>
        </Form>
      </Formik>
    </>
  );
};

export default ViewQuiz;