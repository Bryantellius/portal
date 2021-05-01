import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout: React.FC<ILayoutProps> = ({
  children,
  modules,
  topics,
  showSidebar,
}) => {
  return (
    <main className="docs">
      {/* Nav */}
      <Navbar />
      <div className="container-fluid container-docs">
        {/* Sidenav */}
        {showSidebar ? <Sidebar modules={modules} topics={topics} /> : null}
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
}

export default Layout;
