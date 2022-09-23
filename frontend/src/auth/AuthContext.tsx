import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { API_URL } from "../config/config";

const AuthContext = createContext<any>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: any }) => {
  const [token, setToken] = useState<any>(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token")!)
      : null
  );

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const response = await axios.post(
      `${API_URL}/login`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setToken(response.data.token);
  };

  const signUp = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const response = await axios.post(
      `${API_URL}/register`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setToken(response.data.token);
  };

  const logout = async () => {
    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setToken(null);
  };

  const value = {
    token,
    setToken,
    signUp,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
