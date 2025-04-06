import React, { useEffect, useState } from "react";
import "./StagiaireProfile.css";

const SuiviDemande = () => {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aucun token trouvé dans localStorage");
      alert("Veuillez vous connecter");
      window.location.href = "/";
      return;
    }

    console.log("Envoi de la requête avec token:", token);
    fetch("http://localhost:3000/stagiaire/suivi-demande", { 
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Statut de la réponse:", response.status);
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Non autorisé - Token invalide");
          } else if (response.status === 404) {
            throw new Error("Route non trouvée");
          } else {
            throw new Error(`Erreur HTTP: ${response.status}`);
          }
        }
        return response.json();
      })
      .then((data) => {
        console.log("Données reçues:", data);
        setDemandes(data.data || []);
      })
      .catch((error) => {
        console.error("Erreur détaillée:", error.message);
        alert(`Erreur: ${error.message}. Veuillez vous reconnecter.`);
        window.location.href = "/";
      });
  }, []);

  return (
    <div className="content">
      <h1 className="modern-title">Suivi de demande</h1>
      <table className="modern-table">
        <thead>
          <tr>
            <th>Nom de société</th>
            <th>Poste</th>
            <th>Date de demande</th>
            <th>État</th>
            <th>Réponse</th>
          </tr>
        </thead>
        <tbody>
          {demandes.length > 0 ? (
            demandes.map((demande) => (
              <tr key={demande.id}>
                <td>{demande.nomSociete}</td>
                <td>{demande.poste}</td>
                <td>{demande.dateDemande}</td>
                <td>{demande.etat}</td>
                <td>{demande.reponse}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Aucune demande trouvée</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SuiviDemande;