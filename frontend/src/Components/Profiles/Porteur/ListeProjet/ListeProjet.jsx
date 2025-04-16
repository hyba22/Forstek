import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProjets } from '../../../Services/userService';
import styles from './ListeProjet.module.css';

const ListeProjet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [projets, setProjets] = useState([]);
  const newProjet = location.state?.formData;

  const handleValidation = (projet) => {
    navigate('/liste-porteur', {
      state: {
        action: 'validate',
        validatedProjet: projet
      }
    });
  };

  const handleRefus = (projet) => {
    navigate('/liste-porteur', {
      state: {
        action: 'refuse',
        refusedProjet: projet
      }
    });
  };

  useEffect(() => {
    const fetchProjets = async () => {
      try {
        const data = await getProjets();
        setProjets(data);
      } catch (error) {
        console.error("Erreur lors du chargement des projets:", error);
      }
    };
    
    fetchProjets();
  }, []);

  useEffect(() => {
    if (newProjet) {
      setProjets(prevProjets => [...prevProjets, newProjet]);
    }
  }, [newProjet]);

  return (
    <div className={styles.dataTableContainer}>
      <h2>Liste des Projets</h2>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Nom du Porteur</th>
            <th>Email</th>
            <th>Titre du Projet</th>
            <th>Description du projet</th>
            <th>Domaine du projet</th>
            <th>Budget</th>
            <th>Moyens</th>
            <th>Date de debut</th>
            <th>Date de fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projets.map((projet, index) => (
            <tr key={index}>
              <td>{projet.nomporteur}</td>
              <td>{projet.email}</td>
              <td>{projet.titreprojet}</td>
              <td>{projet.descriptionprojet}</td>
              <td>{projet.domaineprojet}</td>
              <td>{projet.budget}</td>
              <td>{projet.moyens}</td>
              <td>{projet.datedebut}</td>
              <td>{projet.datefin}</td>
              <td>
                <button 
                  className={styles.editBtn} 
                  onClick={() => handleValidation(projet)}
                >
                  Valider
                </button>
                <button 
                  className={styles.deleteBtn}
                  onClick={() => handleRefus(projet)}
                >
                  Refuser
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeProjet;