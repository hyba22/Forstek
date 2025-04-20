import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOffers } from '../../Services/userService'; 
import styles from './offreliste.module.css'; 

const OffreDispo = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [currentOfferId, setCurrentOfferId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching offers...');
        const data = await getOffers(); 
        console.log('Received offers data:', data);
        setOffers(data || []);
      } catch (error) {
        console.error('Error fetching offers:', error);
        setError(error.message || 'Erreur lors du chargement des offres');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleFileChange = (e, offerId) => {
    setSelectedFile(e.target.files[0]);
    setCurrentOfferId(offerId);
  };

  const handleUpload = async () => {
    if (!selectedFile || !currentOfferId) {
      alert('Veuillez sélectionner un fichier');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Veuillez vous connecter');
      navigate('/');
      return;
    }

    const formData = new FormData();
    formData.append('resume', selectedFile);
    formData.append('offerId', currentOfferId);

    setUploading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/candidatures`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('CV envoyé avec succès!');
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert(`Erreur lors de l'envoi du CV: ${error.response?.data?.message || error.message}`);
    } finally {
      setUploading(false);
      setSelectedFile(null);
      setCurrentOfferId(null);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Chargement en cours...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.body}>
      <h1 className={styles.modernTitle}>Liste des Offres</h1>
      <table className={styles.modernTable}>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Société</th>
            <th>Description</th>
            <th>Localisation</th>
            <th>Salaire</th>
            <th>Deadline</th>
            <th>Postuler</th>
          </tr>
        </thead>
        <tbody>
          {offers.length > 0 ? (
            offers.map(offer => (
              <tr key={offer.id}>
                <td>{offer.titre}</td>
                <td>{offer.societe}</td>
                <td className={styles.descriptionCell}>
                  {offer.description.length > 100 
                    ? `${offer.description.substring(0, 100)}...` 
                    : offer.description}
                </td>
                <td>{offer.localisation}</td>
                <td>{offer.salaire || 'Non spécifié'}</td>
                <td>{offer.deadline ? new Date(offer.deadline).toLocaleDateString() : 'Non spécifiée'}</td>
                <td>
                  <div className={styles.uploadContainer}>
                    <input
                      type="file"
                      id={`file-upload-${offer.id}`}
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, offer.id)}
                      className={styles.fileInput}
                    />
                    <label htmlFor={`file-upload-${offer.id}`} className={styles.uploadButton}>
                      {selectedFile && currentOfferId === offer.id ? selectedFile.name : 'Choisir CV'}
                    </label>
                    {selectedFile && currentOfferId === offer.id && (
                      <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className={styles.sendButton}
                      >
                        {uploading ? 'Envoi en cours...' : 'Envoyer'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Aucune offre disponible</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OffreDispo;