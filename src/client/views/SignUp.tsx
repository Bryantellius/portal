import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { apiService, abortFetching } from "../utils/apiService";

const PasswordReset: React.FC<IPasswordResetProps> = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params: any = useParams();
  const history = useHistory();
  const controller = new AbortController();

  useEffect(() => {
    return function cleanup() {
      abortFetching(controller);
    };
  }, []);

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
        let res = await apiService(
          "/auth/register",
          false,
          "PUT",
          controller.signal,
          {
            user: {
              email,
              password,
            },
            creds: {
              token: params.token,
              UserID: params.UserID,
            },
          }
        );
        if (res.successful) {
          console.log(res);
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
    <main id="loginPage" className="container-fluid">
      <form className="loginForm card" onSubmit={resetPassword}>
        <div className="form-group">
          <h1>Hello there!</h1>
        </div>
        <div id="errorAlert" className="alert alert-danger"></div>
        <hr />
        <div className="form-group">
          <label htmlFor="resetEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="resetEmail"
            aria-describedby="emailHelp"
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="resetPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="resetPassword1"
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="resetPassword">Re-type Password</label>
          <input type="password" className="form-control" id="resetPassword2" />
          <p id="passValidation" className="text-danger validationAlert">
            Passwords must match!
          </p>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <hr />
        <div className="form-group">
          <p>
            Can't update your information? Contact{" "}
            <a href="mailto:support@truecoders.io">support@truecoders.io</a>.
          </p>
        </div>
      </form>
    </main>
  );
};

interface IPasswordResetProps {
  setIsLoggedIn: any;
}

export default PasswordReset;
