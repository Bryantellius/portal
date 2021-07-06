import React, { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBox,
  faChalkboardTeacher,
  faGraduationCap,
  faHome,
  faQuestion,
  faTimes,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import './AdminSidebar.scss';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={ classNames('sidebar', { 'is-open': isOpen }) }>
      <div className="sidebar-header">
        <Button
          variant="link"
          onClick={ toggleSidebar }
          className="mt-4">
          <FontAwesomeIcon icon={ faTimes } />
        </Button>
        <h3>Admin Portal</h3>
      </div>
      <Nav
        activeKey={ window.location.pathname }
        defaultActiveKey="dashboard"
        className="flex-column pt-2">

        <p className="ml-3">
          Navigation
        </p>

        <Nav.Item>
          <Nav.Link
            as={ Link }
            to="/admin"
            className="text-white">
            <FontAwesomeIcon
              icon={ faHome }
              className="mr-2" />
            Dashboard
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            as={ Link }
            className="text-white"
            to="/admin/users">
            <FontAwesomeIcon
              icon={ faUser }
              className="mr-2" />
            Users
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            as={ Link }
            className="text-white"
            to="/admin/courses">
            <FontAwesomeIcon
              icon={ faGraduationCap }
              className="mr-2" />
            Courses
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            as={ Link }
            className="text-white"
            to="/admin/modules">
            <FontAwesomeIcon
              icon={ faBox }
              className="mr-2" />
            Modules
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            as={ Link }
            className="text-white"
            to="/admin/quizzes">
            <FontAwesomeIcon
              icon={ faQuestion }
              className="mr-2" />
            Quizzes
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            as={ Link }
            className="text-white"
            to="/admin/exercise/review">
            <FontAwesomeIcon
              icon={ faChalkboardTeacher }
              className="mr-2" />
            Exercise Review
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default AdminSidebar;