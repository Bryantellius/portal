import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import userService from '../user.service';
import EditUserForm from './EditUserForm';
import { userSchema } from '../../validation';

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await userService.fetchById(id);
      setUser(user);
    };
    fetchUserData();
  }, [id, dispatch]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={user}
      validationSchema={userSchema}
      onSubmit={() =>
        console.log('submitted')
      }>
        <EditUserForm user={user} />
    </Formik>
  )
};



export default EditUser;