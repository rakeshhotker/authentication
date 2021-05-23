import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function App() {
  const [IsAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  async function IsAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/isverify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    IsAuth();
  });
  return (
    <div className='App'>
      <Fragment>
        <Router>
          <div className='container'>
            <Switch>
              <Route
                exact
                path='/login'
                render={(props) =>
                  !IsAuthenticated ? (
                    <Login {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to='/dashboard' />
                  )
                }
              />
              <Route
                exact
                path='/register'
                render={(props) =>
                  !IsAuthenticated ? (
                    <Register {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to='/login' />
                  )
                }
              />
              <Route
                exact
                path='/dashboard'
                render={(props) =>
                  IsAuthenticated ? (
                    <Dashboard {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to='/login' />
                  )
                }
              />
            </Switch>
          </div>
        </Router>
      </Fragment>
    </div>
  );
}

export default App;
