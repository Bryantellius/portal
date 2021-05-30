import React, { FunctionComponent } from "react";
import { Row, Col } from "react-bootstrap";

const Home: FunctionComponent = () => {
  return (
    //   Main Content
    <Row className="main-content position-relative pb-5">
      <Col xs={9} className="docs-content pb-5">
        {/* <!-- Docs title --> */}
        <div className="docs-title">
          <h1>Welcome to TrueCoders</h1>
          <p className="lead mb-0">
            This is where your course lectures, quizzes, exercises and resources
            with be housed.
          </p>
        </div>
        {/* <!-- Docs content --> */}
      </Col>
      <Col xs={3} className="docs-sidebar d-none d-xl-block"></Col>
    </Row>
  );
};

export default Home;
