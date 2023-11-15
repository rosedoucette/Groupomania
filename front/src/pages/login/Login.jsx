import React, { useContext, useEffect, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  const handleClick = (e) => {
    //thhis function prevents the default action which is refreshing the page when submitting
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <img
            src="assets/CompanyLogos/icon-black.png"
            alt=""
            className="loginLogo"
          />
          <span className="loginDesc">
            Connect with coworkers on Groupomania Social!
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBoxBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              minLength="6"
              className="loginInput"
              ref={email}
            />
            {/* required should create a popup that says thie field is required */}
            <input
              placeholder="Password"
              type="password"
              required
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
              {/* {isFetching ? <CircularProgress color="white" size="20px" /> : "Create a New Account"} */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
