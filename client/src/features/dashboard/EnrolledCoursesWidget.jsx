import React from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EnrolledCoursesWidget = () => {
  const history = useHistory();
  const courses = useSelector(state => state.course.enrolledCourses);

  const goToCourse = courseId => {
    history.push(`/course/${ courseId }`);
  };

  return (
    <Card bg="primary " text="white">
      <Card.Header>
        <Card.Title className="text-white" as="h2">
          My Courses
        </Card.Title>
      </Card.Header>
      <ListGroup variant="flush">
        { courses && courses.map(course => (
          <ListGroupItem
            key={course.id}
            variant="secondary">
            { course.title }
            <Button variant="primary" size="sm" className="float-right" onClick={() => goToCourse(course?.id)}>
              {
                course.lastLectureId
                  ? `Continue Course`
                  : 'Get Started'
              }
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Card>
  );
};

export default EnrolledCoursesWidget;