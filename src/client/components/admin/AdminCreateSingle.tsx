import React, { FunctionComponent, useState, ChangeEvent } from "react";
import { Button, Col, Form } from "react-bootstrap";
import ApiClient from "../../utils/apiClient";
const apiClient = new ApiClient();

const AdminCreateSingle: FunctionComponent<IAdminCreateSingleProps> = ({
  roles,
  courses,
}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [course, setCourse] = useState("");

  const insertUser = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      user: {
        firstName: firstname,
        lastName: lastname,
        email,
        roleID: role,
      },
      classList: {
        courseID: course,
      },
    };

    const insertResponse: any = await apiClient.post("/auth/register", body);

    let alertDiv = document.getElementById("errorAlert");

    if (insertResponse) {
      alertDiv.classList.remove("alert-danger");
      alertDiv.classList.add("alert-success");
      alertDiv.innerHTML = "User Created!";
      alertDiv.style.display = "block";
      setTimeout(() => (alertDiv.style.display = "none"), 10000);
    } else {
      alertDiv.classList.remove("alert-success");
      alertDiv.classList.add("alert-danger");
      alertDiv.innerHTML = "Failed to create User!";
      alertDiv.style.display = "block";
      setTimeout(() => (alertDiv.style.display = "none"), 10000);
    }
  };

  return (
    <Col xs={6} className="p-4">
      <h3 className="text-center">Create Single</h3>
      <Form onSubmit={insertUser} className="p-3">
        <Form.Group className="mb-3">
          <Form.Label htmlFor="firstName">First Name:</Form.Label>
          <Form.Control
            name="firstName"
            id="firstName"
            type="text"
            className="form-control mb-2"
            placeholder="User Firstname"
            value={firstname}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFirstname(e.target.value)
            }
            required
          />
          <Form.Label htmlFor="lastName">Last Name:</Form.Label>
          <Form.Control
            name="lastName"
            id="lastName"
            type="text"
            placeholder="User Lastname"
            value={lastname}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLastname(e.target.value)
            }
            required
          />
          
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="User Email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              autoComplete="off"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role:</Form.Label>
            <Form.Control
              type="text"
              placeholder="User Role"
              value={role}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRole(e.target.value)
              }
              list="user-roles"
            />
            <datalist id="user-roles">
              {roles.map((r) => {
                return (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                );
              })}
            </datalist>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Course:</Form.Label>
            <Form.Control
              type="text"
              placeholder="User Course"
              value={course}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCourse(e.target.value)
              }
              list="courses"
            />
            <datalist id="courses">
              {courses.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                );
              })}
            </datalist>
          </Form.Group>
          <Button
            variant="info"
            className="w-50 mx-auto d-block my-3"
            type="submit">
            Create
          </Button>
        </Form.Group>
      </Form>
    </Col>
  );
};

interface IAdminCreateSingleProps {
  roles: any[];
  courses: any[];
}

export default AdminCreateSingle;
