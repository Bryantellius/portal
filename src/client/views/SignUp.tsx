import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import ApiClient from "../utils/apiClient";

const PasswordReset: FunctionComponent<IPasswordResetProps> = ({ setIsLoggedIn }) => {
  const apiClient = new ApiClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params: any = useParams();
  const history = useHistory();
  const controller = new AbortController();

  const resetPassword = async (e: any) => {
    e.preventDefault();

    const val = document.getElementById("passValidation");
    const p2 = document.getElementById("resetPassword2") as HTMLInputElement;
    if (password !== p2.value) {
      val.classList.add("validationAlert");
      p2.classList.add("invalid-password-match");
    } else {
      p2.classList.remove("invalid-password-match");
      val.classList.remove("validationAlert");

      try {
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
        } else {
          document.getElementById("errorAlert").style.display = "block";
          document.getElementById("errorAlert").textContent =
            "Could not update credentials. Try again later.";
        }
      } catch (error) {
        console.log("catch");
        document.getElementById("errorAlert").style.display = "block";
        document.getElementById("errorAlert").textContent =
          "Something went wrong. Try again later.";
      }
    }
  };

  return (
    <Container id="loginPage" fluid>
        <Card as="form" className="loginForm" onSubmit={resetPassword}>
          <Form.Group>
            <h1>Hello there!</h1>
          </Form.Group>
          <Alert id="errorAlert" variant="danger"></Alert>
          <hr />
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              id="resetEmail"
              aria-describedby="emailHelp"
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="form-control"
              id="resetPassword1"
              onChange={(e: any) => setPassword(e.target.value)}
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

interface IPasswordResetProps {
  setIsLoggedIn: any;
}

export default PasswordReset;
