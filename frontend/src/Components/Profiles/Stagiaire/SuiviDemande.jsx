// SuiviDemande.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './suiviDemande.module.css';
import { getDemandesWithOffers } from '../../Services/userService';

const SuiviDemande = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Starting data fetch...');
        const data = await getDemandesWithOffers();
        console.log('Received data:', data);
        setDemandes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Detailed fetch error:', err);
        let errorMessage = 'Failed to fetch demandes. Please try again later.';
        try {
          const errorData = JSON.parse(err.message);
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          console.error('Error parsing error message:', parseError);
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatStatus = (status) => {
    return status
      .replace('_', ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (loading) {
    return <div className={styles.loading}>Chargement en cours...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.body}>
      <h1 className={styles.modernTitle}>Suivi de demande</h1>
      <table className={styles.modernTable}>
        <thead>
          <tr>
            <th>Nom de société</th>
            <th>Poste</th>
            <th>Date de demande</th>
            <th>État</th>
          </tr>
        </thead>
        <tbody>
          {demandes.length > 0 ? (
            demandes.map((demande) => (
              <tr key={demande.id}>
                <td>{demande.offre?.societe || 'N/A'}</td>
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Aucune demande trouvée</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SuiviDemande;