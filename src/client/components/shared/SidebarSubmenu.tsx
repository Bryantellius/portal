import React, { FunctionComponent, useState } from "react";
import { Accordion, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

interface ISidebarSubmenuProps {
  icon: IconDefinition,
  title: string,
  items: Array<any>
}

const SidebarSubmenu: FunctionComponent<ISidebarSubmenuProps> = ({ icon, title, items }) => {

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Nav.Item className={classNames({ open: !collapsed })}>
      <Accordion>
        <Accordion.Toggle
          as={Nav.Link}
          variant="link"
          eventKey="0"
          onClick={toggleNavbar}>
          <FontAwesomeIcon icon={icon} className="mr-2" />
          {title}
          <FontAwesomeIcon
            icon={collapsed ? faCaretDown : faCaretUp}
            className="float-right"
          />
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="0">
          <nav className="nav flex-column">
            {items.map(item => (
              <a
                className={classNames("nav-link", "nav-item", "pl-5", { "active": window.location.href.startsWith(item.href) })}
                href={item.href}
                key={item.label}>
                {item.label}
              </a>
            ))}
          </nav>
        </Accordion.Collapse>
      </Accordion>
    </Nav.Item>
  );
};

export default SidebarSubmenu;