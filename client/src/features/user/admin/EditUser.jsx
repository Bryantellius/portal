import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import userService from '../user.service';
import EditUserForm from './EditUserForm';
import { userSchema } from '../../validation';
import { useHistory } from 'react-router';

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const history = useHistory();

  const userTemplate = {
    id: null,
    firstName: null,
    lastName: null,
    discordUsername: null,
    courseUsers: [],
    quizSubmissions: [],
    exerciseSubmissions: []
  };

  const saveUser = async (values) => {
    await userService.upsert(values);
    history.push('/admin/users');
  };

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
      initialValues={user || userTemplate}
      validationSchema={userSchema}
      onSubmit={saveUser}>
        <EditUserForm user={user} />
    </Formik>
  )
};



export default EditUser;