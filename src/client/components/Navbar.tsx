import * as React from "react";
import { darkModeLoader } from "../utils/theme";
import { NavLink } from "react-router-dom";
import { removeAccessTokens, User } from "../utils/apiService";

const Navbar = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!isLoaded) {
      darkModeLoader();
      setIsLoaded(true);
    }
  }, []);

  console.log(User);

  return (
    // <!-- Nav -->
    <header className="header" id="header-main">
      {/* <!-- Main navbar --> */}
      <nav
        className="navbar navbar-main navbar-expand-lg fixed-top navbar-shadow navbar-light bg-white border-bottom"
        id="navbar-main"
      >
        <div className="container-fluid justify-content-between">
          {/* <!-- User's navbar --> */}
          <div className="navbar-user d-lg-none">
            <ul className="navbar-nav flex-row align-items-center">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link nav-link-icon sidenav-toggler"
                  data-action="sidenav-pin"
                  data-target="#sidenav-main"
                >
                  <i data-feather="menu"></i>
                </NavLink>
              </li>
            </ul>
          </div>
          {/* <!-- Navbar brand --> */}
          <NavLink className="navbar-brand" to="/">
            <img
              alt="Image placeholder"
              src="./assets/img/brand/TrueCodersLogo_Inline.png"
              id="navbar-logo"
            />
            <sup className="text-muted text-xs text-uppercase">APP</sup>
          </NavLink>
          {/* <!-- Live preview --> */}
          <ul className="navbar-nav flex-row align-items-center d-lg-none">
            <li className="nav-item">
              <NavLink to="/" className="nav-link nav-link-icon">
                <i data-feather="eye"></i>
              </NavLink>
            </li>
          </ul>
          {User.UserID ? (
            <>
              {/* <!-- Navbar nav --> */}
              <div
                className="collapse navbar-collapse"
                id="navbar-main-collapse"
              >
                {/* <!-- Right menu --> */}
                <ul className="navbar-nav align-items-center mx-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/lectures">
                      Lectures
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/quizzes">
                      Quizzes
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/exercises"
                      target="_blank"
                    >
                      Exercises
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/resources"
                      target="_blank"
                    >
                      Resources
                    </NavLink>
                  </li>
                </ul>
              </div>
            </>
          ) : null}
          <div className="theme-switch-wrapper">
            <label className="theme-switch" htmlFor="checkbox">
              <input type="checkbox" id="checkbox" />
              <div className="slider round"></div>
            </label>
          </div>
          {User.UserID ? (
            <li className="dropdown dropdown-animate" data-toggle="hover">
              <a
                className="p-3"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  alt="Profile Image"
                  src="./assets/img/ben-headshot.png"
                  className="avatar rounded-circle avatar-md"
                />
              </a>
              <div className="dropdown-menu dropdown-menu-single">
                {User.Title == "Admin" || User.Title == "Instructor" ? (
                  <NavLink to="/admin" className="dropdown-item">
                    Admin
                  </NavLink>
                ) : null}
                <NavLink to="/profile" className="dropdown-item">
                  Profile
                </NavLink>
                <NavLink to="/schedule-one-on-one" className="dropdown-item">
                  Schedule 1-on-1
                </NavLink>
                <NavLink to="/" className="dropdown-item">
                  Support
                </NavLink>
                <div className="dropdown-divider"></div>
                <NavLink
                  to="/login"
                  className="dropdown-item"
                  onClick={() => removeAccessTokens()}
                >
                  Logout
                </NavLink>
              </div>
            </li>
          ) : null}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
