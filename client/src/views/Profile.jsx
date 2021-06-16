import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from '../utils/apiClient';
import moment from 'moment';
import { 
  Card, 
  Container, 
  Row, 
  Col,
  Image,
  Alert,
  Form,
  Button
} from 'react-bootstrap';

const Profile = () => {
  const apiClient = new ApiClient();
  const user = useSelector(state => state.auth.user);

  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [, setUploaderLabel] = useState("Choose a file..");

  const updateUser = async (e) => {
    e.preventDefault();

    const form = document.querySelector("input[type=file]");
    const fileList = form.files;
    const inputElement = document.getElementById(
        "fileInput"
    );

    const body = {
      firstname: firstName,
      lastname: lastName,
      email,
      avatarUrl: `../assets/img/${user.id}`,
      fileName: `${inputElement.value.slice(12)}`,
    };

    if (fileList.length > 0) {
      const formData = new FormData();
      formData.append("image", fileList[0]);
      formData.append("id", user.id.toString());
      await apiClient.post(
          `/user/${user.id}/assets`,
          formData,
          {
            headers: {
              encoding: "binary",
            }
          }
      );
    } else {
      delete body.avatarUrl;
      delete body.fileName;
    }

    await apiClient.put(`/user/${user.id}`, body);
  };

  return (
    <div className="profile-settings mx-auto">
      <Container>
        <Card className="shadow mt-2">
          <Row
            className="my-2 justify-content-center">
            <Col md={6} className="d-flex flex-column justify-content-start align-items-center">
              <Image 
                src={user.avatarUrl || "../assets/img/default.png"}
                alt={`${ user.lastName} Profile Image`}
                className="avatar-2xl"
              />
              <h1 className="text-center">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-center">{user.role?.title}</p>
              <small className="text-muted text-center d-block">
                Member since {moment(user.createdAt).format("MMM do YYYY")}
              </small>
            </Col>
          </Row>
        </Card>
        <Container className="p-4" as="section">
          <Alert variant="danger" id="memberAlert">
            Error. Try Again.
          </Alert>

          <Form className="form-group col-xl-8 mx-auto p-3"
            onSubmit={updateUser}>
            <div className="mb-3">  
              <Form.Group>
                <Form.Label>
                  First Name
                </Form.Label>
                <Form.Control
                  name="firstName"
                  id="firstName"
                  type="text"
                  className="mb-2"
                  placeholder="Member First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Last Name
                </Form.Label>
                <Form.Control
                  name="lastName"
                  id="lastName"
                  type="text"
                  className="mb-2"
                  placeholder="Member Last Name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required />
              </Form.Group>
            </div>
            <div className="mb-3">
              <Form.Group>
                <Form.Label>
                  Email
                </Form.Label>
                <Form.Control
                  name="email"
                  id="email"
                  type="text"
                  className="mb-2"
                  placeholder="Member Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required />
              </Form.Group>
            </div>
            <div className="mb-3">
              <Form.Group>
                <Form.Label>
                  Image
                </Form.Label>
                <Form.File
                  label="Choose a file"
                  name="uploadFile"
                  id="fileInput"
                  accept="image/*"
                  onChange={ e => setUploaderLabel(e.target.value)}
                  custom
                />
              </Form.Group>
            </div>
            <Button
              variant="info"
              className="w-50 mx-auto d-block my-3"
              type="submit">
                Update
              </Button>
          </Form>
        </Container>
      </Container>
    </div>
  );
};

export default Profile;
