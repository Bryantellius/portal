import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import CourseProgressBar from './CourseProgressBar';

// TODO: implement this in react-bootstrap
const LecturesSidebar = ({ course }) => {
  const completedLectures = useSelector(state => state.lecture.completedLectures);

  const isLectureCompleted = lectureId => {
    return completedLectures?.find(lecture => lecture.id === lectureId);
  };
  return (
    //   Side Navigation Bar
    <nav
      className="sidenav navbar navbar-vertical navbar-expand-xs navbar-light bg-white"
      id="sidenav-main">
      <div className="scrollbar-inner px-4">
        {/* <!-- Navigation --> */}
        <div className="docs-sidebar pt-6 pt-lg-7">
          <CourseProgressBar />
          <h4>{course?.title}</h4>
          {course?.modules && course?.modules?.map((module) => {
            if (!module?.lectures?.length > 0) {
              return <Fragment key={module.id} />;
            }

            return (
              <Fragment key={module.id}>
                <h6 className="mt-4">{module.title}</h6>
                <ul className="nav flex-column">
                  {module?.lectures
                    .map(lecture => {
                      return (
                          <NavLink
                            to={`/learn/${lecture.id}`}
                            key={lecture.id}
                            className="nav-link d-inline-block w-80"
                            style={{paddingLeft: '20px' }}>
                            {
                              isLectureCompleted(lecture.id) &&
                              <FontAwesomeIcon icon={faCheckCircle} className="text-success d-inline-block" style={{ marginLeft: '-20px'}} />
                            }
                            {lecture.title}
                          </NavLink>
                      );
                    })
                  }
                </ul>
              </Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default LecturesSidebar;
