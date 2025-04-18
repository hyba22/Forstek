import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProjets } from '../../../../Services/userService';
import styles from './projetsFreelance.module.css';


const ListeProjetsFreelance = () => {
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
            <th>Nom du société</th>
            <th>Email</th>
            <th>Titre du Projet</th>
            <th>Description du projet</th>
            <th>Domaine du projet</th>
            <th>Budget</th>
            <th>Compétences requises</th>
            <th>Date de debut</th>
            <th>Date de fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projets.map((projet, index) => (
            <tr key={index}>
              <td>{projet.nomSociete}</td>
              <td>{projet.email}</td>
              <td>{projet.titreprojet}</td>
              <td>{projet.descriptionprojet}</td>
              <td>{projet.domaineprojet}</td>
              <td>{projet.budget}</td>
              <td>{projet.competencesRequises}</td>
              <td>{projet.datedebut}</td>
              <td>{projet.datefin}</td>
              <td>
                <button 
                  className={styles.editBtn} 
                  onClick={() => handleValidation(projet)}
                >
                  Postuler
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


export default ListeProjetsFreelance
