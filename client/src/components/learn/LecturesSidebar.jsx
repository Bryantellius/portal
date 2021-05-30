"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
// TODO: implement this in react-bootstrap
var LecturesSidebar = function (_a) {
    var modules = _a.modules, lectures = _a.lectures, course = _a.course;
    return (
    //   Side Navigation Bar
    <nav className="sidenav navbar navbar-vertical navbar-expand-xs navbar-light bg-white" id="sidenav-main">
      <div className="scrollbar-inner px-4">
        {/* <!-- Navigation --> */}
        <div className="docs-sidebar pt-6 pt-lg-7">
          <h4>{course}</h4>
          {modules && modules.map(function (module) {
            return (<react_1.Fragment key={module.id}>
                <h6 className="mt-4">{module.title}</h6>
                <ul className="nav flex-column">
                  {lectures.map(function (lecture) {
                    if (lecture.moduleId === module.id) {
                        var path = lecture.title.toLowerCase().replace(/ /g, "-");
                        return (<react_router_dom_1.NavLink to={"/learn/" + path} key={lecture.id} className="nav-link">
                          {lecture.title}
                        </react_router_dom_1.NavLink>);
                    }
                })}
                </ul>
              </react_1.Fragment>);
        })}
        </div>
      </div>
    </nav>);
};
exports.default = LecturesSidebar;
