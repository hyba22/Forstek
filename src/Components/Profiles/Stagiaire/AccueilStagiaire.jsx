import React from 'react';
import { Link } from 'react-router-dom';
import './AccueilStagiaire.css';

const AccueilStagiaire = () => {
  return (
    <div className="welcome-container container py-5">
   
      <div className="welcome-header text-center mb-5">
        <h1 className="modern-title display-4 fw-bold mb-3">Espace Stagiaire</h1>
        <p className="welcome-subtitle fs-5 text-muted">Bienvenue sur votre plateforme de stage</p>
      </div>

      <div className="welcome-grid row g-4 mb-5">
   
        <div className="col-md-6 col-lg-3">
          <div className="welcome-card primary h-100 p-4">
            <h2 className="h4 fw-semibold mb-3">
              <Link to="/stagiaire-profile/suivi-demande" className="card-link text-decoration-none">
                Suivi des demandes
              </Link>
            </h2>
            <p className="text-secondary mb-4">Consultez l'état de vos candidatures en cours</p>
            <div className="card-icon fs-1 opacity-25">📋</div>
          </div>
        </div>

  
        <div className="col-md-6 col-lg-3">
          <div className="welcome-card secondary h-100 p-4">
            <h2 className="h4 fw-semibold mb-3">
              <Link to="/offres-disponibles" className="card-link text-decoration-none">
                Offres disponibles
              </Link>
            </h2>
            <p className="text-secondary mb-4">Découvrez les nouvelles opportunités de stage</p>
            <div className="card-icon fs-1 opacity-25">🔍</div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="welcome-card stats h-100 p-4">
            <h2 className="h4 fw-semibold mb-3">Vos statistiques</h2>
            <div className="stats-container row g-2">
              <div className="stat-item col-6 p-3 bg-success bg-opacity-10 rounded">
                <span className="stat-number d-block fs-3 fw-bold text-success">3</span>
                <span className="stat-label small text-muted">Candidatures</span>
              </div>
              <div className="stat-item col-6 p-3 bg-success bg-opacity-10 rounded">
                <span className="stat-number d-block fs-3 fw-bold text-success">1</span>
                <span className="stat-label small text-muted">Entretiens</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="welcome-card alert h-100 p-4">
            <h2 className="h4 fw-semibold mb-3">Actions requises</h2>
            <ul className="alert-list list-unstyled">
              <li className="d-flex align-items-center py-2 border-bottom">
                <span className="text-success me-2">✔️</span>
                <span>Compléter votre profil (85%)</span>
              </li>
              <li className="d-flex align-items-center py-2">
                <span className="text-warning me-2">📅</span>
                <span>Répondre à l'offre XYZ</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="quick-actions d-flex justify-content-center gap-3 flex-wrap">
        <Link to="/offres-disponibles" className="action-button btn btn-primary px-4 py-2">
          Voir les nouvelles offres
        </Link>
        <Link to="/stagiaire-profile/parametres" className="action-button btn btn-outline-primary px-4 py-2">
          Compléter mon profil
        </Link>
      </div>
    </div>
  );
};

export default AccueilStagiaire;