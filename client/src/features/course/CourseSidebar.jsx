import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import CourseProgressBar from './CourseProgressBar';
import CourseSidebarModule from './sidebar/CourseSidebarModule';

const CourseSidebar = ({ course }) => {

  return (
    <Nav
      variant="light"
      className="navbar navbar-vertical sidenav px-0"
      bg="white"
      id="sidenav-main"
      navbarScroll={true}>
      <div className="scrollbar-inner px-4">
        <div className="docs-sidebar">
          <h4 className="text-primary">
            { course.title }
          </h4>
          <CourseProgressBar />
          {
            course?.modules?.length > 0 && course?.modules?.map(module => (
              module?.lectures?.length > 0
                ? <CourseSidebarModule key={module.id} module={module} />
                : <Fragment key={module.id} />
            ))
          }
        </div>
      </div>
    </Nav>
  );
};


export default CourseSidebar;