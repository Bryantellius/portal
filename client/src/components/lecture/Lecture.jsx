import React, { useState, useEffect } from 'react';
import ApiClient from '../../utils/apiClient';
import Quiz from '../quiz/Quiz';
import { Col, Row, Tab } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLastLectureId } from '../../store/auth/authSlice';
import { setCurrentLecture, setLectureCompleted } from '../../store/lecture/lectureReducer';
import { getNextLecture } from '../../store/lecture/lectureSelectors';
import LectureProgressBar from './LectureProgressBar';
import Exercise from './Exercise';
import LectureContent from './LectureContent';
import LectureNavButtons from './LectureNavButtons';

const Lecture = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [content, setLectureContent] = useState('');
  const [activeTab, setActiveTab] = useState('lesson');
  const user = useSelector(state => state.auth.user);
  const lecture = useSelector(state => state.lecture.currentLecture);
  const allLectures = useSelector(state => state.lecture.lectures);
  const nextLecture = useSelector(getNextLecture);
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
    const updateLastLesson = async () => {
      const apiClient = new ApiClient();
      if (nextId) {
        await apiClient.put(`/user/${ user.id }`, {
          lastLectureId: lecture.id
        });
        dispatch(setLastLectureId(nextId));
      }
    };
    updateLastLesson();
  }, [nextId, dispatch]);

  useEffect(() => {
    const thisLecture = allLectures.find(lecture => lecture.id === parseInt(id));
    dispatch(setCurrentLecture(thisLecture));
  }, [dispatch, allLectures, window.location.pathname]);

  useEffect(() => {
    const fetchLectureContent = async () => {
      const apiClient = new ApiClient();
      const content = await apiClient.get(`/lecture/${id}/content`);
      setLectureContent(content);
    };

    fetchLectureContent();
  }, [id, window.location.pathname]);

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
                  content &&
                  <LectureContent content={content} videos={lecture?.videos} />
                }
                <LectureNavButtons isNextEnabled={true} isBackEnabled={false} onNext={() => goToTab('exercise')} />
              </Tab.Pane>
              <Tab.Pane eventKey="exercise">
                {
                  lecture?.exercise &&
                  <Exercise onSubmitted={onExerciseSubmitted} id={lecture?.exercise?.id} content={lecture?.exercise?.content} onNext={() => goToTab('quiz')} />
                }
                <LectureNavButtons isBackEnabled={true} isNextEnabled={false} onPrevious={() => goToTab('lesson')} />
              </Tab.Pane>
              <Tab.Pane eventKey="quiz">
                <div className="docs-quiz">
                  {
                    lecture?.quiz && lecture?.quiz?.id &&
                      <Quiz
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

export default Lecture;