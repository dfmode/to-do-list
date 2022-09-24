import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import Task from "../Task/Task";
import plus from "../../img/plus.svg";
import "./TodoList.css";
import axios from "axios";
import { API_URL } from "../../config/config";

export default function TodoList() {
  const [tasks, setTasks] = useState<any>([]);
  const [newTask, setNewTask] = useState("");

  const { token } = useAuth();

  useEffect(() => {
    axios
      .get(`${API_URL}/task`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTasks(res.data.tasks))
      .catch(() => setTasks([]));
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!newTask) {
      return;
    }
    axios
      .post(
        `${API_URL}/task`,
        { description: newTask },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(() => {
        setTasks([...tasks, { status: false, description: newTask }]);
        setNewTask("");
      })
      .catch();
  };

  const deleteTask = (id: string) => {
    axios
      .delete(`${API_URL}/task/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        setTasks((prev: any) => prev.filter((item: any) => item._id !== id));
      })
      .catch();
  };

  const markTask = (id: string, status: boolean) => {
    axios
      .patch(
        `${API_URL}/task/${id}`,
        { status: !status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(() => {
        setTasks((prev: any) =>
          prev.map((item: any) =>
            item._id !== id ? item : { ...item, status: !status }
          )
        );
      })
      .catch();
  };

  return (
    <>
      <div className="tasks__container">
        {tasks.map((item: any) => (
          <Task
            key={item._id}
            id={item._id}
            status={item.status}
            deleteTask={deleteTask}
            markTask={markTask}
            description={item.description}
          />
        ))}
      </div>
      <form onSubmit={onSubmit} className="createTaskForm">
        <button className="createTaskBtn">
          <img alt="plus" src={plus}></img>
        </button>
        <input
          className="TaskInput"
          type="text"
          placeholder="Create new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </form>
    </>
  );
}
