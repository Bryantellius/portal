import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

const Sidebar: FunctionComponent<ISidebarProps> = ({ modules, lectureGroups, course }) => {
  return (
    //   Side Navigation Bar
    <nav
      className="sidenav navbar navbar-vertical navbar-expand-xs navbar-light bg-white"
      id="sidenav-main"
    >
      <div className="scrollbar-inner px-4">
        {/* <!-- Navigation --> */}
        <div className="docs-sidebar pt-6 pt-lg-7">
          <h4>{course}</h4>
          {modules && modules.map((module) => {
            return (
              <React.Fragment key={module.id}>
                <h6 className="mt-4">{module.title}</h6>
                <ul className="nav flex-column">
                  {lectureGroups.map((lectureGroup) => {
                    if (lectureGroup.moduleId === module.id) {
                      let path: string = lectureGroup.title.toLowerCase().replace(
                        / /g,
                        "-"
                      );
                      return (
                        <NavLink
                          to={`/learn/${path}`}
                          key={lectureGroup.id}
                          className="nav-link"
                        >
                          {lectureGroup.title}
                        </NavLink>
                      );
                    }
                  })}
                </ul>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

interface ISidebarProps {
  modules: any[];
  lectureGroups: any[];
  course: string;
}

export default Sidebar;
