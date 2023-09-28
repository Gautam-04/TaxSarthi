import React, { useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import "./Main.css";
import { toast } from 'react-toastify';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


function handleClick(e){
  e.preventDefault();
  axios
    .post("http://localhost:8000/login", {
      email,
      password,
    })
    .then((result) => {
      console.log(result)
      if(result.data === "Success"){
        toast.success("Login Successful");
        navigate('/docs-list');
      }else if(result.data === "Password is incorrect"){
        toast.error("Incorrect Password")
        setPassword("")
      } else{
        toast.error("User Does Not Exists")
      }
    })
    .catch((err) => toast.error("Try again after sometime"));
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
        <button className="login-button" onClick={handleClick}>
          Login
        </button>
        <span className="password-toggle" onClick={togglePasswordVisibility}>
          {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
        </span>
      </div>
    </Stack>
  );
}

export default SignIn