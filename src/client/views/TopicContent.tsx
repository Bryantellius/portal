import * as React from "react";
import Markdown from "markdown-to-jsx";
import { apiService } from "../utils/apiService";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

const TopicContent: React.FC<ITopicContentProps> = ({
  topicId,
  title,
  prevT,
  nextT,
  nextID,
  UserID,
}) => {
  const location = useLocation();
  const controller = new AbortController();

  const [lecture, setLecture] = React.useState<string>("");

  const updateLastLesson = async () => {
    try {
      let res: any = await apiService(
        "/api/users/update/" + UserID,
        false,
        "PUT",
        controller.signal,
        {
          LastLectureID: nextID,
        }
      );
      if (res) {
        console.log("User next lesson updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchLecture();
  }, [location.pathname]);

  const fetchLecture = async () => {
    console.log("Pulling content for " + title);
    let res = await apiService(`/api/resources/lectures/${topicId}`, true);
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
              to={`/learn/${prevT.toLowerCase().replace(/ /g, "-")}`}
              className="btn btn-sm btn-outline-primary"
            >
              Back
            </NavLink>
          </div>
          <div className="col-6">
            <NavLink
              to={`/learn/${nextT.toLowerCase().replace(/ /g, "-")}`}
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
        <div className="row pt-3 mt-3">
          <div className="col-6 text-right">
            <span className="text-muted px-3 border-bottom border-info">{prevT}</span>
            <NavLink
              to={`/learn/${prevT.toLowerCase().replace(/ /g, "-")}`}
              className="btn btn-sm btn-outline-primary"
            >
              Back
            </NavLink>
          </div>
          <div className="col-6">
            <NavLink
              to={`/learn/${nextT.toLowerCase().replace(/ /g, "-")}`}
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

interface ITopicContentProps {
  title: string;
  prevT: string;
  nextT: string;
  nextID: number;
  topicId: number;
  UserID: number;
}

export default TopicContent;
