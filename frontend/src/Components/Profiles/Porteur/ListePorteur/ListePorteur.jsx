import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteDeposeProjet, getProjets } from '../../../Services/userService';
import styles from './ListePorteur.module.css';

const ListePorteur = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [projets, setProjets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [validatedProjetId, setValidatedProjetId] = useState(null);
  const [refusedProjetId, setRefusedProjetId] = useState(null);

  useEffect(() => {
    if (location.state?.action === 'validate' && location.state.validatedProjet?.iddeposeprojet) {
      setValidatedProjetId(location.state.validatedProjet.iddeposeprojet);
      setRefusedProjetId(null);
    }

    if (location.state?.action === 'refuse' && location.state.refusedProjet?.iddeposeprojet) {
      setRefusedProjetId(location.state.refusedProjet.iddeposeprojet);
      setValidatedProjetId(null);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchProjets = async () => {
      setIsLoading(true);
      try {
        const data = await getProjets();
        setProjets(data);
        localStorage.setItem('userProjects', JSON.stringify(data));
      } catch (error) {
        console.error("Erreur de chargement des projets:", error);
        const savedData = localStorage.getItem('userProjects');
        if (savedData) {
          setProjets(JSON.parse(savedData));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjets();
  }, []);

  const handleEdit = (projet) => {
    navigate('/profile/porteur/depose-projet', { 
      state: { 
        projetToEdit: {
          iddeposeprojet: projet.iddeposeprojet,
          nomporteur: projet.nomporteur,
          email: projet.email,
          titreprojet: projet.titreprojet,
          descriptionprojet: projet.descriptionprojet,
          domaineprojet: projet.domaineprojet,
          budget: projet.budget,
          moyens: projet.moyens,
          datedebut: projet.datedebut,
          datefin: projet.datefin
        },
        isEditing: true 
      } 
    });
  };

  const handleDelete = async (iddeposeprojet) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet?")) return;

    setIsLoading(true);
    try {
      await deleteDeposeProjet(iddeposeprojet);
      setProjets(prev => {
        const newProjets = prev.filter(p => p.iddeposeprojet !== iddeposeprojet);
        localStorage.setItem('userProjects', JSON.stringify(newProjets));
        return newProjets;
      });
      
      if (validatedProjetId === iddeposeprojet) {
        setValidatedProjetId(null);
      }
      if (refusedProjetId === iddeposeprojet) {
        setRefusedProjetId(null);
      }
    } catch (error) {
      console.error("Error deleting projet:", error);
      alert("Erreur lors de la suppression de projet");
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidatedClick = () => {
    navigate('/rendv'); 
  };

  return (
    <div className={styles.dataTableContainer}>
      <h2>Projets soumis</h2>
      {isLoading && <div className={styles.loading}>Chargement...</div>}
      
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Nom de porteur</th>
            <th>Email</th>
            <th>Titre de projet</th>
            <th>Description</th>
            <th>Domaine</th>
            <th>Budget</th>
            <th>Moyens</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projets.length > 0 ? (
            projets.map((projet) => (
              <tr key={projet.iddeposeprojet}>
                <td>{projet.nomporteur || '-'}</td>
                <td>{projet.email || '-'}</td>
                <td>{projet.titreprojet || '-'}</td>
                <td>{projet.descriptionprojet || '-'}</td>
                <td>{projet.domaineprojet || '-'}</td>
                <td>{projet.budget || '-'}</td>
                <td>{projet.moyens || '-'}</td>
                <td>{projet.datedebut || '-'}</td>
                <td>{projet.datefin || '-'}</td>
                <td>
                  <button 
                    className={styles.actionButton}
                    onClick={() => handleEdit(projet)}
                    disabled={isLoading}
                  >
                    Modifier
                  </button>
                  <button 
                    className={styles.actionButton1}
                    onClick={() => handleDelete(projet.iddeposeprojet)}
                    disabled={isLoading}
                  >
                    Supprimer
                  </button>
                </td>
                <td>
                  {validatedProjetId === projet.iddeposeprojet && (
                    <button 
                      className={styles.validatedButton}
                      onClick={handleValidatedClick}
                    >
                      Validé
                    </button>
                  )}
                  {refusedProjetId === projet.iddeposeprojet && (
                    <button className={styles.refusedButton} disabled>
                      Refusé
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" style={{ textAlign: 'center' }}>
                {isLoading ? 'Chargement...' : 'Aucun projet soumis pour le moment'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListePorteur;