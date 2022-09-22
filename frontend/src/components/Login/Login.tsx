import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { API_URL } from "../../config/config";

async function loginUser(credentials: { username: string; password: string }) {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({
  setToken,
  setState,
}: {
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setState: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e: any) => {
    const data = await loginUser({
      username: username.trim(),
      password: password.trim(),
    });

    if (!data.ok) {
      return;
    }

    setToken(data.token);
    setState("dashboard");
  };

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const style = {
    borderBottom: errors.username ? "2px solid #F01E2C" : "2px solid #DDDDDD",
  };

  return (
    <div className="LoginContainer">
      <div className="Top">
        <div className="PageTitle">Login / </div>
        <a className="TogglePage" onClick={() => setState("register")}>
          Register
        </a>
      </div>
      <form className="Form" onSubmit={handleSubmit(onSubmit)}>
        <div className="InputContainer">
          <input
            style={style}
            className="Input"
            type="text"
            placeholder="Username"
            {...register("username", {
              pattern: /^[A-Za-z0-9]{3,20}$/i,
              required: true,
            })}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.username && (
            <p className="InvalidDataText">Please check the Username</p>
          )}
        </div>
        <div className="InputContainer">
          <input
            className="Input"
            style={style}
            type="password"
            placeholder="Password"
            {...register("password", {
              pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,20}$/i,
              required: true,
            })}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="InvalidDataText">
              Password must contain 8-20 characters, at least one capital letter
              and special symbol [!@#$&*]
            </p>
          )}
        </div>
        <div>
          <div className="BtnContainer">
            <button className="LoginBtn" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
