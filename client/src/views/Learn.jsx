import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Lecture from '../components/lecture/Lecture';
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
      //todo: fetch lecture by course
      const lectures = await apiClient.get(`/lecture`);
      dispatch(setLectures(
        lectures.map(lecture => {
          return {
            id: lecture.id,
            title: lecture.title,
            quiz: lecture.quiz,
            exercise: lecture.exercise,
            moduleId: lecture.moduleId,
            videos: lecture.videos
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
