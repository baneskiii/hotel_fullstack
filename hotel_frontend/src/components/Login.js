import React from "react";
import { useState, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const usernameRef = useRef();
  const { setAuthentication } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/login",
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const name = response?.data?.name;
      const token = response?.data?.token;
      setAuthentication({ name, token });
      setUsername("");
      setPassword("");
      setSuccessful(false);
      navigate(from, { replace: true });
    } catch (err) {
      if (err?.response) {
        setErrorMessage("User invalid");
      } else if (err.response?.status === 400) {
        setErrorMessage("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrorMessage("Unauthorized");
      } else {
        setErrorMessage("Login not successful");
      }
      setSuccessful(true);
    }
  };

  return (
    <div>
      <div className="container">
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-6 col-md-4"></div>
          <div className="col-6 col-md-4">
            <h2>Sign In</h2>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Your username"
                  ref={usernameRef}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Your password"
                  className="form-control"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
              <div className="mb-3">
                {successful ? (
                  <p className="text-danger" aria-live="assertive">
                    {errorMessage}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="col-6 col-md-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
