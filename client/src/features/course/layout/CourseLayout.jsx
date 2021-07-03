import React, { useEffect } from 'react';
import AppNavbar from '../../layout/AppNavbar';
import CourseSidebar from '../CourseSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setActiveCourse, updateCurrentLectureForCourse } from '../course.slice';
import { setCurrentLecture } from '../../lecture/lecture.slice';
import styled from 'styled-components';
import { Layout,  } from 'antd';
const { Footer, Header } = Layout;

const CourseLayout = ({
  children
}) => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const enrolledCourses = useSelector(state => state.course.enrolledCourses);
  const activeCourse = useSelector(state => state.course.activeCourse);

  const getActiveLectureForCourse = course => {
    const mostRecentLecture = course?.modules?.flatMap(module => module.lectures).find(lecture => lecture.id === course?.lastLectureId);
    return mostRecentLecture || course?.modules?.flatMap(module => module.lectures)[0];
  };

  useEffect(() => {
    const activeCourse = enrolledCourses?.find(course => course.id === parseInt(courseId));

    dispatch(setActiveCourse(activeCourse));

    const currentLecture = getActiveLectureForCourse(activeCourse) || activeCourse?.modules?.flatMap(module => module.lectures)[0];

    dispatch(setCurrentLecture(currentLecture));
    dispatch(updateCurrentLectureForCourse({ courseId, lectureId: currentLecture?.id }));

  }, [enrolledCourses, courseId, dispatch]);

  return (
    <main className="main">
      <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <Header style={{ position: 'fixed', width: '100%', height: '75px' }}>
          <AppNavbar />
        </Header>
        <Layout style={{ overflowY: 'hidden' }}>
          <SidebarContainer>
            { activeCourse?.id && <CourseSidebar style={{}} course={activeCourse} /> }
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
  top: ${({ theme }) => theme.layouts.default.topNav.height };
  width: ${({  theme }) => theme.layouts.course.sidebar.width };
  overflow-y: auto;
  background-color: #fff;
  padding: 25px;
`;

const LectureContainer = styled.div`
  position: relative;
  left: ${({  theme }) => theme.layouts.course.sidebar.width };
  top: ${({ theme }) => theme.layouts.default.topNav.height };
  height: ${({ theme }) => `calc(100vh - ${ theme.layouts.default.topNav.height })`}; 
  width: ${({ theme }) => `calc(100vw - ${ theme.layouts.course.sidebar.width })`};
  background-color: #efeeee;
  overflow-y: auto;
`

const LectureWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  padding-bottom: 50px;
`;

export default CourseLayout;