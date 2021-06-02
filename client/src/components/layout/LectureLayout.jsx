import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Sidebar from "../learn/LecturesSidebar";
import { useSelector } from "react-redux";

const LectureLayout = ({
  children,
  modules,
  lectures
}) => {
  const user = useSelector(state => state.auth.user);
  return (
    <main className="docs">
      {/* Nav */}
      <Header />
      <Container fluid className="container-docs">
          <Sidebar course={user?.course} modules={modules} lectures={lectures} />
        {children}
      </Container>
    </main>
  );
};

export default LectureLayout;