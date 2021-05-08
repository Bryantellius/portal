import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout: React.FC<ILayoutProps> = ({
  children,
  modules,
  topics,
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
        {showSidebar ? <Sidebar course={user.Course} modules={modules} topics={topics} /> : null}
        {children}
      </div>
    </main>
  );
};

interface ILayoutProps {
  children?: any;
  modules?: any;
  topics?: any;
  showSidebar: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: any;
  user: any;
}

export default Layout;
