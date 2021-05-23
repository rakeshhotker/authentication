import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState(" ");
  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setName(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getName();
  }, []);
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("logout successful!");
  };
  return (
    <Fragment>
      <h1>DashBoard {name}</h1>
      <button className='btn btn-primary' onClick={(e) => logout(e)}>
        Logout
      </button>
    </Fragment>
  );
};

export default Dashboard;
