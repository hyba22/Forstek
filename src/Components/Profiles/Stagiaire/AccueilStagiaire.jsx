import React from 'react';
import { Link } from 'react-router-dom';                                    
import './StagiaireProfile.css';

const AccueilStagiaire = () => (
  <div className="welcome-container">
    <div className="welcome-header">
      <h1 className="modern-title">Espace Stagiaire</h1>
      <p className="welcome-subtitle">Bienvenue sur votre plateforme de stage</p>
    </div>

    <div className="welcome-grid">
      <div className="welcome-card primary">
        <h2>
          <Link to="/stagiaire/suivi-demande" className="card-link">
            Suivi des demandes
          </Link>
        </h2>
        <p>Consultez l'état de vos candidatures en cours</p>
        <div className="card-icon">📋</div>
      </div>

      <div className="welcome-card secondary">
        <h2>
          <Link to="/offres-disponibles" className="card-link">
            Offres disponibles
          </Link>
        </h2>
        <p>Découvrez les nouvelles opportunités de stage</p>
        <div className="card-icon">🔍</div>
      </div>

      <div className="welcome-card stats">
        <h2>Vos statistiques</h2>
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">Candidatures envoyées</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">1</span>
            <span className="stat-label">Entretiens programmés</span>
          </div>
        </div>
      </div>

      <div className="welcome-card alert">
        <h2>Actions requises</h2>
        <ul className="alert-list">
          <li>✔️ Compléter votre profil (85%)</li>
          <li>📅 Répondre à l'offre de "Entreprise XYZ"</li>
        </ul>
      </div>
    </div>

    <div className="quick-actions">
      <Link to="/offres-disponibles" className="action-button">
        Voir les nouvelles offres
      </Link>
      <Link to="/stagiaire/parametres" className="action-button outline">
        Compléter mon profil
      </Link>
    </div>
  </div>
);

export default AccueilStagiaire;


