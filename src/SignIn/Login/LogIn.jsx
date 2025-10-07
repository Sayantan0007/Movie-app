
import React, { useRef, useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

const LogIn = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  // const [password, setPassword] = useState("");
  const URL = "https://reqres.in/api/login";

  const handleLogin = () => {
    const options = {
      email: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    if (!options.email || !options.password) {
      setError("Please fill in both fields.");
      return;
    }
    axios
      .post(URL, options, {
        headers: {
          "x-api-key": "reqres-free-v1",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const primaryToken = res.data.token;
          localStorage.setItem("token", primaryToken);
          
          navigate("/");
        }
      });
  };

  return (
    <div>
      <div className="login-wrapper">
        <h4 className="login-title">Sign In</h4>
        <div className="login-form-group">
          <label htmlFor="user" className="login-label">
            User Name
          </label>
          <input
            type="text"
            id="user"
            className="login-input"
            placeholder="Enter username here..."
            ref={usernameRef}
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="pass" className="login-label">
            Password
          </label>
          <input
            type="password"
            id="pass"
            className="login-input"
            placeholder="Enter password here..."
            ref={passwordRef}
          />
          {error && <div className="alert alert-danger mt-2">{error}</div>}

        </div>
        <button className="login-btn" onClick={handleLogin}>
          Log In
        </button>
        <div className="login-register">
          <p>
            New user?{" "}
            <span onClick={() => navigate("/register")}>Register here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
