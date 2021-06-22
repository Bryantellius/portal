import React, { useEffect, useState } from 'react';
import AppNavbar from '../../layout/AppNavbar';
import CourseSidebar from '../CourseSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setActiveCourse, updateCurrentLectureForCourse } from '../course.slice';
import { setCurrentLecture } from '../../lecture/lecture.slice';
import styled from 'styled-components';
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';

const CourseLayout = ({
  children
}) => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const enrolledCourses = useSelector(state => state.course.enrolledCourses);
  const activeCourse = useSelector(state => state.course.activeCourse);

  const getActiveLectureForCourse = course => {
    const mostRecentLecture = course?.modules?.flatMap(module => module.lectures).find(lecture => lecture.id === course?.lastLectureId);
    return mostRecentLecture || course?.modules?.flatMap(module => module.lectures)[0];
  };

  useEffect(() => {
    const activeCourse = enrolledCourses.find(course => course.id === parseInt(courseId));

    dispatch(setActiveCourse(activeCourse));

    const currentLecture = getActiveLectureForCourse(activeCourse);

    if (currentLecture) {
      dispatch(setCurrentLecture(currentLecture || activeCourse.modules.flatMap(module => module.lectures)[0]));
      dispatch(updateCurrentLectureForCourse({ courseId, lectureId: currentLecture?.id }));
    }

    setIsLoading(false);
  }, [enrolledCourses, courseId, dispatch]);

  useEffect(() => {
    setIsLoading(!activeCourse);
  }, [activeCourse]);

  return (
    <main className="main">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          { activeCourse?.id && <CourseSidebar course={activeCourse} /> }
        </Sider>
        <Header>
          <AppNavbar />
        </Header>
        <Content style={{padding: '50px'}}>
          {activeCourse ? children : []}
        </Content>
        <Footer />
      </Layout>
    </main>
  );
};

const LectureContainer = styled.div`
  position: absolute;
  left: ${({  theme }) => theme.layouts.course.sidebar.width };
  top: ${({ theme }) => theme.layouts.default.topNav.height };
  width: ${({ theme }) => `calc(100vw - ${ theme.layouts.course.sidebar.width })`};
  padding: 20px 0;
`

const LectureWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
`;

export default CourseLayout;