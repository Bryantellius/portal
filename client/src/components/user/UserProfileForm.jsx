import React from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import ApiClient from '../../utils/apiClient';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { updateUserProfileSuccess } from '../../store/auth/authSlice';

const UserProfileForm = () => {
  const user = useSelector(state => state.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const initialValues = {
    firstName: '',
    lastName: ''
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const apiClient = new ApiClient();

    const userDetails = {
      auth0Id: user.auth0Id || user.sub,
      email: user.email,
      avatarUrl: user.picture || user.avatarUrl,
      firstName: values.firstName,
      lastName: values.lastName
    };

    const apiUser = await apiClient.post(`/user/link`, userDetails);

    dispatch(updateUserProfileSuccess(apiUser));

    history.push('/dashboard');
  };

  return (
    <Formik initialValues={initialValues}
      onSubmit={onSubmit}>
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
          <Form.Group>
            <Form.Label>
              First Name
            </Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Last Name
            </Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserProfileForm;