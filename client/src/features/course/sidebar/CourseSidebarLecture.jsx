import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CourseSidebarLecture = ({
  lecture
}) => {
  const completedLectures = useSelector(state => state.lecture.completedLectures);

  const isLectureCompleted = lectureId => {
    return completedLectures?.find(lecture => lecture.id === lectureId);
  };

  return (
    <Nav.Link
      key={ lecture.id }
      href={ `/learn/${ lecture.id }` }
      eventKey={ module.id }>
      {
        isLectureCompleted(lecture.id) &&
        <FontAwesomeIcon
          icon={ faCheckCircle }
          className="text-success d-inline-block"
          style={ { marginLeft: '-20px' } }
        />
      }
      { lecture.title }
    </Nav.Link>
  );
};

export default CourseSidebarLecture;