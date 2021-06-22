import { useFormikContext } from 'formik';
import PageContent from '../../shared/components/PageContent';
import PageHeading from '../../shared/components/PageHeading';
import { Card, Col, Form, Row, Table } from 'react-bootstrap';
import PageActions from '../../shared/components/PageActions';
import ActionButton from '../../shared/components/ActionButton';
import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import userService from '../user.service';
import UserEnrolledCourseList from './UserEnrolledCourseList';
import UserCompletedCourseList from './UserCompletedCourseList';

const EditUserForm = ({
  user
}) => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    touched,
    errors
  } = useFormikContext();

  const deleteUser = async () => {
    await userService.delete(values.id);
  };

  const getAggregateQuizScore = courseId => {
    const course = user?.courses?.find(course => course.id === courseId);
    const courseLectures = course?.modules?.flatMap(module => module.lectures);
    const quizGrades = user?.quizSubmissions?.filter(quizSubmission => {
      return courseLectures.includes(quizSubmission?.lectureId);
    }).map(submission => submission?.score);

    return quizGrades.length === 0 ? 'N/A' : quizGrades?.reduce((total, grade) => total += grade, 0) / quizGrades.length;
  };

  return (
    <PageContent>
      <PageHeading>
        <small className="text-muted">Edit User: </small>
        { `${ values?.firstName } ${ values?.lastName }` }
      </PageHeading>
      <Form>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            value={values?.firstName}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            value={values?.lastName}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            value={values?.email}
          />
        </Form.Group>
        <Row className="mt-5">
          <Col sm={6}>
            <Card>
              <Card.Header>
                <Card.Title>
                  <h3>
                    Enrolled Courses
                  </h3>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <UserEnrolledCourseList
                  user={user}
                  courses={user?.courses}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6}>
            <Card>
              <Card.Header>
                <Card.Title>
                  <h3>
                    Completed Courses
                  </h3>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <UserCompletedCourseList
                  user={user}
                  courses={user?.courses?.filter(course => !!course.dateCompleted)}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>

      <PageActions side="right" vertical={true}>
        <ActionButton variant="success" icon={faSave} onClick={handleSubmit}>
          Save
        </ActionButton>
        <ActionButton variant="danger" icon={faTrashAlt} onClick={() => deleteUser()}>
          Delete
        </ActionButton>
      </PageActions>
    </PageContent>
  );
};

export default EditUserForm;