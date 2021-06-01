import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Sidebar from "../learn/LecturesSidebar";
import { useAppSelector } from '../../store/hooks';

const LectureLayout: FunctionComponent<ILectureLayoutProps> = ({
  children,
  modules,
  lectures
}) => {
  const user = useAppSelector(state => state.auth.user);
  return (
    <main className="docs">
      {/* Nav */}
      <Header />
      <Container fluid className="container-docs">
          <Sidebar course={user?.course as string} modules={modules} lectures={lectures} />
        {children}
      </Container>
    </main>
  );
};

interface ILectureLayoutProps {
  children?: any;
  modules?: any;
  lectures?: any;
}

export default LectureLayout;