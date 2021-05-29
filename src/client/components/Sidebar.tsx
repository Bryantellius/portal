import React, { FunctionComponent, Fragment } from "react";
import { NavLink } from "react-router-dom";

// TODO: implement this in react-bootstrap
const Sidebar: FunctionComponent<ISidebarProps> = ({ modules, lectures, course }) => {
  return (
    //   Side Navigation Bar
    <nav
      className="sidenav navbar navbar-vertical navbar-expand-xs navbar-light bg-white"
      id="sidenav-main">
      <div className="scrollbar-inner px-4">
        {/* <!-- Navigation --> */}
        <div className="docs-sidebar pt-6 pt-lg-7">
          <h4>{course}</h4>
          {modules && modules.map((module) => {
            return (
              <Fragment key={module.id}>
                <h6 className="mt-4">{module.title}</h6>
                <ul className="nav flex-column">
                  {lectures.map((lecture) => {
                    if (lecture.moduleId === module.id) {
                      let path: string = lecture.title.toLowerCase().replace(
                        / /g,
                        "-"
                      );
                      return (
                        <NavLink
                          to={`/learn/${path}`}
                          key={lecture.id}
                          className="nav-link">
                          {lecture.title}
                        </NavLink>
                      );
                    }
                  })}
                </ul>
              </Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

interface ISidebarProps {
  modules: any[];
  lectures: any[];
  course: string;
}

export default Sidebar;
