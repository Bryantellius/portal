import React, { FunctionComponent, useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import ApiClient from "../utils/apiClient";
import { Quiz } from "../components/quiz/Quiz";
import { Col, Row } from "react-bootstrap";

const LectureContent: FunctionComponent<ILectureContentProps> = ({
  lectureId,
  title,
  previousLecture,
  nextLecture,
  nextId,
  userId,
  quiz
}) => {
  const location = useLocation();
  const controller = new AbortController();
  const apiClient = new ApiClient();

  const [lecture, setLecture] = useState<string>("");

  useEffect(() => {
    fetchLectureContent();
  }, [location.pathname]);

  const updateLastLesson = async () => {
    try {
      let res: any = await apiClient.put(
        `/user/${ userId }`,
        {
          lastLectureId: nextId,
        }
      );
      if (res) {
        console.log("User next lesson updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLectureContent = async () => {
    console.log("Pulling content for " + title);
    let res = await apiClient.get(`/lecture/${ lectureId }/content`)
    setLecture(res);
  };

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
          <h1>{title}</h1>
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
          <Markdown>{lecture}</Markdown>
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

export default LectureContent;