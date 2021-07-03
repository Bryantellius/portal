import React from 'react';
import { Formik } from 'formik';
import { Button } from 'antd';
import { Form, Input } from 'formik-antd';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import { updateUser } from '../auth/auth.slice';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import authService from '../auth/auth.service';
import { useAuth0 } from '@auth0/auth0-react';

const UserAdditionalInfoForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    user
  } = useAuth0();

  const initialValues = {
    firstName: '',
    lastName: ''
  };

  const onSubmit = async values => {
    const userDetails = {
      firstName: values.firstName,
      lastName: values.lastName,
      discordUsername: values.discordUsername
    };

    const userData = {
      ...user,
      ...userDetails
    };

    if (user.sub) {
      const updatedUser = await authService.updateApiUser(user.sub, userData);
      await dispatch(updateUser(updatedUser));
    } else {
      throw new Error('user not logged in with auth0');
    }

    history.push('/dashboard');
  };

  const contactInfoSchema = yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    discordUsername: yup.string().matches(/[^@*:]+?#\d{4}/, 'Discord username should be in the format username#1234')
  });

  const getValidationStatus = (value, error) => {
    if (error) {
      return 'error';
    }

    return value?.length > 0 ? 'success' : 'validating'
  }

  return (
    <Formik initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={contactInfoSchema}>
      {({
       values,
       errors,
       touched,
       handleChange,
       handleBlur,
       handleSubmit,
       isSubmitting
      }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Item
            label="First Name"
            name="firstName"
            validateStatus={getValidationStatus(values.firstName, errors.firstName)}
            help={errors.firstName}
            hasFeedback={touched.firstName}>
            <Input
              name="firstName"
              type="text"
              value={values.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="First"
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="firstName"
            validateStatus={getValidationStatus(values.lastName, errors.lastName)}
            help={errors.lastName}
            hasFeedback={touched.lastName}>
            <Input
              name="lastName"
              type="text"
              value={values.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Last"
            />
          </Form.Item>
          <Form.Item
            label="Discord Username"
            name="discordUsername"
            validateStatus={getValidationStatus(values.discordUsername, errors.discordUsername)}
            help={errors.discordUsername}
            hasFeedback={touched.discordUsername}>
            <Input
              name="discordUsername"
              type="text"
              value={values.discordUsername}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="username#1234"
            />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserAdditionalInfoForm;