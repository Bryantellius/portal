import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import CourseSidebar from "../course/CourseSidebar";
import { useSelector } from "react-redux";

const CourseLayout = ({
  children
}) => {
  const activeCourse = useSelector(state => state.course.activeCourse);
  return (
    <main className="docs">
      {/* Nav */}
      <Header />
      <Container fluid className="container-docs">
        { activeCourse &&
          <CourseSidebar course={activeCourse} />
        }
        {children}
      </Container>
    </main>
  );
};

export default CourseLayout;