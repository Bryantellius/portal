import React, { FunctionComponent, useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import ApiClient from "../utils/apiClient";
import { Quiz } from "../components/quiz/Quiz";
import { Col, Row } from "react-bootstrap";
import { useAppDispatch } from '../store/hooks';
import { setLastLectureId } from '../store/auth/reducers/authReducer';
import { useParams } from 'react-router-dom';

interface LectureParams {
  id: string
}
const Lecture: FunctionComponent<ILectureContentProps> = ({
  // previousLecture,
  // nextLecture,
  // nextId,
  // userId
}) => {
  const { id } = useParams<LectureParams>();
  const apiClient = new ApiClient();
  const dispatch = useAppDispatch();
  const [lecture, setLecture] = useState(null);
  const [lectureContent, setLectureContent] = useState<string>("");

  useEffect(() => {
    fetchLecture();
    fetchLectureContent();
    fetchQuiz();
  }, []);

  const updateLastLesson = async () => {
    const updateResult = await apiClient.put(`/user/${ userId }`, {
      lastLectureId: nextId,
    });

    if (updateResult) {
      dispatch(setLastLectureId(nextId));
    }
  };

  const fetchLecture = async () => {
    const lecture = await apiClient.get(`/lecture/${ id }`);
    setLecture(lecture);
  }

  const fetchLectureContent = async () => {
    const lectureContent = await apiClient.get(`/lecture/${ id }/content`)
    setLectureContent(lectureContent);
  };

  const fetchQuiz = async () => {

  }

  return (
    // Prompt Bar
    //   Main Content
      <Row className="main-content position-relative pb-5">
        <Col xl={9} className="docs-content pb-5">
          <Row className="pt-3 mt-3">
            <Col xs={6} className="text-right">
              <span className="text-muted px-3 border-bottom border-info">{previousLecture}</span>
              <NavLink
                to={`/learn/${previousLecture?.toLowerCase().replace(/ /g, "-")}`}
                className="btn btn-sm btn-outline-primary">
                  Back
              </NavLink>
            </Col>
            <div className="col-6">
              <NavLink
                to={`/learn/${nextLecture?.toLowerCase()?.replace(/ /g, "-")}`}
                className="btn btn-sm btn-outline-primary"
                onClick={updateLastLesson}>
                Next
              </NavLink>
              <span className="text-muted px-3 border-bottom border-info">{nextLecture}</span>
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
          <Markdown>{lectureContent}</Markdown>
        </div>

        <div className="docs-quiz">
        {
          quiz && quiz.id 
            ? <Quiz
                title={quiz.title}
                id={quiz.id}
                lectureId={quiz.lectureId}
                questions={quiz.questions}
              />
            : <></>
        }
        </div>

        <Row className="pt-3 mt-3">
          <Col xs={6} className="text-right">
            <span className="text-muted px-3 border-bottom border-info">{previousLecture}</span>
            <NavLink
              to={`/learn/${previousLecture?.toLowerCase().replace(/ /g, "-")}`}
              className="btn btn-sm btn-outline-primary">
              Back
            </NavLink>
          </Col>
          <Col xs={6} className="text-right">
            <NavLink
                to={`/learn/${nextLecture?.toLowerCase().replace(/ /g, "-")}`}
                className="btn btn-sm btn-outline-primary"
                onClick={updateLastLesson}>
                Next
            </NavLink>
            <span className="text-muted px-3 border-bottom border-info">{nextLecture}</span>
          </Col>
        </Row>
      </Col>
      <Col xl={3} className="docs-sidebar d-none d-xl-block" />  
    </Row>
  );
};

interface ILectureContentProps {
  title: string;
  previousLecture: string;
  nextLecture: string;
  nextId: number;
  lectureId: number;
  userId: number;
  quiz: any
}

export default Lecture;