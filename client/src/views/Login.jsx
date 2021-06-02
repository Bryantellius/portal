import React, { useState } from "react";
import { Alert, Container, Form, Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ApiClient from "../utils/apiClient";
import { setToken, setUser } from '../store/auth/reducers/authReducer';
import { useDispatch } from "react-redux";

const apiClient = new ApiClient();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const saveUser = (user, token) => {
    const storeUser = {
      id: user.id,
      curriculumId: user.curriculumId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      lastLectureId: user.lastLectureId,
      role: user.Role || user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      course: user.course
    };

    localStorage.setItem('user', JSON.stringify(storeUser));
    localStorage.setItem('token', token);

    dispatch(setUser(storeUser));
    dispatch(setToken(token));
  };

  const checkLogin = async (e) => {
    e.preventDefault();
    const loginResponse = await apiClient.post("/auth/login", {
        email,
        password
      }
    );

    if (loginResponse && loginResponse.token) {

      saveUser(loginResponse.user, loginResponse.token);
      history.replace("/");
    }
  };

  return (

    <Container id="loginPage" as="main" fluid>
      <Card
        as="form"
        className="loginForm"
        onSubmit={checkLogin}>
        <Form.Group>
          <h1>Welcome Back!</h1>
        </Form.Group>
        <Alert id="errorAlert" variant="danger" />
        <hr />
        <Form.Group>
          <Form.Label>
            Email address
          </Form.Label>
          <Form.Control
            type="email"
            id="loginEmail"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <label htmlFor="loginPassword">Password</label>
          <Form.Control
            type="password"
            className="form-control"
            id="loginPassword"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary">
          Login
        </Button>

        <hr />

        <Form.Group>
          <p>
            Can't login? Contact{" "}
            <a href="mailto:support@truecoders.io">support@truecoders.io</a>.
          </p>
        </Form.Group>
      </Card>
    </Container>
  );
};

export default Login;