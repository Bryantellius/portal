import React from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import ApiClient from '../utils/apiClient';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const UserAdditionalData = () => {
  const history = useHistory();
  const initialValues = {
    firstName: '',
    lastName: ''
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const apiClient = new ApiClient();

    await apiClient.post('/user', values);

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

export default UserAdditionalData;