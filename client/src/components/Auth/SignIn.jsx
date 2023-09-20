import React, { useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Main.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


function onSubmit(e){
  e.preventDeafult();
}

  return (
    <Stack gap={2}>
      <input
        className="login-input"
        placeholder="Add your Email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="login-input"
        placeholder="Enter Your Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <div className="button">
        <button className="login-button" onSubmit={onSubmit}>
          Sign Up
        </button>
        <span className="password-toggle" onClick={togglePasswordVisibility}>
          {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
        </span>
      </div>
    </Stack>
  );
}

export default SignIn