import * as React from "react";

const GitIntro: React.FC = () => {
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
        <div>
          <h2>Why</h2>
          <p>This is the why section</p>
        </div>
      </div>
      <div className="col-xl-3 docs-sidebar d-none d-xl-block"></div>
    </div>
  );
};

export default GitIntro;
