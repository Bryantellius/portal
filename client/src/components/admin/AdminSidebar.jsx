import React, { useState } from 'react';
import { Button, Nav } from "react-bootstrap";
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faGraduationCap,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import './AdminSidebar.scss';

const AdminSidebar = () => {
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
          className="mt-4">
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        <h3>Admin Portal</h3>
      </div>
      <Nav className="flex-column pt-2">
        <p className="ml-3">Navigation</p>

        <Nav.Item className="active">
          <Nav.Link className="text-white" href="/admin">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Dashboard
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link className="text-white" href="/admin/users">
            <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
            Users
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link className="text-white" href="/admin/courses">
            <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
            Courses
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link className="text-white" href="/admin/modules">
            <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
            Modules
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default AdminSidebar;