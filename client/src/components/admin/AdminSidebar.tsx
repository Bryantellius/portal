import React, { FunctionComponent, useState, useEffect } from "react";
import { Button, Nav } from "react-bootstrap";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBook,
  faGraduationCap,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import SidebarSubmenu from "../shared/SidebarSubmenu";
import "./AdminSidebar.scss"

interface IAdminSidebarProps {}

const AdminSidebar: FunctionComponent<IAdminSidebarProps> = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <Button
        variant="link"
        onClick={toggleSidebar}
        style={{ color: "#fff" }}
        className="mt-4">
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        <h3>Truecoders.io portal admin</h3>
      </div>
      <Nav className="flex-column pt-2">
        <p className="ml-3">Navigation</p>

        <Nav.Item className="active">
          <Nav.Link href="/admin">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Dashboard
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/admin/courses">
            <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
            Courses
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default AdminSidebar;