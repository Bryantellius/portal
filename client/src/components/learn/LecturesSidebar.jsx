import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// TODO: implement this in react-bootstrap
const LecturesSidebar = () => {
  const lectures = useSelector(state => state.lecture.lectures);
  const modules = useSelector(state => state.module.modules);
  const user = useSelector(state => state.auth.user);

  return (
    //   Side Navigation Bar
    <nav
      className="sidenav navbar navbar-vertical navbar-expand-xs navbar-light bg-white"
      id="sidenav-main">
      <div className="scrollbar-inner px-4">
        {/* <!-- Navigation --> */}
        <div className="docs-sidebar pt-6 pt-lg-7">
          <h4>{user?.course}</h4>
          {modules && modules.map((module) => {
            return (
              <Fragment key={module.id}>
                <h6 className="mt-4">{module.title}</h6>
                <ul className="nav flex-column">
                  {lectures
                    .filter(lecture => lecture.moduleId === module.id)
                    .map(lecture => {
                      return (
                          <NavLink
                            to={`/learn/${lecture.id}`}
                            key={lecture.id}
                            className="nav-link">
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
