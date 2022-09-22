import React from "react";
import { API_URL } from "../../config/config";

async function logoutUser() {
  return fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token")!)}`,
    },
  }).then((data) => data.json());
}

export default function Dashboard({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<string>>;
}) {
  const onLogout = async () => {
    const response = await logoutUser();
    if (!response.ok) {
      return;
    }

    setState("login");
    localStorage.removeItem("token");
  };

  return (
    <div>
      <h2>Dashboard huj</h2>
      <h1>{localStorage.getItem("token")}</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
