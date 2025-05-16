
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registro from "./components/Registro.jsx";
import Login from "./components/Login.jsx";
import Inicio from "./components/Home.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/inicio" element={<Inicio />} />
    </Routes>
  </BrowserRouter>
);
