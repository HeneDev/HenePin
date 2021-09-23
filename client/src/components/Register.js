import React, { useState, useRef } from "react";
import "./register.css";
import { Room, Cancel } from "@material-ui/icons";
import axios from "axios";

const Register = (props) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/users/register", newUser);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        HenePin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="registerBtn" type="submit">
          Register
        </button>
        {success ? (
          <span className="success">Successful. You can now login</span>
        ) : (
          ""
        )}
        {error ? <span className="error">Something went wrong</span> : ""}
      </form>
      <Cancel className="registerCancel" onClick={props.onClose} />
    </div>
  );
};

export default Register;
