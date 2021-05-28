import React, { FunctionComponent } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout: FunctionComponent<ILayoutProps> = ({
  children,
  modules,
  lectureGroups,
  showSidebar,
  isLoggedIn,
  setIsLoggedIn,
  user,
}) => {
  return (
    <main className="docs">
      {/* Nav */}
      <Navbar
        user={user}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="container-fluid container-docs">
        {/* Sidenav */}
        {showSidebar ? (
          <Sidebar course={user.course} modules={modules} lectureGroups={lectureGroups} />
        ) : null}
        {children}
      </div>
    </main>
  );
};

interface ILayoutProps {
  children?: any;
  modules?: any;
  lectureGroups?: any;
  showSidebar: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: any;
  user: any;
}

export default Layout;
