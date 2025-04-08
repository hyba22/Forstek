import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import "./parametre.css";

const Parametres = () => {
  const [nom, setNom] = useState("Jasser Benslah");
  const [email, setEmail] = useState("Jasser@example.com");
  const [motDePasse, setMotDePasse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate(); 

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/stagiaire/parametres", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nom, email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erreur de mise à jour");

      setMessage({ text: "Modifications enregistrées avec succès", type: "success" });
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!motDePasse) {
      setMessage({ text: "Veuillez entrer un mot de passe", type: "error" });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/stagiaire/mot-de-passe", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ motDePasse }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erreur de changement de mot de passe");

      setMessage({ text: "Mot de passe modifié avec succès", type: "success" });
      setMotDePasse("");
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement votre compte ?")) {
      setIsLoading(true);
      setMessage({ text: "", type: "" });

      const token = localStorage.getItem("token");
      fetch("http://localhost:3000/api/stagiaire/compte", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          localStorage.removeItem("token");
          window.location.href = "/";
        })
        .catch(error => {
          setMessage({ text: error.message, type: "error" });
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="content">
      <div className="back-button-container">
        <button 
          onClick={() => navigate('/stagiaire-profile')} 
          className="back-button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour
        </button>
      </div>

      <h1 className="modern-title">Paramètres du compte</h1>

      {message.text && (
        <div className={`alert alert-${message.type === "error" ? "danger" : "success"} mb-4`}>
          {message.text}
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <h2 className="h4 mb-4">Informations personnelles</h2>
          <form onSubmit={handleSave}>
            <div className="mb-3">
              <label className="modern-label">Nom complet</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="modern-input form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="modern-label">Adresse email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="modern-input form-control"
                required
              />
            </div>
            <button
              type="submit"
              className="modern-button"
              disabled={isLoading}
            >
              {isLoading ? "Enregistrement..." : "Sauvegarder les modifications"}
            </button>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h2 className="h4 mb-4">Sécurité du compte</h2>
          <form onSubmit={handlePasswordChange}>
            <div className="mb-3">
              <label className="modern-label">Nouveau mot de passe</label>
              <input
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                className="modern-input form-control"
                placeholder="Entrez un mot de passe fort"
              />
            </div>
            <button
              type="submit"
              className="modern-button"
              disabled={isLoading}
            >
              {isLoading ? "Modification..." : "Changer le mot de passe"}
            </button>
          </form>
        </div>
      </div>

      <div className="card border-danger">
        <div className="card-body">
          <h2 className="h4 mb-4 text-danger">Zone dangereuse</h2>
          <p className="mb-4">Supprimer définitivement votre compte et toutes vos données.</p>
          <button
            onClick={handleDelete}
            className="modern-button danger"
            disabled={isLoading}
          >
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default Parametres;