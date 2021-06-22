import React from 'react';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';

const LectureStepsNav = ({ activeTab, setActiveTab }) => {
  return (
    <LectureNav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
      <LectureStep>
        <Nav.Link eventKey="lesson">
          Lesson
        </Nav.Link>
      </LectureStep>
      <LectureStep>
        <Nav.Link eventKey="exercise">
          Exercise
        </Nav.Link>
      </LectureStep>
      <LectureStep>
        <Nav.Link eventKey="quiz">
          Quiz
        </Nav.Link>
      </LectureStep>
    </LectureNav>
  );
};

const LectureNav = styled(Nav)`
  justify-content: space-around;
`;

const LectureStep = styled(Nav.Item)`
  flex-grow: 1;
  text-align: center;
`;

export default LectureStepsNav;
