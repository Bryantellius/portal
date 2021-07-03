import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';

const CourseSidebarLecture = ({
  lecture
}) => {
  const completedLectures = useSelector(state => state.lecture.completedLectures);
  const courseId = useSelector(state => state.course.activeCourse?.id);
  const { path } = useRouteMatch();

  const isLectureCompleted = lectureId => {
    return completedLectures?.find(lecture => lecture.id === lectureId);
  };

  const getLecturePath = lectureId => {
    return `/course/${ courseId }/lecture/${ lectureId }`;
  }

  return (
    <Nav.Link
      as={Link}
      to={ getLecturePath(lecture.id) }
      eventKey={lecture.id}>
      {
        isLectureCompleted(lecture.id) &&
        <FontAwesomeIcon
          icon={ faCheckCircle }
          className="text-success d-inline-block"
          style={ { marginLeft: '-20px', marginRight: '5px' } }
        />
      }
      { lecture.title }
    </Nav.Link>
  );
};

export default CourseSidebarLecture;