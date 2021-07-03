import React from 'react';
import { Col, PageHeader, Row } from 'antd';
import { useSelector } from 'react-redux';
import EnrolledCoursesList from './EnrolledCoursesList';

const ViewCoursesPage = () => {
  const courses = useSelector(state => state.course.enrolledCourses);
  return (
      <Row align="center">
        <Col xs={16}>
          <PageHeader title="Your Courses" />
          <EnrolledCoursesList style={{ maxWidth: '1000px'}} courses={courses} />
        </Col>
      </Row>
  );
};

export default ViewCoursesPage;