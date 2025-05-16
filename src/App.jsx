import React from "react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className="container">
        <h1 className="titulo">Bienvenido</h1>
        <div className="botones">
          <Link to="/registro" className="btn rojo">Registrarse</Link>
          <Link to="/login" className="btn gris">Iniciar Sesión</Link>
        </div>
      </div>

      <style>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: white;
          font-family: Arial, sans-serif;
          text-align: center;
        }

        .titulo {
          font-size: 2.5rem;
          color: #cc0000; /* Rojo tipo YouTube */
          margin-bottom: 20px;
        }

        .botones {
          display: flex;
          gap: 20px;
        }

        .btn {
          padding: 10px 20px;
          text-decoration: none;
          font-weight: bold;
          border-radius: 5px;
          transition: background-color 0.3s;
        }

        .rojo {
          background-color: #cc0000;
          color: white;
        }

        .rojo:hover {
          background-color: #a00000;
        }

        .gris {
          background-color: #f0f0f0;
          color: #333;
        }

        .gris:hover {
          background-color: #ddd;
        }
      `}</style>
    </>
  );
}
