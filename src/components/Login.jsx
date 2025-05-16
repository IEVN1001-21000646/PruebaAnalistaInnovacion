import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/inicio");
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Iniciar sesión</h2>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
          <p className="link">
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>
        </form>
      </div>

      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f9f9f9;
        }

        .login-form {
          background-color: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
        }

        .login-form h2 {
          margin-bottom: 1rem;
          color: #cc0000;
          text-align: center;
        }

        .login-form input {
          margin-bottom: 1rem;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
        }

        .login-form button {
          padding: 10px;
          background-color: #cc0000;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .login-form button:hover {
          background-color: #a00000;
        }

        .link {
          margin-top: 1rem;
          text-align: center;
          font-size: 0.9rem;
        }

        .link a {
          color: #cc0000;
          text-decoration: none;
          font-weight: bold;
        }

        .link a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
