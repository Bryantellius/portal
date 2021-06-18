import React from 'react';
import { Container } from 'react-bootstrap';
import AppNavbar from '../../layout/AppNavbar';
import CourseSidebar from '../CourseSidebar';
import { useSelector } from 'react-redux';

const CourseLayout = ( {
  children
} ) => {
  const activeCourse = useSelector(state => state.course.activeCourse);
  return (
    <main className="docs">
      <AppNavbar />
      <Container
        fluid
        className="body-container">
        { activeCourse &&
          <CourseSidebar course={ activeCourse } />
        }
        { children }
      </Container>
    </main>
  );
};

export default CourseLayout;