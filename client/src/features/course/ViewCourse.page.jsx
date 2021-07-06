import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ViewLecture from '../lecture/ViewLecture';
import { setCurrentLecture, setLectures } from '../lecture/lecture.slice';
import styled from 'styled-components';

const ViewCoursePage = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { path } = useRouteMatch();
  const currentLecture = useSelector(state => state.lecture.currentLecture);
  const activeCourse = useSelector(state => state.course.activeCourse);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const loadCourseData = async () => {
      const courseUser = activeCourse?.courses?.find(course => course.courseUsers.find(courseUser => courseUser.userId === user?.id))?.courseUsers.find(courseUser => courseUser.userId === user?.id);
      const courseLectures = activeCourse?.modules?.flatMap(module => module.lectures);

      dispatch(setLectures(courseLectures));

      if (courseUser?.lastCompletedLectureId) {
        const lastLectureIndex = courseLectures?.findIndex(lecture => lecture.id === courseUser.lastCompletedLectureId);
        dispatch(setCurrentLecture(courseLectures[lastLectureIndex + 1]));
      }
    };

    loadCourseData();
  }, [activeCourse, courseId, dispatch, user?.id]);

  return (
    <Switch>
      <Route
        exact
        path={path}>
        {
          currentLecture
            ? <Redirect to={`/course/${courseId}/lecture/${currentLecture.id}`} />
            : (
              <LectureWrapper>
                <h3 className="lead">Choose a lesson from the menu to get started</h3>
              </LectureWrapper>
            )
        }
      </Route>
      <Route path={`${path}/lecture/:lectureId`}>
        <ViewLecture />
      </Route>
    </Switch>
  );
};

const LectureWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px;
`;

export default ViewCoursePage;