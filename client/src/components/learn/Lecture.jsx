import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import { NavLink } from 'react-router-dom';
import ApiClient from '../../utils/apiClient';
import { Quiz } from '../quiz/Quiz';
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLastLectureId } from '../../store/auth/reducers/authReducer';
import { setCurrentLecture } from '../../store/lecture/lectureReducer';
import { getNextLecture, getPreviousLecture } from '../../store/lecture/lectureSelectors';

const Lecture = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [content, setLectureContent] = useState('');
  const user = useSelector(state => state.auth.user);
  const lecture = useSelector(state => state.lecture.currentLecture);
  const previousLecture = useSelector(getPreviousLecture);
  const nextLecture = useSelector(getNextLecture);
  const nextId = nextLecture?.id;
  const prevId = previousLecture?.id;

  const updateLastLesson = async () => {
    const apiClient = new ApiClient();
    if (nextId) {
      await apiClient.put(`/user/${ user.id }`, {
        lastLectureId: nextId
      });
      dispatch(setLastLectureId(nextId));
    }
  };

  useEffect(() => {
    dispatch(setCurrentLecture(lecture));
  }, [dispatch, lecture]);

  useEffect(() => {
    const fetchLectureContent = async () => {
      const apiClient = new ApiClient();
      const content = await apiClient.get(`/lecture/${id}/content`);
      setLectureContent(content);
    };

    fetchLectureContent();
  }, [id]);

  return (
    // Prompt Bar
    //   Main Content
      <Row className="main-content position-relative pb-5">
        <Col xl={9} className="docs-content pb-5">
          <Row className="pt-3 mt-3">
            <Col xs={6} className="text-right">
              <span className="text-muted px-3 border-bottom border-info">{previousLecture?.title}</span>
              <NavLink
                to={`/learn/${prevId}`}
                className="btn btn-sm btn-outline-primary">
                  Back
              </NavLink>
            </Col>
            <div className="col-6">
              <NavLink
                to={`/learn/${nextId}`}
                className="btn btn-sm btn-outline-primary"
                onClick={updateLastLesson}>
                Next
              </NavLink>
              <span className="text-muted px-3 border-bottom border-info">{nextLecture?.title}</span>
            </div>
          </Row>
          {/* <!-- Docs title --> */}
        <div className="docs-title">
          <h1>{lecture?.title}</h1>
          <div className="lead mb-0">
            <a href="#lecture" className="h4">
              # Lecture
            </a>
            <a href="#exercise" className="h4">
              # Exercise
            </a>
            <a href="#quiz" className="h4">
              # Quiz
            </a>
          </div>
        </div>
        {/* <!-- Docs content --> */}
        <div className="docs-content">
          <Markdown>{content}</Markdown>
        </div>

        <div className="docs-quiz">
        {
          lecture?.quiz && lecture?.quiz?.id
            ? <Quiz
                title={lecture?.quiz.title}
                id={lecture?.quiz.id}
                lectureId={lecture?.id}
                questions={lecture?.quiz?.questions}
              />
            : <></>
        }
        </div>

        <Row className="pt-3 mt-3">
          <Col xs={6} className="text-right">
            <span className="text-muted px-3 border-bottom border-info">{previousLecture?.title}</span>
            <NavLink
              to={`/learn/${prevId}`}
              className="btn btn-sm btn-outline-primary">
              Back
            </NavLink>
          </Col>
          <Col xs={6} className="text-right">
            <NavLink
                to={`/learn/${nextId}`}
                className="btn btn-sm btn-outline-primary"
                onClick={updateLastLesson}>
                Next
            </NavLink>
            <span className="text-muted px-3 border-bottom border-info">{nextLecture?.title}</span>
          </Col>
        </Row>
      </Col>
      <Col xl={3} className="docs-sidebar d-none d-xl-block" />  
    </Row>
  );
};

export default Lecture;