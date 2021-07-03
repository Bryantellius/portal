import React, { useLayoutEffect, useState } from 'react';
import UserAdditionalInfoForm from './UserAdditionalInfoForm';
import authService from '../auth/auth.service';
import { updateUser } from '../auth/auth.slice';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../auth/auth';
import Loading from '../shared/components/Loading';
import { useAuth0 } from '@auth0/auth0-react';

const UserAdditionalDataPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const {
    isLoading: userLoading
  } = useAuth0();
  useLayoutEffect(() => {
    const checkForApiUser = async () => {
      if (!isLoading && !userLoading) {

        setIsLoading(true);
        const apiUser = await authService.fetchById(user.sub || user.auth0Id);

        if (apiUser && apiUser.firstName && apiUser.lastName) {
          await dispatch(updateUser(({
            ...apiUser,
            ...user
          })));

          history.push('/dashboard');
        }

        setIsLoading(false);
      }
    };

    checkForApiUser();
  }, [history, user, dispatch]);


  return isLoading
    ? <Loading />
    : (
      <div className="user-additional-data-page">
        <h2>Additional Information</h2>
        <p className="lead">
          We just need a little more information about you before we get started.
        </p>

        <UserAdditionalInfoForm />
      </div>
    );
};

export default UserAdditionalDataPage;