import React from 'react';
import { Button, List } from 'antd';
import { useDispatch } from 'react-redux';
import { setActiveCourse } from './course.slice';
import { useHistory } from 'react-router-dom';

const EnrolledCoursesList = ({
  courses,
  ...props
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const goToCourse = courseId => {
    history.push(`/course/${ courseId }`);
  }

  return (
    <List { ...props }>
      { courses && courses.map(course => (
        <List.Item
          key={course.id}
          actions={[<Button key="goToCourse" onClick={() => goToCourse(course.id)} type="primary">
            { course.lastLectureId ? 'Continue Course' : 'Get Started'}
          </Button>]}>
          <List.Item.Meta title={course.title}
          description={course.description}>

          </List.Item.Meta>
        </List.Item>
      ))}
    </List>

  );
};

export default EnrolledCoursesList;