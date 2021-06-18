import React from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourse, setActiveCourse } from '../course/course.slice';
import { setCurrentLecture, setLectures } from '../lecture/lecture.slice';

const EnrolledCoursesWidget = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const courses = useSelector(state => state.course.enrolledCourses);
  const course = useSelector(state => state.course.course);
  const getActiveLectureForCourse = course => {
    const mostRecentLecture = course?.modules?.flatMap(module => module.lectures).find(lecture => lecture.id === course?.lastLectureId);
    return mostRecentLecture || course?.modules?.flatMap(module => module.lectures)[0];
  };

  const goToCourse = async courseId => {
    await dispatch(fetchCourse(courseId));

    if (course) {
      await dispatch(setActiveCourse(course));
      await dispatch(setLectures(course?.modules?.flatMap(module => module.lectures)));
    }

    const currentLecture = getActiveLectureForCourse(course);

    if (currentLecture) {
      dispatch(setCurrentLecture(currentLecture));
    }

    history.push(`/learn/${ currentLecture?.id }`);
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