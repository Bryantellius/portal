import * as React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC<ISidebarProps> = ({ modules, topics, course }) => {
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
          {modules.map((module) => {
            return (
              <React.Fragment key={module.ModuleID}>
                <h6 className="mt-4">{module.Title}</h6>
                <ul className="nav flex-column">
                  {topics.map((topic) => {
                    if (topic.ModuleID === module.ModuleID) {
                      let path: string = topic.Title.toLowerCase().replace(
                        / /g,
                        "-"
                      );
                      return (
                        <NavLink
                          to={`/learn/${path}`}
                          key={topic.TopicID}
                          className="nav-link"
                        >
                          {topic.Title}
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
  topics: any[];
  course: string;
}

export default Sidebar;
