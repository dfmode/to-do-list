import axios from "axios";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { API_URL } from "../config/config";
import { useEffect } from "react";

const CheckTokenValidity = async (token: string) => {
  try {
    await axios.post(
      `${API_URL}/login`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch {
    return false;
  }

  return true;
};

export default function RequireAuth({ children }: { children: any }) {
  const { token, setToken } = useAuth();

  useEffect(() => {
    axios
      .post(
        `${API_URL}/login`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch(() => setToken(null));
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}
