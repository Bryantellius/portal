import React, { useState, useEffect } from 'react';
import ViewQuiz from '../quiz/ViewQuiz';
import styled from 'styled-components';
import { Tab } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLastLectureId } from '../auth/auth.slice';
import { setLectureCompleted, setCurrentLecture } from './lecture.slice';
import { updateCurrentLectureForCourse } from '../course/course.slice';
import LectureStepsNav from './LectureStepsNav';
import Exercise from '../exercise/Exercise';
import LectureContent from './LectureContent';
import LectureNavButtons from './LectureNavButtons';

const ViewLecture = () => {
  const params = useParams();
  const lectureId = parseInt(params.lectureId);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('lesson');
  const activeCourse = useSelector(state => state.course.activeCourse);
  const allLectures = useSelector(state => state.lecture.lectures);
  const lecture = useSelector(state => state.lecture.currentLecture);
  const nextLecture = useSelector(state => {
    const currentLectureIndex = allLectures?.findIndex(lecture => lecture.id === lectureId);
    return allLectures?.length > currentLectureIndex + 1
      ? allLectures[currentLectureIndex + 1]
      : null;
  });

  const [exerciseSubmitted, setExerciseSubmitted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const nextId = nextLecture?.id;



  const goToTab = tabName => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    setActiveTab('lesson');
  }, [window.location.pathname]);

  const onExerciseSubmitted = () => {
    setExerciseSubmitted(true);
    if (quizSubmitted) {
      dispatch(setLectureCompleted(lecture));
    }
  };

  const onQuizSubmitted = () => {
    setQuizSubmitted(true);
    if (exerciseSubmitted) {
      dispatch(setLectureCompleted(lecture));
    }
  };

  useEffect(() => {
    dispatch(setLastLectureId(lectureId));
    const currentLecture = allLectures.find(lecture => lecture.id === lectureId);
    if (!!lectureId && !!currentLecture) {
      dispatch(setCurrentLecture(currentLecture));
    }
    dispatch(updateCurrentLectureForCourse({ courseId: activeCourse.id, lastLectureId: lectureId }));

  }, [dispatch, lectureId, activeCourse?.id]);

  return (
    <LectureWrapper>
      <h1 className="text-center">{lecture?.title}</h1>
      <Tab.Container activeKey={activeTab} defaultActiveKey="lesson">
        <LectureStepsNav activeTab={activeTab} setActiveTab={goToTab} />
        <Tab.Content style={{ position: 'relative', paddingTop: '20px' }}>
          <Tab.Pane eventKey="lesson">
            {
              lecture?.content &&
              <LectureContent content={lecture?.content} videos={lecture?.videos} />
            }
            <LectureNavButtons isNextEnabled={true} isBackEnabled={false} onNext={() => goToTab('exercise')} />
          </Tab.Pane>
          <Tab.Pane eventKey="exercise">
            {
              lecture?.exercise &&
              <Exercise exercise={lecture.exercise} onSubmitted={onExerciseSubmitted} onNext={() => goToTab('quiz')} />
            }
            <LectureNavButtons isBackEnabled={true} isNextEnabled={false} onPrevious={() => goToTab('lesson')} />
          </Tab.Pane>
          <Tab.Pane eventKey="quiz">
            <div className="docs-quiz">
              {
                lecture?.quiz && lecture?.quiz?.id &&
                  <ViewQuiz
                    onSubmitted={onQuizSubmitted}
                    title={lecture?.quiz.title}
                    id={lecture?.quiz.id}
                    lectureId={lecture?.id}
                    questions={lecture?.quiz?.quizQuestions}
                  />
              }
              <LectureNavButtons nextLabel="Submit" isBackEnabled={true} isNextEnabled={false} onPrevious={() => goToTab('exercise')} />
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </LectureWrapper>
  );
};

const LectureWrapper = styled.div`
  width: 100%;
`;

export default ViewLecture;