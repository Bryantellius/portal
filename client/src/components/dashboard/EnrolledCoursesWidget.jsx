import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCourse } from '../../store/course/courseSlice';
import ApiClient from '../../utils/apiClient';
import { setCurrentLecture } from '../../store/lecture/lectureReducer';

const EnrolledCoursesWidget = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const courses = useSelector(state => state.course.enrolledCourses);

  const getActiveLectureForCourse = course => {
    const mostRecentLecture = course?.modules?.flatMap(module => module.lectures).find(lecture => lecture.id === course?.lastLectureId);
    return mostRecentLecture || course?.modules[0]?.lectures[0];
  };

  const goToCourse = async course => {
    const apiClient = new ApiClient();
    const activeCourse = await apiClient.get(`/course/${ course.id }`);
    let updatedCourse = {
      ...activeCourse,
      lastLectureId: course.lastLectureId
    };
    dispatch(setActiveCourse(updatedCourse));
    dispatch(setCurrentLecture(getActiveLectureForCourse(updatedCourse)));
    history.push(`/learn/${ getActiveLectureForCourse(updatedCourse)?.id }`);
  };

  return (
    <Card bg="primary" text="white">
      <Card.Header>
        <Card.Title className="text-white" as="h2">
          My Courses
        </Card.Title>
      </Card.Header>
      <Card.Body>
        { courses && courses.map(course => (
          <Card key={course.id}>
            <Card.Header>
              <Card.Title>
                { course.title }
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text className="bg-white text-dark">
                { course.description }
              </Card.Text>
              <Button variant="primary" size="sm" className="float-right" onClick={() => goToCourse(course)}>
                {
                  course.lastLectureId
                    ? `Continue Course: ${ getActiveLectureForCourse(course)?.title }`
                    : 'Begin Course'
                }
              </Button>
            </Card.Body>
          </Card>
        ))}

      </Card.Body>
    </Card>
  );
};

export default EnrolledCoursesWidget;