"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var classnames_1 = require("classnames");
var SidebarSubmenu = function (_a) {
    var icon = _a.icon, title = _a.title, items = _a.items;
    var _b = react_1.useState(true), collapsed = _b[0], setCollapsed = _b[1];
    var toggleNavbar = function () {
        setCollapsed(!collapsed);
    };
    return (<react_bootstrap_1.Nav.Item className={classnames_1.default({ open: !collapsed })}>
      <react_bootstrap_1.Accordion>
        <react_bootstrap_1.Accordion.Toggle as={react_bootstrap_1.Nav.Link} variant="link" eventKey="0" onClick={toggleNavbar}>
          <react_fontawesome_1.FontAwesomeIcon icon={icon} className="mr-2"/>
          {title}
          <react_fontawesome_1.FontAwesomeIcon icon={collapsed ? free_solid_svg_icons_1.faCaretDown : free_solid_svg_icons_1.faCaretUp} className="float-right"/>
        </react_bootstrap_1.Accordion.Toggle>

        <react_bootstrap_1.Accordion.Collapse eventKey="0">
          <nav className="nav flex-column">
            {items.map(function (item) { return (<a className={classnames_1.default("nav-link", "nav-item", "pl-5", { "active": window.location.href.startsWith(item.href) })} href={item.href} key={item.label}>
                {item.label}
              </a>); })}
          </nav>
        </react_bootstrap_1.Accordion.Collapse>
      </react_bootstrap_1.Accordion>
    </react_bootstrap_1.Nav.Item>);
};
exports.default = SidebarSubmenu;
