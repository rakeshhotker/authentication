import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
const Login = ({ setAuth }) => {
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = Inputs;
  const onChange = (e) => {
    setInputs({ ...Inputs, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("login successful!");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <h1 className='text-center my-5'>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          className='form-control my-3'
          type='email'
          name='email'
          value={email}
          placeholder='email'
          onChange={(e) => onChange(e)}
        />
        <input
          className='form-control my-3'
          type='password'
          name='password'
          placeholder='password'
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button className='btn btn-success btn-block'>Submit</button>
      </form>
    </Fragment>
  );
};

export default Login;
