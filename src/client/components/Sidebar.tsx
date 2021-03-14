import * as React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    //   Side Navigation Bar
    <nav
      className="sidenav navbar navbar-vertical navbar-expand-xs navbar-light bg-white"
      id="sidenav-main"
    >
      <div className="scrollbar-inner px-4">
        {/* <!-- Navigation --> */}
        <div className="docs-sidebar pt-6 pt-lg-7">
          <h6 className="mt-4">Git</h6>
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink to="/git-intro" className="nav-link">
                Git Intro
              </NavLink>
            </li>
            <li className="nav-item">
              <a
                href="../docs/getting-started/build-tools.html"
                className="nav-link"
              >
                Git Branching and Merging
              </a>
            </li>
            <li className="nav-item">
              <a
                href="../docs/getting-started/build-tools.html"
                className="nav-link"
              >
                Git Conflict Resolution
              </a>
            </li>
          </ul>
          <h6 className="mt-4">HTML</h6>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a href="../docs/styleguide/colors.html" className="nav-link">
                Intro
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/styleguide/typography.html" className="nav-link">
                Divs and Tables
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/styleguide/icons.html" className="nav-link">
                Forms
              </a>
            </li>
          </ul>
          <h6 className="mt-4">CSS</h6>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a href="../docs/components/alerts.html" className="nav-link">
                CSS Intro
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/avatar.html" className="nav-link">
                Selectors and Rulesets
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/badge.html" className="nav-link">
                Flexbox and Grid
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/breadcrumb.html" className="nav-link">
                Animations and Transitions
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/buttons.html" className="nav-link">
                Variables and Functions
              </a>
            </li>
          </ul>
          <h6 className="mt-4">JavaScript</h6>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a href="../docs/components/alerts.html" className="nav-link">
                JavaScript Intro
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/buttons.html" className="nav-link">
                Variables
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/buttons.html" className="nav-link">
                Operators
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/buttons.html" className="nav-link">
                Selection Statements
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/buttons.html" className="nav-link">
                Loops
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/buttons.html" className="nav-link">
                Functions
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/buttons.html" className="nav-link">
                Objects and Arrays
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/buttons.html" className="nav-link">
                Higher-Order Functions
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/buttons.html" className="nav-link">
                Object-Oriented Programming
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/buttons.html" className="nav-link">
                Document-Object Model
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/buttons.html" className="nav-link">
                Error Handling
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/buttons.html" className="nav-link">
                Promises
              </a>
            </li>
            <li className="nav-item">
              <a href="../docs/components/buttons.html" className="nav-link">
                JSON and APIs
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
