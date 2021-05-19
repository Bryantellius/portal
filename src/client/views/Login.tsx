import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiService, setAccessToken, abortFetching } from "../utils/apiService";

const Login: React.FC<ILoginProps> = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const controller = new AbortController();

  useEffect(() => {
    return function cleanup() {
      abortFetching(controller);
    };
  }, []);

  const checkLogin = async (e: any) => {
    try {
      e.preventDefault();
      let res = await apiService(
        "/auth/login",
        false,
        "POST",
        controller.signal,
        {
          email,
          password,
        }
      );
      if (res) {
        setAccessToken(res.token, res.user);
        setIsLoggedIn(true);
        history.replace("/");
      } else {
        console.log("else");
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
    <main id="loginPage" className="container-fluid">
      <form className="loginForm card" onSubmit={checkLogin}>
        <div className="form-group">
          <h1>Welcome Back!</h1>
        </div>
        <div id="errorAlert" className="alert alert-danger"></div>
        <hr />
        <div className="form-group">
          <label htmlFor="loginEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            aria-describedby="emailHelp"
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <hr />
        <div className="form-group">
          <p>
            Can't login? Contact{" "}
            <a href="mailto:support@truecoders.io">support@truecoders.io</a>.
          </p>
        </div>
      </form>
    </main>
  );
};

interface ILoginProps {
  setIsLoggedIn: any;
}

export default Login;
