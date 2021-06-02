import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Lecture from '../components/learn/Lecture';
import ApiClient from '../utils/apiClient';
import { setLectures } from '../store/lecture/lectureReducer';
import { useDispatch, useSelector } from "react-redux";

const Learn = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const fetchLectures = async () => {
      const apiClient = new ApiClient();
      const curriculumId = user?.curriculumId || 1;
      const lectures = await apiClient.get(`/curriculum/${ curriculumId }/lecture`);
      dispatch(setLectures(
        lectures.map(lecture => {
          return {
            id: lecture.id,
            title: lecture.title,
            quiz: lecture.Quiz,
            moduleId: lecture.moduleId
          }
        })
      ));
    };

    fetchLectures();
  }, [user, dispatch]);

  return (
    <Switch>
      <Route exact path={path}>
        <h3 className="lead">Choose a lecture from the menu to get started</h3>
      </Route>
      <Route path={`${ path }/:id`}>
        <Lecture />
      </Route>
    </Switch>
  );
};

export default Learn;
