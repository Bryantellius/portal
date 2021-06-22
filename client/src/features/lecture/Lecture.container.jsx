import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ViewLecture from './ViewLecture';
import { fetchLecturesByCourseId } from './lecture.slice';
import Loading from '../shared/components/Loading';
import { useParams } from 'react-router';

const LectureContainer = () => {
  const { path } = useRouteMatch();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const currentLecture = useSelector(state => state.lecture.currentLecture);
  const activeCourse = useSelector(state => state.course.activeCourse);

  useEffect(() => {
    if (activeCourse && activeCourse.id) {
      dispatch(fetchLecturesByCourseId(activeCourse.id));
    }
  }, [dispatch, activeCourse?.id]);

  return (
    activeCourse
      ?
        <Switch>
          <Route exact path={path}>
            {
              currentLecture
                ? <Redirect to={`/course/${ courseId }/lecture/${ currentLecture.id }`} />
                : <h3 className="lead">Choose a lecture from the menu to get started</h3>
            }
          </Route>
          <Route path={`${ path }/:id`}>
            <ViewLecture />
          </Route>
        </Switch>
      : <Loading />
  );
};

export default LectureContainer;