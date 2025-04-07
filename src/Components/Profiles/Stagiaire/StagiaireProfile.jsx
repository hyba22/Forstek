import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import SuiviDemande from './SuiviDemande';
import Parametres from './Parametres';
import Deconnexion from './Deconnexion';
import AccueilStagiaire from './AccueilStagiaire';
import './StagiaireProfile.css';

const StagiaireProfile = () => (
  <div className="stagiaire-profile">
    <div className="sidebar modern-sidebar">
      <h2 className="modern-title">Profil Stagiaire</h2>
      <ul>
        <li>
          <Link to="/stagiaire/suivi-demande" className="modern-link">Suivi de demande</Link>
        </li>
        <li>
          <Link to="/offres-disponibles" className="modern-link">Offres disponibles</Link>
        </li>
        <li>
          <Link to="/stagiaire/parametres" className="modern-link">Paramètres</Link>
        </li>
        <li>
          <Link to="/stagiaire/deconnexion" className="modern-link">Déconnexion</Link>
        </li>
      </ul>
    </div>

    <div className="content modern-content">
      <Routes>
        <Route path="/" element={<AccueilStagiaire />} />
        <Route path="/suivi-demande" element={<SuiviDemande />} />
        <Route path="/parametres" element={<Parametres />} />
        <Route path="/deconnexion" element={<Deconnexion />} />
      </Routes>
    </div>
  </div>
);

export default StagiaireProfile;