import React from "react";
import { useAuth } from "../../auth/AuthContext";
import { API_URL } from "../../config/config";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import "./Dashboard.css";
import TodoList from "../TodoList/TodoList";

export default function Dashboard() {
  const { logout } = useAuth();

  const onLogout = async () => {
    await logout();
  };

  return (
    <div className="Dashboard">
      <div className="header">
        <div className="dashboard__title">
          <BsFillCalendarCheckFill
            style={{ color: "#2AABEE", width: "16px" }}
            className="dashboard__icon"
          />
          <div>To-do-list</div>
        </div>
        <div className="logoutBtn__container">
          <button className="LogoutBtn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="Todo">
        <TodoList />
      </div>
    </div>
  );
}
