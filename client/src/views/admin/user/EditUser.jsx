import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiClient from '../../../utils/apiClient';
import { Card, Col, Form, Row, Table } from 'react-bootstrap';
import PageHeading from '../../../components/shared/PageHeading';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const apiService = new ApiClient();
      const user = await apiService.get(`/user/${ id }`);
      setUser(user);
    };

    fetchUser();
  }, []);
  return (
    <div className="page-content">
      <PageHeading>
        View/Edit User: { `${ user?.lastName },${ user?.firstName }` }
      </PageHeading>
      <Form>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={user?.firstName}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={user?.lastName}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={user?.email}
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
                <Table striped bordered reponsive>
                  <thead>
                    <tr>
                      <th>
                        Name
                      </th>
                      <th>
                        Date Enrolled
                      </th>
                      <th>
                        Instructor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colspan="3">
                        No enrolled courses for this user
                      </td>
                    </tr>
                  </tbody>
                </Table>
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
                <Table striped bordered reponsive>
                  <thead>
                    <tr>
                      <th>
                        Name
                      </th>
                      <th>
                        Date Enrolled
                      </th>
                      <th>
                        Instructor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colspan="3">
                        No completed courses for this user
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditUser;