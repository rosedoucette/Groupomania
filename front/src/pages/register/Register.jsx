import React, { useContext } from "react";
import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  if (user) {
    redirect("/home");
  }

  const handleClick = async (e) => {
    //this function prevents the default action which is refreshing the page when submitting
    e.preventDefault();
    console.log(password);
    console.log(passwordAgain);
    if (passwordAgain.current.value !== password.current.value) {
      //!== means they don't match
      password.current.setCustomValidity("Passwords don't match!"); //setting a custom message if passwords are not the same
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(
          process.env.REACT_APP_API_URL + "/api/auth/register",
          user
        ); //connecting/grabbing the base url from .env and adding the rest of the ""
        navigate("/home");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <img
            src="assets/CompanyLogos/icon-black1.png"
            alt=""
            className="loginLogo"
          />
          <span className="loginDesc">
            Register here to connect with coworkers on Groupomania Social!
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">
              Login to your Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
