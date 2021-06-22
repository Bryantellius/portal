import React from 'react';
import styled from 'styled-components';
import { Badge, Nav } from 'react-bootstrap';
import LineBreak from '../../shared/components/LineBreak';
import CourseSidebarLecture from './CourseSidebarLecture';
import { useSelector } from 'react-redux';

const CourseSidebarModule = ({
  module
}) => {
  const currentLecture = useSelector(state => state.lecture.currentLecture);

  return (
    <ModuleContainer>
      <ModuleHeader className="bg-dark-primary">
        { module.title }
      </ModuleHeader>
      <Badge variant="primary" className="badge-top-right">Module</Badge>
      <LineBreak />

      <HorizontalRule />

      <Nav
        as="ul"
        activeKey={ currentLecture.id }
        className="flex-column">
        {
          module?.lectures?.length > 0 && module.lectures.map(lecture => (
            <CourseSidebarLecture key={lecture.id} lecture={lecture} />
          ))
        }
      </Nav>
    </ModuleContainer>
  );
};

const ModuleContainer = styled.div`
  background-color: #f5f3f3;
  border-radius: 8px 8px 0 0;
  padding: 0 0 10px;
  position: relative;
`;

const ModuleHeader = styled.h5`
  float:left;
  width: 100%;
  color: white;
  margin-top: 0;
  margin-bottom: 10px;
  padding: 8px;
  box-shadow: 0px 1px 2px 0px #383838;
`;

const HorizontalRule = styled.hr`
  margin-top: 2px;
  margin-bottom: 4px;
`;

export default CourseSidebarModule;