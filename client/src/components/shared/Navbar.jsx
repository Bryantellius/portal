"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var theme_1 = require("../../utils/theme");
var react_router_dom_1 = require("react-router-dom");
var apiService_1 = require("../../utils/apiService");
var Navbar = function (_a) {
    var setIsLoggedIn = _a.setIsLoggedIn, isLoggedIn = _a.isLoggedIn, user = _a.user;
    var _b = react_1.useState(false), isLoaded = _b[0], setIsLoaded = _b[1];
    react_1.useEffect(function () {
        if (!isLoaded) {
            theme_1.darkModeLoader();
            setIsLoaded(true);
        }
    }, []);
    // TODO: implement this in react-bootstrap
    return (
    // <!-- Nav -->
    <header className="header" id="header-main">
      {/* <!-- Main navbar --> */}
      <nav className="navbar navbar-main navbar-expand-lg fixed-top navbar-shadow navbar-light bg-white border-bottom" id="navbar-main">
        <div className="container-fluid justify-content-between">
          {/* <!-- user's navbar --> */}
          <div className="navbar-user d-lg-none">
            <ul className="navbar-nav flex-row align-items-center">
              <li className="nav-item">
                <react_router_dom_1.NavLink to="/" className="nav-link nav-link-icon sidenav-toggler" data-action="sidenav-pin" data-target="#sidenav-main">
                  <i data-feather="menu"></i>
                </react_router_dom_1.NavLink>
              </li>
            </ul>
          </div>
          {/* <!-- Navbar brand --> */}
          <react_router_dom_1.NavLink className="navbar-brand" to="/">
            <img alt="Image placeholder" src={"../assets/img/brand/TrueCodersLogo_Inline.png"} id="navbar-logo"/>
            <sup className="text-muted text-xs text-uppercase">APP</sup>
          </react_router_dom_1.NavLink>
          {/* <!-- Live preview --> */}
          <ul className="navbar-nav flex-row align-items-center d-lg-none">
            <li className="nav-item">
              <react_router_dom_1.NavLink to="/" className="nav-link nav-link-icon">
                <i data-feather="eye"></i>
              </react_router_dom_1.NavLink>
            </li>
          </ul>
          {isLoggedIn ? (<>
              {/* <!-- Navbar nav --> */}
              <div className="collapse navbar-collapse" id="navbar-main-collapse">
                {/* <!-- Right menu --> */}
                <ul className="navbar-nav align-items-center mx-auto">
                  <li className="nav-item">
                    <react_router_dom_1.NavLink className="nav-link" exact to="/">
                      Dashboard
                    </react_router_dom_1.NavLink>
                  </li>
                  <li className="nav-item">
                    <react_router_dom_1.NavLink className="nav-link" exact to="/learn">
                      Learn
                    </react_router_dom_1.NavLink>
                  </li>
                </ul>
              </div>
            </>) : null}
          <div className="theme-switch-wrapper">
            <label className="theme-switch" htmlFor="checkbox">
              <input type="checkbox" id="checkbox"/>
              <div className="slider round"></div>
            </label>
          </div>
          {isLoggedIn ? (<li className="dropdown dropdown-animate" data-toggle="hover">
              <a className="p-3" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img alt="Profile Image" src={user.AvatarUrl || "../assets/img/default.png"} className="avatar rounded-circle avatar-md"/>
              </a>
              <div className="dropdown-menu dropdown-menu-single">
                {user.title == "Admin" || user.title == "Instructor" ? (<react_router_dom_1.NavLink to="/admin" className="dropdown-item">
                    Admin
                  </react_router_dom_1.NavLink>) : null}
                <react_router_dom_1.NavLink to="/profile" className="dropdown-item">
                  Profile
                </react_router_dom_1.NavLink>
                <react_router_dom_1.NavLink to="/schedule-one-on-one" className="dropdown-item">
                  Schedule 1-on-1
                </react_router_dom_1.NavLink>
                <react_router_dom_1.NavLink to="/" className="dropdown-item">
                  Support
                </react_router_dom_1.NavLink>
                <div className="dropdown-divider"></div>
                <react_router_dom_1.NavLink to="/login" className="dropdown-item" onClick={function () {
                apiService_1.removeAccessTokens();
                setIsLoggedIn(false);
            }}>
                  Logout
                </react_router_dom_1.NavLink>
              </div>
            </li>) : null}
        </div>
      </nav>
    </header>);
};
exports.default = Navbar;
