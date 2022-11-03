import { useRef } from "react";
import "./login.css";
import axios from "axios";

export default function Login() {
  const usernameRef = useRef();
  const passRef = useRef();

  // formSubmit | API call

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your username..."
          ref={usernameRef}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passRef}
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
      <button className="loginRegisterButton">Register</button>
    </div>
  );
}
