import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/learn/LecturesSidebar";

const LectureLayout: FunctionComponent<ILectureLayoutProps> = ({
  children,
  modules,
  lectures,
  user,
}) => {
  return (
    <main className="docs">
      {/* Nav */}
      <Navbar
        user={user}
      />
      <Container fluid className="container-docs">
          <Sidebar course={user.course} modules={modules} lectures={lectures} />
        {children}
      </Container>
    </main>
  );
};

interface ILectureLayoutProps {
  children?: any;
  modules?: any;
  lectures?: any;
  user: any;
}

export default LectureLayout;
