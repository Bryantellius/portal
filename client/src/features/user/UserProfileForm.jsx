import React from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { linkUserToApi } from '../auth/auth.slice';

const UserProfileForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const initialValues = {
    firstName: '',
    lastName: ''
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const userDetails = {
      firstName: values.firstName,
      lastName: values.lastName
    };

    dispatch(linkUserToApi(userDetails))

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