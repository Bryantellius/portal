import React from 'react';
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ViewLecture from '../lecture/ViewLecture';

const ViewCourse = () => {
  const { courseId } = useParams();
  const { path } = useRouteMatch();
  const currentLecture = useSelector(state => state.lecture.currentLecture);

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

export default ViewCourse;