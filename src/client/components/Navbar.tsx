import * as React from "react";
import { darkModeLoader } from "../utils/theme";
import { NavLink } from "react-router-dom";
import { removeAccessTokens } from "../utils/apiService";

const Navbar: React.FC<INavbarProps> = ({
  setIsLoggedIn,
  isLoggedIn,
  user,
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!isLoaded) {
      darkModeLoader();
      setIsLoaded(true);
    }
  }, []);

  return (
    // <!-- Nav -->
    <header className="header" id="header-main">
      {/* <!-- Main navbar --> */}
      <nav
        className="navbar navbar-main navbar-expand-lg fixed-top navbar-shadow navbar-light bg-white border-bottom"
        id="navbar-main"
      >
        <div className="container-fluid justify-content-between">
          {/* <!-- user's navbar --> */}
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
              src={"../assets/img/brand/TrueCodersLogo_Inline.png"}
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
          {isLoggedIn ? (
            <>
              {/* <!-- Navbar nav --> */}
              <div
                className="collapse navbar-collapse"
                id="navbar-main-collapse"
              >
                {/* <!-- Right menu --> */}
                <ul className="navbar-nav align-items-center mx-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" exact to="/">
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" exact to="/learn">
                      Learn
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
          {isLoggedIn ? (
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
                  src={user.AvatarUrl || "../assets/img/default.png"}
                  className="avatar rounded-circle avatar-md"
                />
              </a>
              <div className="dropdown-menu dropdown-menu-single">
                {user.Title == "Admin" || user.Title == "Instructor" ? (
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
                  onClick={() => {
                    removeAccessTokens();
                    setIsLoggedIn(false);
                  }}
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

interface INavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: any;
  user: any;
}

export default Navbar;
