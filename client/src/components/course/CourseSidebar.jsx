import React, { Fragment } from 'react';
import { Badge, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import CourseProgressBar from '../course/CourseProgressBar';
import LineBreak from '../shared/LineBreak';
import './CourseSidebar.scss';

const CourseSidebar = ({ course }) => {
  const currentLecture = useSelector(state => state.lecture.currentLecture);
  const completedLectures = useSelector(state => state.lecture.completedLectures);

  const isLectureCompleted = lectureId => {
    return completedLectures?.find(lecture => lecture.id === lectureId);
  };

  return (
    <Nav
      variant="light"
      className="navbar navbar-vertical sidenav"
      bg="white"
      id="sidenav-main"
      navbarScroll={true}>
        <div className="scrollbar-inner px-4">
          <div className="docs-sidebar">
            <h5>
              { course.title }
            </h5>
            <CourseProgressBar />
            {
              course?.modules && course?.modules?.map(module => {
                if (!module?.lectures?.length > 0) {
                  return <Fragment key={module.id} />;
                }
                return (
                  <div className="sidebar-module position-relative" key={ module.id }>
                    <h5 className="sidebar-module-title float-left bg-dark-primary w-100 text-white">
                      { module.title }
                    </h5>
                    <Badge className="float-right" variant="info" className="badge-top-right">Module</Badge>
                    <LineBreak />
                    <hr />
                    <Nav
                      as="ul"
                      activeKey={ currentLecture.id }
                      className="flex-column">
                      {
                        module?.lectures?.length > 0 && module.lectures.map(lecture => (
                          <Nav.Link
                            key={ lecture.id }
                            href={ `/learn/${ lecture.id }` }
                            eventKey={ module.id }>
                            {
                              isLectureCompleted(lecture.id) &&
                              <FontAwesomeIcon icon={ faCheckCircle } className="text-success d-inline-block"
                                               style={ { marginLeft: '-20px' } } />
                            }
                            { lecture.title }
                          </Nav.Link>
                        ))
                      }
                    </Nav>
                  </div>
                );
              })
            }
          </div>
        </div>
    </Nav>
  );
};

export default CourseSidebar;