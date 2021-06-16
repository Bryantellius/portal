import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import CourseProgressBar from './CourseProgressBar';

// TODO: implement this in react-bootstrap
const LecturesSidebar = () => {
  const lectures = useSelector(state => state.lecture.lectures);
  const modules = useSelector(state => state.module.modules);
  const user = useSelector(state => state.auth.user);
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
          <h4>{user?.course}</h4>
          {modules && modules.map((module) => {
            if (!lectures.find(lecture => lecture.moduleId === module.id)) {
              return <></>;
            }

            return (
              <Fragment key={module.id}>
                <h6 className="mt-4">{module.title}</h6>
                <ul className="nav flex-column">
                  {lectures
                    .filter(lecture => lecture.moduleId === module.id)
                    .map(lecture => {
                      return (
                        <>
                          {
                            isLectureCompleted(lecture.id) &&
                            <FontAwesomeIcon icon={faCheckCircle} className="text-success d-inline-block ml-2" />
                          }
                          <NavLink
                            to={`/learn/${lecture.id}`}
                            key={lecture.id}
                            className="nav-link d-inline-block w-80">
                            {lecture.title}
                          </NavLink>
                        </>
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
