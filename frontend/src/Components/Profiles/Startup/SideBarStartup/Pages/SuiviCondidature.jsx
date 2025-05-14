import React, { useState, useEffect } from 'react';
import styles from './suiviCondidature.module.css';
import { getAllDemandes, updateDemandeStatus } from '../../../../Services/userService';
import cvIconImage from '/src/assets/cv.png';

const formatStatus = (statut) => {
  const statusMap = {
    EN_ATTENTE: 'En attente',
    EN_COURS: 'En cours',
    ACCEPTEE: 'Acceptée',
    REFUSEE: 'Refusée',
  };
  return statusMap[statut] || statut;
};

const SuiviCondidature = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        console.log('Starting fetchDemandes...');
        const data = await getAllDemandes();
        console.log('Fetched demandes:', data);
        setDemandes(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error details:', err.response?.data || err.message);
        setError('Erreur lors du chargement des demandes');
        setLoading(false);
      }
    };
    fetchDemandes();
  }, []);

  const handleStatusChange = async (id, statut) => {
    try {
      console.log(`Attempting to update status for demande ${id} to ${statut}`);
      const updatedDemande = await updateDemandeStatus(id, statut);
      console.log('Status updated:', updatedDemande);
      setDemandes((prev) =>
        prev.map((demande) =>
          demande.id === id ? { ...demande, statut: updatedDemande.statut } : demande
        )
      );
      setError(null);
    } catch (err) {
      console.error('Status update error:', err.response?.data || err.message);
      setError(`Erreur lors de la mise à jour du statut : ${err.response?.data?.message || err.message}`);
    }
  };

  const downloadCv = async (cvUrl) => {
    console.log('Attempting to download CV from:', cvUrl);
    if (!cvUrl) {
      console.error('No CV URL available.');
      return;
    }

    const fullUrl = cvUrl.startsWith('http') ? cvUrl : `http://localhost:3000/api/uploads/${cvUrl}`;
    try {
      const response = await fetch(fullUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch CV: ${response.status} ${response.statusText}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fullUrl.split('/').pop() || 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      console.log('Download completed successfully');
    } catch (err) {
      console.error('Download error:', err.message);
      alert(`Erreur lors du téléchargement du CV : ${err.message}`);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.body}>
      <h1 className={styles.modernTitle}>Suivi des candidatures</h1>
      <table className={styles.modernTable}>
        <thead>
          <tr>
            <th>Nom de société</th>
            <th>Nom du candidat</th>
            <th>Poste</th>
            <th>Date de demande</th>
            <th>État</th>
            <th>CV</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {demandes.length > 0 ? (
            demandes.map((demande) => (
              <tr key={demande.id}>
                <td>{demande.offre?.societe || 'N/A'}</td>
                <td>{demande.name || 'N/A'}</td>
                <td>{demande.offre?.titre || 'N/A'}</td>
                <td>
                  {demande.dateDemande
                    ? new Date(demande.dateDemande).toLocaleDateString('fr-FR')
                    : 'N/A'}
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[demande.statut]}`}>
                    {formatStatus(demande.statut)}
                  </span>
                </td>
                <td>
                  {demande.cv ? (
                    <img
                      src={cvIconImage}
                      alt="Télécharger CV"
                      className={styles.cvIcon}
                      onClick={() => downloadCv(demande.cv)}
                      style={{ cursor: 'pointer' }}
                      title="Télécharger le CV"
                    />
                  ) : (
                    <span className={styles.noCv}>Aucun CV</span>
                  )}
                </td>
                <td>
                  <button
                    className={`${styles.backButton} ${styles.acceptButton}`}
                    onClick={() => handleStatusChange(demande.id, 'ACCEPTEE')}
                    disabled={demande.statut === 'ACCEPTEE'}
                  >
                    Accepter
                  </button>
                  <button
                    className={`${styles.backButton} ${styles.declineButton}`}
                    onClick={() => handleStatusChange(demande.id, 'REFUSEE')}
                    disabled={demande.statut === 'REFUSEE'}
                  >
                    Refuser
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Aucune demande trouvée</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SuiviCondidature;