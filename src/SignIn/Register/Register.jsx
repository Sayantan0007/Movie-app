import React, { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import "./register.css"
const Register = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    
      const name= nameRef.current.value;
      const email= emailRef.current.value;
      const password= passwordRef.current.value;
  

   localStorage.setItem("name",name);
   localStorage.setItem("email",email);
   localStorage.setItem("password",password)

    // Simulate successful registration
    alert("Registration successful!");
    navigate("/signIn");
  };

  return (
    <div className="register-wrapper">
      <h4 className="register-title">Register</h4>
      <form onSubmit={handleRegister}>
        <div className="register-form-group">
          <label htmlFor="name" className="register-label">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="register-input"
            ref={nameRef}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="email" className="register-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="register-input"
            ref={emailRef}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="password" className="register-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="register-input"
            ref={passwordRef}
            placeholder="Enter a password"
            required
          />
        </div>
        <button className="register-btn" type="submit">
          Register
        </button>
        <div className="register-login">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/signIn")}>Login here</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
