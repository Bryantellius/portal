import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const HomePage = () => {
  const {
    user,
    isLoading,
    isAuthenticated
  } = useAuth0();
  // const user = useSelector(state => state.auth.user);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      history.push('/dashboard');
    }
  }, [user, history]);
  return (
    <>
    </>
  );
};

export default HomePage;