import * as React from "react";
import Markdown from "markdown-to-jsx";
import { apiService } from "../utils/apiService";

const GitIntro: React.FC = () => {
  const [lectureLoaded, setLectureLoaded] = React.useState<boolean>(false);
  const [lecture, setLecture] = React.useState<string>("");

  React.useEffect(() => {
    if (!lectureLoaded) {
      fetchLecture();
      setLectureLoaded(true);
    }
  }, [lectureLoaded]);

  const fetchLecture = async () => {
    let res = await apiService("/api/test");
    setLecture(res);
  };

  return (
    //   Main Content
    <div className="main-content row position-relative pb-5">
      <div className="col-xl-9 docs-content pb-5">
        {/* <!-- Docs title --> */}
        <div className="docs-title">
          <h1>Git Intro</h1>
          <p className="lead mb-0">
            This is where your course lectures, quizzes, exercises and resources
            with be housed.
          </p>
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

export default GitIntro;
