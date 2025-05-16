import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate, Link } from "react-router-dom";

export default function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!captchaValue) {
      setError("Completa el reCAPTCHA.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await setDoc(doc(db, "usuarios", userCredential.user.uid), {
        nombre: form.nombre,
        apellido: form.apellido,
        username: form.username,
        email: form.email,
      });

      setSuccessMessage("Usuario registrado exitosamente.");

      alert("Usuario registrado correctamente.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="registro-container">
        <form className="formulario" onSubmit={handleSubmit}>
          <h2>Registro</h2>
          <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
          <input name="apellido" placeholder="Apellido" onChange={handleChange} required />
          <input name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Correo" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
          <input name="confirmPassword" type="password" placeholder="Confirmar contraseña" onChange={handleChange} required />
          
          <div className="captcha">
            <ReCAPTCHA
              sitekey="6Lctjz0rAAAAADWya2n9FHZrQZdm1KANWjI2nJQk"
              onChange={(value) => setCaptchaValue(value)}
            />
          </div>

          <button type="submit">Registrarse</button>
          <p className="link">
            ¿Ya tienes cuenta? <Link to="/login">Iniciar sesion</Link>
          </p>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </form>
      </div>

      <style>{`
        .registro-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f9f9f9;
        }

        .formulario {
          background-color: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
        }

        .link a {
          color: #cc0000;
          text-decoration: none;
          font-weight: bold;
        }

        .link a:hover {
          text-decoration: underline;
        }

        .formulario h2 {
          margin-bottom: 1rem;
          color: #cc0000;
          text-align: center;
        }

        .formulario input {
          margin-bottom: 1rem;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
        }

        .formulario button {
          padding: 10px;
          background-color: #cc0000;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .formulario button:hover {
          background-color: #a00000;
        }

        .captcha {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .error {
          color: red;
          text-align: center;
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
}
