import React, { useState } from "react";
import "./StagiaireProfile.css";

const Parametres = () => {
  const [nom, setNom] = useState("Jean Dupont");
  const [email, setEmail] = useState("jean.dupont@example.com");
  const [motDePasse, setMotDePasse] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/stagiaire/parametres", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nom, email }),
    })
      .then((response) => response.json())
      .then((data) => alert(data.message))
      .catch((error) => console.error("Erreur:", error));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/stagiaire/mot-de-passe", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ motDePasse }),
    })
      .then((response) => response.json())
      .then((data) => alert(data.message))
      .catch((error) => console.error("Erreur:", error));
  };

  const handleDelete = () => {
    if (window.confirm("Voulez-vous vraiment supprimer votre compte ?")) {
      const token = localStorage.getItem("token");
      fetch("http://localhost:3000/stagiaire/compte", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          localStorage.removeItem("token");
          window.location.href = "/";
        })
        .catch((error) => console.error("Erreur:", error));
    }
  };

  return (
    <div className="content">
      <h1 className="modern-title">Paramètres</h1>

      <div className="card">
        <h2 className="modern-subtitle">Informations personnelles</h2>
        <form onSubmit={handleSave} className="modern-form">
          <label className="modern-label">
            Nom :
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="modern-input"
            />
          </label>
          <label className="modern-label">
            Email :
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="modern-input"
            />
          </label>
          <button type="submit" className="modern-button">Sauvegarder</button>
        </form>
      </div>

      <div className="card">
        <h2 className="modern-subtitle">Changer le mot de passe</h2>
        <form onSubmit={handlePasswordChange} className="modern-form">
          <label className="modern-label">
            Nouveau mot de passe :
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="modern-input"
            />
          </label>
          <button type="submit" className="modern-button">Modifier</button>
        </form>
      </div>

      <div className="card">
        <h2 className="modern-subtitle">Supprimer le compte</h2>
        <button onClick={handleDelete} className="modern-button danger">
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
};

export default Parametres;