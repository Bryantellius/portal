import React, { useEffect } from 'react';
import AppNavbar from '../../layout/AppNavbar';
import CourseSidebar from '../sidebar/CourseSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setActiveCourse } from '../course.slice';
import styled from 'styled-components';
import { Layout } from 'antd';

const { Footer, Header } = Layout;

const CourseLayout = ({
  children
}) => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(state => state.course.enrolledCourses);
  const activeCourse = useSelector(state => state.course.activeCourse);

  useEffect(() => {
    const activeCourse = enrolledCourses?.find(course => course.id === parseInt(courseId));

    dispatch(setActiveCourse(activeCourse));

  }, [enrolledCourses, courseId, dispatch]);

  return (
    <main className="main">
      <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <Header style={{ position: 'fixed', width: '100%', height: '75px' }}>
          <AppNavbar />
        </Header>
        <Layout style={{ overflowY: 'hidden' }}>
          <SidebarContainer>
            {activeCourse?.id && <CourseSidebar
              style={{}}
              course={activeCourse} />}
          </SidebarContainer>
          <LectureContainer>
            <LectureWrapper id="lecture-wrapper">
              {activeCourse ? children : []}
            </LectureWrapper>
          </LectureContainer>
          <Footer />
        </Layout>
      </Layout>
    </main>
  );
};

const SidebarContainer = styled.div`
  position: fixed;
  height: 100vh;
  left: 0;
  top: ${({ theme }) => theme.layouts.default.topNav.height};
  width: ${({ theme }) => theme.layouts.course.sidebar.width};
  overflow-y: auto;
  padding: 25px;
`;

const LectureContainer = styled.div`
  position: relative;
  left: ${({ theme }) => theme.layouts.course.sidebar.width};
  top: ${({ theme }) => theme.layouts.default.topNav.height};
  height: ${({ theme }) => `calc(100vh - ${theme.layouts.default.topNav.height})`};
  width: ${({ theme }) => `calc(100vw - ${theme.layouts.course.sidebar.width})`};
  background-color: #efeeee;
  overflow-y: auto;
`;

const LectureWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  padding-bottom: 50px;
`;

export default CourseLayout;