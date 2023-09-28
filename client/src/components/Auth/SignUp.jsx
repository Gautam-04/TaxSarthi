import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai"
import "./Main.css";
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
import axios from 'axios';

function SignUp() {
  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    function handleClick(e){
      e.preventDefault();
      axios
        .post("http://localhost:8000/signup", {
          name,
          email,
          password,
          confirmPassword,
        })
        .then((result) => {
          console.log(result)
        toast.success("You are Registered successfully");
        navigate("/docs-list");
        })
        .catch((error) => toast.error("Try after sometime"));
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };


  return (
    <Stack gap={2}>
      <input
        className="login-input"
        placeholder="Enter your Name"
        required
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        className="login-input"
        placeholder="Add your Email"
        required
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="login-input"
        placeholder="Enter Your Password"
        required
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        className="login-input"
        placeholder="Confirm Password"
        required
        type={showPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <div className="button">
        <button className="login-button"
        onClick={handleClick}
        >
          Sign Up
        </button>
        <span className="password-toggle" onClick={togglePasswordVisibility}>
          {showPassword? <AiFillEye /> : <AiFillEyeInvisible />}
        </span>
      </div>
    </Stack>
  );
}

export default SignUp;
