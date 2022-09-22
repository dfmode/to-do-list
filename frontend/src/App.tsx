import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";

// TODO: Handle edge cases on registration and login

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token")!)
      : ""
  );

  const [state, setState] = useState<string>(token ? "dashboard" : "login");

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  if (state == "login") {
    return <Login setToken={setToken} setState={setState} />;
  } else if (state == "register") {
    return <Registration setToken={setToken} setState={setState} />;
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <Dashboard setState={setState} />
    </div>
  );
}

export default App;
