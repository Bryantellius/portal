import React, { useState, useEffect } from 'react';
import ViewQuiz from '../quiz/ViewQuiz';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLastLectureId } from '../auth/auth.slice';
import { setCurrentLecture, setLectureCompleted } from './lecture.slice';
import { updateCurrentLectureForCourse } from '../course/course.slice';
import LectureStepsNav from './LectureStepsNav';
import Exercise from '../exercise/Exercise';
import LectureContent from './LectureContent';
import { Affix, Button } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import ViewLectureCompletion from './ViewLectureCompletion';

const ViewLecture = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const lectureId = parseInt(params.lectureId);
  const [currentStep, setCurrentStep] = useState(0);
  const activeCourse = useSelector(state => state.course.activeCourse);
  const lecture = useSelector(state => state.lecture.currentLecture);
  const [quizResponses, setQuizResponses] = useState([]);
  const nextLectureId = parseInt(params.lectureId) + 1;


  const completeLecture = () => {
    const nextRoute = `/course/${ params.courseId }/lecture/${ nextLectureId }`;

    history.replace(nextRoute);
  }

  const goToStep = stepName => {
    const steps = [
      'lesson',
      'exercise',
      'quiz',
      'results'
    ]
    setCurrentStep(steps.indexOf(stepName));
  };

  const onExerciseSubmitted = () => {
    goToStep('quiz');
  };

  const onQuizSubmitted = (responses) => {
    dispatch(setLectureCompleted(lecture));
    goToStep('results');
    setQuizResponses(responses);
  };

  const onLectureComplete = () => {
    const allLectures = activeCourse?.modules?.flatMap(module => module?.lectures);

    const currentLecture = allLectures?.findIndex(lecture => lecture.id === lectureId) + 1;
    dispatch(setCurrentLecture(currentLecture));
    dispatch(updateCurrentLectureForCourse(currentLecture));
  };

  const onRetakeQuiz = () => {
    history.goBack();
    goToStep('quiz');
  };

  useEffect(() => {
    dispatch(setLastLectureId(lectureId));
    const allLectures = activeCourse?.modules?.flatMap(module => module?.lectures);
    const currentLecture = allLectures?.find(lecture => lecture.id === lectureId);
    if (!!lectureId && !!currentLecture) {
      dispatch(setCurrentLecture(currentLecture));
    }
    dispatch(updateCurrentLectureForCourse({ courseId: activeCourse.id, lastLectureId: lectureId }));

  }, [dispatch, activeCourse, lectureId]);

  return (
    <LectureWrapper>
      <h1 className="text-center">{lecture?.title}</h1>
      <LectureStepsNav currentStep={currentStep} onChange={setCurrentStep} />
      <LectureStepWrapper>
        {
          currentStep === 0 && lecture?.content &&
          <LectureContent content={lecture?.content} videos={lecture?.videos} />
        }
        {
          currentStep === 1 && lecture?.exercise &&
          <Exercise
            exercise={lecture.exercise}
            onSubmitted={onExerciseSubmitted}
            onNext={() => goToStep('quiz')}
          />
        }
        {
          currentStep === 2 && lecture?.quiz &&
            <ViewQuiz
              onSubmitted={onQuizSubmitted}
              title={lecture?.quiz.title}
              id={lecture?.quiz.id}
              lecture={lecture}
              questions={lecture?.quiz?.quizQuestions}
            />
        }
        {
            currentStep === 3 &&
              <ViewLectureCompletion
                questions={lecture?.quiz?.quizQuestions}
                responses={quizResponses}
                onContinue={completeLecture}
                onRetakeQuiz={() => goToStep("quiz")}
              />
        }
        {
          currentStep !== 0 &&
            currentStep !== 3 &&
          <Affix
            style={ { position: 'absolute', left: 0 } }
            offsetBottom={ 10 }>
            <Button
              size="large"
              type="primary"
              onClick={ () => setCurrentStep(currentStep - 1) }
              icon={ <ArrowLeftOutlined /> }>
              Back
            </Button>
          </Affix>
        }
        {
          currentStep < 2 &&
          <Affix
            style={{ position: 'absolute', right: 0 }}
            offsetBottom={10}>
            <Button
              size="large"
              type="primary"
              style={{ right: 0 }}
              onClick={ () => setCurrentStep(currentStep + 1) }
              icon={ <ArrowRightOutlined />}>
              Next
            </Button>
          </Affix>
        }
      </LectureStepWrapper>
    </LectureWrapper>
  );
};

const LectureWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px;
`;

const LectureStepWrapper = styled.div`
  position: relative;
  padding-top: 20px;
`;

export default ViewLecture;