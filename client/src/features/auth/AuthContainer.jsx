import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import authService from './auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './auth.slice';
import { useLocation } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

const AuthContainer = ({children}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(state => state.auth.user);
  const {
    isLoading
  } = useAuth0();

  useEffect(() => {
    const handleRedirects = async () => {
      if (isLoading) {
        return;
      }

      if (!user) {
        return;
      }

      if (!(user.firstName && user.lastName)) {

        if (!user?.sub) {
          return;
        }
        const apiUser = await authService.getApiUser(user.sub);
        if (apiUser) {
          dispatch(updateUser({
            ...user,
            ...apiUser
          }));
        } else {
          if (history.location.pathname !== '/additional-info') {
            history.push('/additional-info');
          }
        }
      }
    };

    handleRedirects();
  }, [isLoading, user, history, dispatch, location]);

  return (
    <>
      { children }
    </>
  );
};

export default AuthContainer;