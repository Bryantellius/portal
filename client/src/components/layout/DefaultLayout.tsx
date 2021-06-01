import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";

const DefaultLayout: FunctionComponent<IDefaultLayoutProps> = ({
  children
}) => {
  return (
    <main className="docs">
      {/* Nav */}
      <Header />
      <Container fluid className="px-0">
        {children}
      </Container>
    </main>
  );
};

interface IDefaultLayoutProps {
  children?: any;
}

export default DefaultLayout;
