import React, { FunctionComponent, useState } from "react";
import moment from "moment";
import ApiClient from "../utils/apiClient";
import { 
  Card, 
  Container, 
  Row, 
  Col,
  Image,
  Alert,
  Form,
  Button
} from "react-bootstrap";

const Profile: FunctionComponent<IProfileProps> = ({ user }) => {
  const controller = new AbortController();
  const apiClient = new ApiClient();

  const [email, setEmail] = useState<string>(user.email);
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);

  const updateUser = async (e: any) => {
    e.preventDefault();

    const alertDiv = document.getElementById("memberAlert");
    if (firstName === "" || lastName === "" || email === "") {
      alertDiv.classList.remove("alert-success");
      alertDiv.classList.add("alert-danger");
      alertDiv.innerHTML = "All input fields must have values.";
      alertDiv.style.display = "block";
      setTimeout(() => (alertDiv.style.display = "none"), 10000);
      return;
    }

    const form: any = document.querySelector("input[type=file]");
    const fileList = form.files;
    const inputElement = document.getElementById(
      "fileInput"
    ) as HTMLInputElement;

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
      formData.append("id", user.id);
      const updateAssetsResponse = await apiClient.post(
        `/user/${ user.id }/assets`,
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

    const updateUserResponse = await apiClient.put(`/user/${user.id}`, body);
    
    if (updateUserResponse.status === 200) {
      alertDiv.classList.remove("alert-danger");
      alertDiv.classList.add("alert-success");
      alertDiv.innerHTML = "Member Updated!";
      alertDiv.style.display = "block";
      setTimeout(() => (alertDiv.style.display = "none"), 10000);
    } else {
      alertDiv.classList.remove("alert-success");
      alertDiv.classList.add("alert-danger");
      alertDiv.innerHTML = "Failed to update Member!";
      alertDiv.style.display = "block";
      setTimeout(() => (alertDiv.style.display = "none"), 10000);
    }
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
              <p className="text-center">{user.title}</p>
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e.target.value)
                  }
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLastName(e.target.value)
                  }
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    document.getElementById("fileLabel").innerHTML =
                      e.target.value.slice(12);
                  }}
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

interface IProfileProps {
  user: any;
}

export default Profile;
