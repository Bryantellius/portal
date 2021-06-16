import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";

const DefaultLayout = ({
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

export default DefaultLayout;
