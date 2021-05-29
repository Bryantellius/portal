import React, { useEffect, useState } from "react";
import { Alert, Container, Form, Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ApiClient from "../utils/apiClient";
import AuthService from "../utils/authService";

const apiClient = new ApiClient();
const authService = new AuthService();

const Login: React.FC<ILoginProps> = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const checkLogin = async (e: any) => {
    try {
      e.preventDefault();
      const loginResponse = await apiClient.post("/auth/login", {
          email,
          password,
        }
      );

      if (loginResponse && loginResponse.token) {
        authService.saveCredentials(loginResponse.token, loginResponse.user);
        setIsLoggedIn(true);
        history.replace("/");
      } else {
        document.getElementById("errorAlert").style.display = "block";
        document.getElementById("errorAlert").textContent =
          "Email or Password is incorrect. Try again.";
      }
    } catch (error) {
      console.log("catch");
      console.log(error.message);
      document.getElementById("errorAlert").style.display = "block";
      document.getElementById("errorAlert").textContent =
        "Something went wrong. Try again later.";
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
              onChange={(e: any) => setEmail(e.target.value)} 
            />
          </Form.Group>
          <Form.Group>
        <label htmlFor="loginPassword">Password</label>
        <Form.Control
          type="password"
          className="form-control"
          id="loginPassword"
          onChange={(e: any) => setPassword(e.target.value)}
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

interface ILoginProps {
  setIsLoggedIn: any;
}

export default Login;
