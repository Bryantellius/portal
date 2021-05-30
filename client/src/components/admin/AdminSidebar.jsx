"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var classnames_1 = require("classnames");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
require("./AdminSidebar.scss");
var AdminSidebar = function () {
    var _a = react_1.useState(true), isOpen = _a[0], setIsOpen = _a[1];
    var toggleSidebar = function () {
        setIsOpen(!isOpen);
    };
    return (<div className={classnames_1.default("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <react_bootstrap_1.Button variant="link" onClick={toggleSidebar} style={{ color: "#fff" }} className="mt-4">
          <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faTimes}/>
        </react_bootstrap_1.Button>
        <h3>Truecoders.io portal admin</h3>
      </div>
      <react_bootstrap_1.Nav className="flex-column pt-2">
        <p className="ml-3">Navigation</p>

        <react_bootstrap_1.Nav.Item className="active">
          <react_bootstrap_1.Nav.Link href="/admin">
            <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faHome} className="mr-2"/>
            Dashboard
          </react_bootstrap_1.Nav.Link>
        </react_bootstrap_1.Nav.Item>

        <react_bootstrap_1.Nav.Item>
          <react_bootstrap_1.Nav.Link href="/admin/courses">
            <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faGraduationCap} className="mr-2"/>
            Courses
          </react_bootstrap_1.Nav.Link>
        </react_bootstrap_1.Nav.Item>
      </react_bootstrap_1.Nav>
    </div>);
};
exports.default = AdminSidebar;
