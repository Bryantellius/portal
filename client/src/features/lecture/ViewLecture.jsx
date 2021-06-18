import React, { useState, useEffect } from 'react';
import ViewQuiz from '../quiz/ViewQuiz';
import { Col, Row, Tab } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLastLectureId } from '../auth/auth.slice';
import { setLectureCompleted, setCurrentLecture } from './lecture.slice';
import { updateCurrentLectureForCourse } from '../course/course.slice';
import LectureProgressBar from './LectureProgressBar';
import Exercise from '../exercise/Exercise';
import LectureContent from './LectureContent';
import LectureNavButtons from './LectureNavButtons';

const ViewLecture = () => {
  const { id } = useParams();
  const lectureId = parseInt(id);

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
    // Prompt Bar
    //   Main Content
      <Row className="main-content position-relative pb-5">
        <Col xl={9} className="docs-content pb-5">
          <h1 className="text-center">{lecture?.title}</h1>
          <Tab.Container activeKey={activeTab} defaultActiveKey="lesson">
            <LectureProgressBar activeTab={activeTab} setActiveTab={goToTab} />
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
                  <Exercise lecture={lecture} onSubmitted={onExerciseSubmitted} id={lecture?.exercise?.id} content={lecture?.exercise?.content} onNext={() => goToTab('quiz')} />
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
                  <LectureNavButtons isBackEnabled={true} isNextEnabled={false} onPrevious={() => goToTab('exercise')} />
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
        <Col xl={3} className="docs-sidebar d-none d-xl-block" />
      </Row>
  );
};

export default ViewLecture;