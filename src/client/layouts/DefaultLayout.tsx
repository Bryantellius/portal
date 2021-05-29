import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../components/shared/Navbar";

const DefaultLayout: FunctionComponent<IDefaultLayoutProps> = ({
  children,
  isLoggedIn,
  setIsLoggedIn,
  user
}) => {
  return (
    <main className="docs">
      {/* Nav */}
      <Navbar
        user={user}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Container fluid>
        {children}
      </Container>
    </main>
  );
};

interface IDefaultLayoutProps {
  children?: any;
  isLoggedIn: boolean;
  setIsLoggedIn: any;
  user: any;
}

export default DefaultLayout;
