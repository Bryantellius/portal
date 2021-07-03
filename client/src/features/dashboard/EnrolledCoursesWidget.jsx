import React from 'react';
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import EnrolledCoursesList from '../course/EnrolledCoursesList';

const EnrolledCoursesWidget = () => {
  const courses = useSelector(state => state.course?.enrolledCourses);

  return (
    <Card type="primary" title="My Courses">
      <EnrolledCoursesList courses={courses} />
    </Card>
  );
};

export default EnrolledCoursesWidget;