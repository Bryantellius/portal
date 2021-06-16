import React, { useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import ApiClient from "../utils/apiClient";

const PasswordReset = () => {
  const apiClient = new ApiClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = useParams();
  const history = useHistory();

  const resetPassword = async (e) => {
    e.preventDefault();

    const p2 = document.getElementById("resetPassword2");
    if (password === p2.value) {
      const registerResponse = await apiClient.post(
        "/auth/register",
        {
          user: {
            email,
            password,
          },
          creds: {
            token: params.token,
            userId: params.userID,
          }
        }
      );
      if (registerResponse.status === 200) {
        history.replace("/login");
      }
    }
  };

  return (
    <Container id="loginPage" fluid>
        <Card as="form" className="loginForm" onSubmit={resetPassword}>
          <Form.Group>
            <h1>Hello there!</h1>
          </Form.Group>
          <Alert id="errorAlert" variant="danger" />
          <hr />
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              id="resetEmail"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="form-control"
              id="resetPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label htmlFor="resetPassword">Re-type Password</Form.Label>
            <Form.Control type="password" id="resetPassword2" />
              <Form.Control.Feedback 
                id="passValidation" 
                type="invalid" 
                className="validationAlert">
                  Passwords must match!
              </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
          <hr />
          <div>
            Can't update your information? Contact{" "}
            <a href="mailto:support@truecoders.io">support@truecoders.io</a>.
          </div>
        </Card>
      </Container>
  );
};

export default PasswordReset;
