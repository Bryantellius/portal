import React from "react";
import { Container } from "react-bootstrap";
import AppNavbar from "./AppNavbar";
import { useSelector } from 'react-redux';

const DefaultLayout = ({
  children
}) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <main className="main">
      <AppNavbar />
      {
        isAuthenticated &&

        <Container fluid className="page-content">
          {children}
        </Container>
      }
    </main>
  );
};

export default DefaultLayout;
