import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import { useSelector } from 'react-redux';

const DefaultLayout = ({
  children
}) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <main className="docs">
      {/* Nav */}
      <Header />
      {
        isAuthenticated &&

        <Container fluid className="app-content-wrapper">
          {children}
        </Container>
      }
    </main>
  );
};

export default DefaultLayout;
