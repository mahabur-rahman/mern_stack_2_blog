import { useRef, useContext } from "react";
import "./login.css";
import axios from "axios";
import { UserContext } from "../../context/Context";

export default function Login() {
  const { user, isFetching, error, dispatch } = useContext(UserContext);

  const usernameRef = useRef();
  const passRef = useRef();

  // formSubmit | API call

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/auth/login", {
        username: usernameRef.current.value,
        password: passRef.current.value,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE" });
    }
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

        {error && (
          <span style={{ color: "red", marginTop: "10px" }}>
            Something went wrong!
          </span>
        )}
      </form>
      <button className="loginRegisterButton">Register</button>
    </div>
  );
}
