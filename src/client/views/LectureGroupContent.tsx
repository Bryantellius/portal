import React, { FunctionComponent, useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import ApiClient from "../utils/apiClient";
import { Quiz } from "../components/quiz/Quiz";
import quizquestion from "../../server/db/models/quizquestion";

const LectureGroupContent: FunctionComponent<ILectureGroupContentProps> = ({
  lectureGroupId,
  title,
  prevT,
  nextT,
  nextId,
  userId,
  quiz
}) => {
  const location = useLocation();
  const controller = new AbortController();
  const apiClient = new ApiClient();

  const [lecture, setLecture] = useState<string>("");

  useEffect(() => {
    fetchLecture();
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

  const fetchLecture = async () => {
    console.log("Pulling content for " + title);
    let res = await apiClient.get(`/lecture/${ lectureGroupId }/content`)
    setLecture(res);
  };

  return (
    // Prompt Bar
    //   Main Content
    <div className="main-content row position-relative pb-5">
      <div className="col-xl-9 docs-content pb-5">
        <div className="row pt-3 mt-3">
          <div className="col-6 text-right">
            <span className="text-muted px-3 border-bottom border-info">{prevT}</span>
            <NavLink
              to={`/learn/${prevT?.toLowerCase().replace(/ /g, "-")}`}
              className="btn btn-sm btn-outline-primary"
            >
              Back
            </NavLink>
          </div>
          <div className="col-6">
            <NavLink
              to={`/learn/${nextT?.toLowerCase()?.replace(/ /g, "-")}`}
              className="btn btn-sm btn-outline-primary"
              onClick={updateLastLesson}
            >
              Next
            </NavLink>
            <span className="text-muted px-3 border-bottom border-info">{nextT}</span>
          </div>
        </div>
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

        
        { 
          quiz && quiz.id 
            ? <Quiz
                title={quiz.title}
                id={quiz.id}
                lectureId={quiz.lectureId}
                lectureGroupId={quiz.lectureGroupId}
                questions={quiz.questions}
              />
            : <span className="no-quiz"></span>
        }
        
        
        <div className="row pt-3 mt-3">
          <div className="col-6 text-right">
            <span className="text-muted px-3 border-bottom border-info">{prevT}</span>
            <NavLink
              to={`/learn/${prevT?.toLowerCase().replace(/ /g, "-")}`}
              className="btn btn-sm btn-outline-primary"
            >
              Back
            </NavLink>
          </div>
          <div className="col-6">
            <NavLink
              to={`/learn/${nextT?.toLowerCase().replace(/ /g, "-")}`}
              className="btn btn-sm btn-outline-primary"
              onClick={updateLastLesson}
            >
              Next
            </NavLink>
            <span className="text-muted px-3 border-bottom border-info">{nextT}</span>
          </div>
        </div>
      </div>
      <div className="col-xl-3 docs-sidebar d-none d-xl-block"></div>
    </div>
  );
};

interface ILectureGroupContentProps {
  title: string;
  prevT: string;
  nextT: string;
  nextId: number;
  lectureGroupId: number;
  userId: number;
  quiz: any
}

export default LectureGroupContent;