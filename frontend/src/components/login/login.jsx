import React, { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div class="container">
      <div class="center">
        <h1>Login</h1>
        <form action="">
          <div class="txt_field">
            <input type="text" name="text" required />
            <span></span>
            <label>Username</label>
          </div>
          <div class="txt_field">
            <input type="password" name="password" required />
            <span></span>
            <label>Password</label>
          </div>
          <input
            name="submit"
            type="Submit"
            value="Login"
            onClick={() => navigate("/home")}
          />
        </form>
      </div>
    </div>
  );
};
export default Login;
