import React from 'react';
import { Nav } from 'react-bootstrap';

const LectureProgressBar = ({ activeTab, setActiveTab }) => {
  return (
    <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
      <Nav.Item>
        <Nav.Link eventKey="lesson">
          Lesson
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="exercise">
          Exercise
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="quiz">
          Quiz
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default LectureProgressBar;
