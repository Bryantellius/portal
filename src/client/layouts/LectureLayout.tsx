import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/learn/LecturesSidebar";

const LectureLayout: FunctionComponent<ILectureLayoutProps> = ({
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
  showSidebar: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: any;
  user: any;
}

export default LectureLayout;
