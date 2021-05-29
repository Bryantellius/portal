import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout: FunctionComponent<ILayoutProps> = ({
  children,
  modules,
  lectures,
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
      <Container fluid className="container-docs">
        {/* Sidenav */}
        {showSidebar ? (
          <Sidebar course={user.course} modules={modules} lectures={lectures} />
        ) : null}
        {children}
      </Container>
    </main>
  );
};

interface ILayoutProps {
  children?: any;
  modules?: any;
  lectures?: any;
  showSidebar: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: any;
  user: any;
}

export default Layout;
