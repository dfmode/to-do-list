import React from "react";
import { useState, useEffect } from "react";
import { Route, Router, Routes } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import RequireAuth from "./auth/RequireAuth";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
