import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Lecture from '../components/lecture/Lecture';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';

const Learn = () => {
  const { path } = useRouteMatch();
  const currentLecture = useSelector(state => state.lecture.currentLecture);

  return (
    <Switch>
      <Route exact path={path}>
        {
          currentLecture
            ? <Redirect to={`${ path }/${ currentLecture.id }`} />
            : <h3 className="lead">Choose a lecture from the menu to get started</h3>
        }
      </Route>
      <Route path={`${ path }/:id`}>
        <Lecture />
      </Route>
    </Switch>
  );
};

export default Learn;
