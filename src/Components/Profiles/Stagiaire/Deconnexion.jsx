import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StagiaireProfile.css";

const Deconnexion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        localStorage.removeItem("token");
        alert("Déconnexion réussie");
        navigate("/");
      })
      .catch((error) => console.error("Erreur:", error));
  }, [navigate]);

  return (
    <div className="content">
      <h1 className="modern-title">Déconnexion</h1>
      <p className="modern-text">Redirection en cours...</p>
    </div>
  );
};

export default Deconnexion;