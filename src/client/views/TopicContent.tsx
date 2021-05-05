import * as React from "react";
import Markdown from "markdown-to-jsx";
import { apiService } from "../utils/apiService";
import { useLocation } from "react-router";

const TopicContent: React.FC<ITopicContentProps> = ({ topicId, title }) => {
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
    //   Main Content
    <div className="main-content row position-relative pb-5">
      <div className="col-xl-9 docs-content pb-5">
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
  topicId: number;
}

export default TopicContent;
