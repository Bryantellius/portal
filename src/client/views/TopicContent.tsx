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
}) => {
  const location = useLocation();

  const [lecture, setLecture] = React.useState<string>("");

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
            >
              Next
            </NavLink>
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
      </div>
      <div className="col-xl-3 docs-sidebar d-none d-xl-block"></div>
    </div>
  );
};

interface ITopicContentProps {
  title: string;
  prevT: string;
  nextT: string;
  topicId: number;
}

export default TopicContent;
