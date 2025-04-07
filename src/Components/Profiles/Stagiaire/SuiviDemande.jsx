import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StagiaireProfile.css';

const SuiviDemande = () => {
  const [demandes, setDemandes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Veuillez vous connecter');
      window.location.href = '/';
      return;
    }

    fetch('http://localhost:3000/api/stagiaire/suivi-demande', { 
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setDemandes(data.data || []))
      .catch(error => {
        alert(`Erreur: ${error.message}`);
        window.location.href = '/';
      });
  }, []);

  return (
    <div className="content">
      <div className="back-button-container">
        <button 
          onClick={() => navigate(-1)} 
          className="back-button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour
        </button>
      </div>
      
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
            demandes.map(demande => (
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