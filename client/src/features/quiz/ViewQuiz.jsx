import React, { useState } from 'react';
import QuizQuestion from './QuizQuestion';
import ActionButton from '../shared/components/ActionButton';
import { QuizQuestionType } from '../../utils/enums';
import { Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PageActions from '../shared/components/PageActions';

const ViewQuiz = ({
  id,
  title,
  questions,
  onSubmitted
}) => {
  const dispatch = useDispatch();
  const [usePreviousSubmission, setUsePreviousSubmission] = useState(true);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const quizSubmissions = useSelector(state => state.quiz.quizSubmissions);
  const user = useSelector(state => state.auth.user);
  const currentQuizSubmission = quizSubmissions.filter(submission => submission.quizId === id);

  const quizResponsesTemplate = questions.map(question => {
    return {
      quizQuestionId: question.id,
      userId: user.id,
      value: null
    };
  });

  const [quizResponses, setQuizResponses] = useState(quizResponsesTemplate);

  const isAnswerCorrect = questionId => {
    return quizResponses?.find(response => response.quizQuestionId === questionId)
      ?.isCorrect;
  };

  const getCorrectAnswers = questionId => {
    const answers = quizResponses?.find(response => response.quizQuestionId === questionId)
      ?.correctAnswers;

    if (!answers) {
      return [];
    }

    const question = questions.find(question => question.id === questionId);

    return answers.map(answer => {
      if (question.type === QuizQuestionType.Select
        || question.type === QuizQuestionType.MultiSelect) {
        const correctOption = question.quizQuestionOptions.find(option => option.value === answer);
        return correctOption.text;
      }

      return answer;
    });
  };

  const handleUpdateQuizResponses = ( index, value ) => {
    const updatedResponses = quizResponses.slice();

    let normalizedValue;
    if (Array.isArray(value)) { //multiselect values
      normalizedValue = value.map(selectedOption => {
        return selectedOption.value;
      })
      .join(';');
    } else if (typeof value === 'object') {
      normalizedValue = value.value;
    } else {
      normalizedValue = value.toString();
    }

    updatedResponses[index].value = normalizedValue;
    setQuizResponses(updatedResponses);
  };

  const submitQuiz = async () => {
    await dispatch(submitQuiz({
      quizId: id,
      userId: user?.id,
      responses: quizResponses
    }));

    onSubmitted();
  };

  const resetQuiz = () => {
    setQuizSubmitted(false);
    setQuizResponses(quizResponsesTemplate);
    setUsePreviousSubmission(false);
  };

  return (
    <>
      <h2 className="d-inline-block w-80">{ title }</h2>
      {
        quizSubmitted &&
        <Badge variant={ currentQuizSubmission?.score > 0.75 ? 'success' : 'danger' }>
          { currentQuizSubmission?.score * 100 }%
        </Badge>
      }
      {
        questions && questions.map(( question, index ) => {
          return (
            <QuizQuestion
              key={ question.id }
              quizId={ id }
              question={question}
              submitted={ quizSubmitted }
              usePreviousSubmission={usePreviousSubmission}
              previousResponse={currentQuizSubmission?.responses?.find(response => response.quizQuestionId === question?.id )}
              isCorrect={ isAnswerCorrect(question.id) }
              options={ question.quizQuestionOptions }
              onUpdate={ handleUpdateQuizResponses.bind(this, index) }
              correctAnswers={ getCorrectAnswers(question.id) }
            />
          );
        })
      }
      <PageActions side="right" className="clearfix">
        <ActionButton variant="secondary" onClick={ resetQuiz }>
          Retake Quiz
        </ActionButton>
        <ActionButton variant="primary"
                      onClick={ submitQuiz }>
          { quizSubmitted ? 'Next Lecture' : 'Submit' }
        </ActionButton>
      </PageActions>
    </>
  );
};

export default ViewQuiz;