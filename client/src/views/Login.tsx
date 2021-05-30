import React, { FunctionComponent, useState } from "react"
import { Alert, Container, Form, Card, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import ApiClient from "../utils/apiClient"
import { useLocalStorageState } from "../store"

const apiClient = new ApiClient()

const Login: FunctionComponent = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [, setUser] = useLocalStorageState('user')
  const [, setToken] = useLocalStorageState('token')
  const history = useHistory()

  const checkLogin = async (e: any) => {
    e.preventDefault()
    const loginResponse = await apiClient.post("/auth/login", {
        email,
        password
      }
    )

    if (loginResponse && loginResponse.token) {
      setUser(loginResponse.user)
      setToken(loginResponse.token)
      history.replace("/")
    }
  }

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
  )
}

export default Login
