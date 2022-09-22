import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./Registration.css";
import { API_URL } from "../../config/config";

async function registerUser(credentials: {
  username: string;
  password: string;
}) {
  return fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Registration({
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
    const data = await registerUser({
      username: username.trim(),
      password: password.trim(),
    });

    if (!data.ok) {
      return;
    }
    console.log(data);
    setToken(data.token);
    setState("dashboard");
  };

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const style = {
    borderBottom: errors.username ? "2px solid #F01E2C" : "2px solid #DDDDDD",
  };

  return (
    <div className="RegistrationContainer">
      <div className="Top">
        <div className="PageTitle">Register / </div>
        <a className="TogglePage" onClick={() => setState("login")}>
          Login
        </a>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="InputContainer">
          <input
            className="Input"
            style={style}
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
            type="password"
            style={style}
            className="Input"
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
        <div className="InputContainer">
          <input
            type="password"
            style={style}
            className="Input"
            placeholder="Repeat Password"
            {...register("repeatPassword", {
              pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,20}$/i,
              required: true,
            })}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          {errors.setRepeatPassword && (
            <p className="InvalidDataText">
              Password must contain 8-20 characters, at least one capital letter
              and special symbol [!@#$&*]
            </p>
          )}
          {password !== repeatPassword && password && repeatPassword && (
            <p className="InvalidDataText">Passwords does not match</p>
          )}
        </div>
        <div>
          <div className="BtnContainer">
            <button className="RegistrationBtn" type="submit">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
