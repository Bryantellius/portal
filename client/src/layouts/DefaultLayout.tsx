import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../components/shared/Navbar";

const DefaultLayout: FunctionComponent<IDefaultLayoutProps> = ({
  children,
  user,
}) => {
  return (
    <main className="docs">
      {/* Nav */}
      <Navbar
        user={user}
      />
      <Container fluid className="px-0">
        {children}
      </Container>
    </main>
  );
};

interface IDefaultLayoutProps {
  children?: any;
  user: any;
}

export default DefaultLayout;
