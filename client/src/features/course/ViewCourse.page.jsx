import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ViewLecture from '../lecture/ViewLecture';
import { fetchCourse, setActiveCourse } from './course.slice';
import { setCurrentLecture, setLectures } from '../lecture/lecture.slice';
import { fetchExerciseSubmissionsForUser } from '../exercise/exercise.slice';
import { fetchUserQuizSubmissions } from '../quiz/store/quiz.thunks';

const ViewCoursePage = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { path } = useRouteMatch();
  const currentLecture = useSelector(state => state.lecture.currentLecture);
  const activeCourse = useSelector(state => state.course.activeCourse);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const loadCourseData = async () => {
      // const actionResult = await dispatch(fetchCourse(courseId));
      // const userExerciseSubmissions = await dispatch(fetchExerciseSubmissionsForUser(user?.id));
      // const userQuizSubmissions = await dispatch(fetchUserQuizSubmissions(user?.id));
      //

      const courseUser = activeCourse.courseUser;
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
      <Route exact path={path}>
        {
          currentLecture
            ? <Redirect to={`/course/${ courseId }/lecture/${ currentLecture.id }`} />
            : <h3 className="lead">Choose a lecture from the menu to get started</h3>
        }
      </Route>
      <Route path={`${ path }/lecture/:lectureId`}>
        <ViewLecture />
      </Route>
    </Switch>
  );
};

export default ViewCoursePage;