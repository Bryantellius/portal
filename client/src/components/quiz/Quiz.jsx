import React, { useEffect, useState } from 'react';
import QuizQuestion from './QuizQuestion';
import ApiClient from '../../utils/apiClient';
import PageActions from '../shared/PageActions';
import ActionButton from '../shared/ActionButton';
import { QuizQuestionType } from '../../utils/enums';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Quiz = ({
  id,
  title,
  questions,
  onSubmitted
}) => {
  const apiClient = new ApiClient();
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState();
  const user = useSelector(state => state.auth.user);

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

  const quizResponsesTemplate = questions.map(question => {
    return {
      quizQuestionId: question.id,
      userId: user.id,
      value: null
    };
  });

  const [quizResponses, setQuizResponses] = useState(quizResponsesTemplate);

  const handleUpdateQuizResponses = ( index, value ) => {
    const updatedResponses = quizResponses.slice();

    let normalizedValue = value;
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
    const response = await apiClient.post(`/quiz/${ id }`, {
      userId: user.id,
      quizId: id,
      responses: quizResponses
    });

    setQuizSubmitted(true);
    setQuizResponses(response.responses);
    setScore(response.score * 100);

    onSubmitted();
  };

  const resetQuiz = () => {
    setQuizSubmitted(false);
    setQuizResponses(quizResponsesTemplate);
    setScore(null);
  };

  return (
    <>
      <h2 className="d-inline-block w-80">{ title }</h2>
      {
        quizSubmitted &&
        <Badge variant={ score > 0.75 ? 'success' : 'danger' }>
          { score }%
        </Badge>
      }
      {
        questions && questions.map(( question, index ) => {
          return (
            <QuizQuestion
              key={ question.id }
              quizId={ id }
              questionId={ question.id }
              type={ question.type }
              questionText={ question.text }
              submitted={ quizSubmitted }
              isCorrect={ isAnswerCorrect(question.id) }
              options={ question.quizQuestionOptions }
              onUpdate={ handleUpdateQuizResponses.bind(this, index) }
              correctAnswers={ getCorrectAnswers(question.id) }
            />
          );
        })
      }

      <PageActions>
        {
          quizSubmitted &&
          <ActionButton variant="secondary" onClick={ resetQuiz }>
            Retake Quiz
          </ActionButton>
        }
        <ActionButton variant="primary"
                      onClick={ submitQuiz }>{ quizSubmitted ? 'Next Lecture' : 'Submit Responses' }</ActionButton>
      </PageActions>
    </>
  );
};

export default Quiz;