import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Navbar({ username }) {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <nav
      style={{
        backgroundColor: "#202020",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>InnovaTube</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "1rem", fontSize: "0.95rem" }}>
          Usuario: {username || user?.email}
        </span>
        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#ff0000",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
