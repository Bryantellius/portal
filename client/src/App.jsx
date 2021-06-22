import React, { useEffect } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import Routes from './routes/Routes';
import './App.scss';
import { useDispatch } from 'react-redux';
import { doLogin  } from './features/auth/auth.slice'
import { fetchEnrolledCourses } from './features/course/course.slice';
import { fetchExerciseSuibmissionsForUser } from './features/exercise/exercise.slice';
import { setIsLoading, setError } from './features/core/app.slice';
import { useSelector } from 'react-redux';

import axios from 'axios';

const App = () => {
  const isLoading = useSelector(state => state.app.isLoading);
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  useEffect(() => {
    axios.interceptors.request.use(() => {
      dispatch(setIsLoading(true));
    });
    axios.interceptors.response.use(response => response, error => {
      dispatch(setIsLoading(false));
      dispatch(setError(error));
    });
    axios.interceptors.response.use(() => {
      dispatch(setIsLoading(false));
    });
  }, [])

  useEffect(() => {
    const loadUserContent = async () => {
      await dispatch(doLogin());
    };

    loadUserContent();
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEnrolledCourses(user.id));
    dispatch(fetchExerciseSuibmissionsForUser(user.id));
  }, user?.id)

  return (
    <Router isAuthorized={isAuthenticated}>
      <Routes />
    </Router>
  );
};

export default App;
