import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import ApiClient from "../../utils/apiClient";
const apiClient = new ApiClient();

const AdminCreateSingle = ({
  roles,
  courses,
}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [course, setCourse] = useState("");

  const insertUser = async e => {
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

    const insertResponse = await apiClient.post("/auth/register", body);
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
            onChange={e =>
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
            onChange={e =>
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
              onChange={e =>
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
              onChange={e =>
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
              onChange={e =>
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

export default AdminCreateSingle;
