import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProjetsFreelance } from '../../../../Services/userService';
import styles from './projetsFreelance.module.css';

const ListeProjetsFreelance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const newProjet = location.state?.formData;
  const handleValidation = (projet) => {
    navigate('/profile/freelance/listeProjetsFreelance', {
      state: {
        action: 'validate',
        validatedProjet: projet
      }
    });
    alert("Vous avez postulé à ce poste!");
  };
  useEffect(() => {
    const fetchProjets = async () => {
      try {
        setLoading(true);
        const data = await getProjetsFreelance();
        setProjets(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur lors du chargement des projets:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjets();
  }, []);

  useEffect(() => {
    if (newProjet) {
      setProjets(prevProjets => [...prevProjets, newProjet]);
    }
  }, [newProjet]);

  if (loading) {
    return <div className={styles.loading}>Chargement en cours...</div>;
  }

  if (error) {
    return <div className={styles.error}>Erreur: {error}</div>;
  }

  return (
    <div className={styles.body}>
      <h1 className={styles.modernTitle}>Liste des Projets Freelance</h1>
      <table className={styles.modernTable}>
        <thead>
          <tr>
            <th>Société</th>
            <th>Email</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Domaine</th>
            <th>Budget</th>
            <th>Compétences</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projets.length > 0 ? (
            projets.map((projet, index) => (
              <tr key={index}>
                <td>{projet.nomSociete || '-'}</td>
                <td>{projet.email || '-'}</td>
                <td>{projet.titreprojet || '-'}</td>
                <td className={styles.descriptionCell}>
                  {projet.descriptionprojet 
                    ? (projet.descriptionprojet.length > 100 
                        ? `${projet.descriptionprojet.substring(0, 100)}...` 
                        : projet.descriptionprojet)
                    : '-'}
                </td>
                <td>{projet.domaineprojet || '-'}</td>
                <td>{projet.budget || '-'}</td>
                <td className={styles.descriptionCell}>
                  {projet.competencesRequises 
                    ? (projet.competencesRequises.length > 50
                        ? `${projet.competencesRequises.substring(0, 50)}...`
                        : projet.competencesRequises)
                    : '-'}
                </td>
                <td>{projet.datedebut || '-'}</td>
                <td>{projet.datefin || '-'}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button 
                      className={styles.validateBtn}
                      onClick={() => handleValidation(projet)}
                    >
                      Postuler
                    </button>
               </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">Aucun projet disponible</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListeProjetsFreelance;