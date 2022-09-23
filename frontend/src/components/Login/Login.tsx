import { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { API_URL } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { useAuth } from "../../auth/AuthContext";

// async function loginUser(credentials: { username: string; password: string }) {
//   return fetch(`${API_URL}/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   }).then((data) => data.json());
// }

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e: any) => {
    // const data = await loginUser({
    //   username: username.trim(),
    //   password: password.trim(),
    // });
    // if (!data.ok) {
    //   return;
    // }
    // setToken(data.user);

    try {
      await login({
        username: username.trim(),
        password: password.trim(),
      });
      navigate("/dashboard");
    } catch {
    } finally {
    }
  };

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const style = {
    borderBottom: errors.username ? "2px solid #F01E2C" : "2px solid #DDDDDD",
  };

  return (
    <div className="LoginContainer">
      <div className="Top">
        <BsFillCalendarCheckFill
          style={{ color: "#2AABEE" }}
          className="dashboard__icon"
        />
        <div className="PageTitle">Login / </div>
        <a className="TogglePage" onClick={() => navigate("/register")}>
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
              pattern: /^[A-Za-z0-9]{3,20}$/g,
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
              pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,20}$/g,
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
