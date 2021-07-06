import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import Loading from '../shared/components/Loading';

const HomePage = () => {
  const {
    user,
    isLoading,
    isAuthenticated
  } = useAuth0();
  const apiUser = useSelector(state => state.auth.user);
  const history = useHistory();

  useEffect(() => {
    console.log(apiUser);

    if (!isLoading && (isAuthenticated || window.location.search.includes('code='))) {
      history.push('/dashboard');
      // window.location.reload();
    }
  }, [isAuthenticated, isLoading, history, window.location.search]);
  return (
    <Loading />
  );
};

export default HomePage;