import {React, useState, useEffect} from 'react';
import styles from './startupOffres.module.css';
import { getOffers, createOffer, updateOffer, deleteOffer } from '../../../../Services/userService';

const StartupOffres = () => {
  const [formData, setFormData] = useState({
    titre: '',
    societe: '', 
    description: '',
    localisation: '', 
    salaire: '',
    deadline: ''
  });

  const [offers, setOffers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setIsLoading(true);
    try {
      const data = await getOffers();
      setOffers(data);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.titre.trim()) newErrors.titre = 'Titre obligatoire';
    if (!formData.societe.trim()) newErrors.societe = 'Nom de la société est obligatoire';
    if (!formData.description.trim()) newErrors.description = 'Description est obligatoire';
    if (!formData.localisation.trim()) newErrors.localisation = 'Localisation est obligatoire';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (editingId) {
        await updateOffer(editingId, formData);
        alert("Offre mise à jour avec succès!");
      } else {
        await createOffer(formData);
        alert("Offre ajoutée avec succès!");
      }
      await fetchOffers();
      resetForm();
    } catch (error) {
      console.error("Error saving offer:", error);
      alert("Erreur lors de la sauvegarde de l'offre");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (offer) => {
    setFormData({
      titre: offer.titre,
      societe: offer.societe,
      description: offer.description,
      localisation: offer.localisation,
      salaire: offer.salaire || "",
      deadline: offer.deadline ? offer.deadline.split("T")[0] : "",
    });
    setEditingId(offer.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette offre?")) return;

    setIsLoading(true);
    try {
      await deleteOffer(id);
      alert("Offre supprimée avec succès!");
      await fetchOffers();
      if (editingId === id) resetForm();
    } catch (error) {
      console.error("Error deleting offer:", error);
      alert("Erreur lors de la suppression de l'offre");
    } finally {
      setIsLoading(false);
    }
  };

  
  const resetForm = () => {
    setFormData({
      titre: "",
      societe: "",
      description: "",
      localisation: "",
      salaire: "",
      deadline: "",
    });
    setEditingId(null);
  };

  return (
    <div className={styles.globalContainer}>
    <div className={styles.jobFormContainer}>
    <h2>{editingId ? "Modifier une offre" : "Ajouter une offre"}</h2>
    <form onSubmit={handleSubmit} className={styles.jobForm}>
      <div className={styles.formGroup}>
        <label>Titre*</label>
        <input
          type="text"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          className={errors.titre ? styles.error : ""}
          disabled={isLoading}
        />
        {errors.titre && <span className={styles.errorMessage}>{errors.titre}</span>}
      </div>

      <div className={styles.formGroup}>
        <label>Société*</label>
        <input
          type="text"
          name="societe"
          value={formData.societe}
          onChange={handleChange}
          className={errors.societe ? styles.error : ""}
          disabled={isLoading}
        />
        {errors.societe && <span className={styles.errorMessage}>{errors.societe}</span>}
      </div>

      <div className={styles.formGroup}>
        <label>Description*</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? styles.error : ""}
          rows="4"
          disabled={isLoading}
        />
        {errors.description && <span className={styles.errorMessage}>{errors.description}</span>}
      </div>

      <div className={styles.formGroup}>
        <label>Localisation*</label>
        <input
          type="text"
          name="localisation"
          value={formData.localisation}
          onChange={handleChange}
          className={errors.localisation ? styles.error : ""}
          disabled={isLoading}
        />
        {errors.localisation && <span className={styles.errorMessage}>{errors.localisation}</span>}
      </div>

      <div className={styles.formGroup}>
        <label>Salaire (optional)</label>
        <input
          type="text"
          name="salaire"
          value={formData.salaire}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Deadline d'offre (optional)</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className={styles.formActions}>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isLoading}
        >
          {isLoading ? "En cours..." : editingId ? "Mettre à jour" : "Ajouter"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className={styles.cancelBtn}
            disabled={isLoading}
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  </div>
  
    <div className={styles.offersList}>
      <h3>Liste des offres</h3>
      {isLoading && offers.length === 0 ? (
        <p>Chargement en cours...</p>
      ) : offers.length === 0 ? (
        <p>Aucune offre disponible</p>
      ) : (
        <ul>
          {offers.map((offer) => (
            <li key={offer.id} className={styles.offerItem}>
              <div className={styles.offerInfo}>
                <h4>
                  {offer.titre} - {offer.societe}
                </h4>
                <p>
                  <strong>Localisation:</strong> {offer.localisation}
                </p>
                <p>
                  <strong>Description:</strong> {offer.description.substring(0, 100)}...
                </p>
                {offer.salaire && (
                  <p>
                    <strong>Salaire:</strong> {offer.salaire}
                  </p>
                )}
                {offer.deadline && (
                  <p>
                    <strong>Deadline:</strong> {new Date(offer.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className={styles.offerActions}>
                <button
                  onClick={() => handleEdit(offer)}
                  className={styles.editBtn}
                  disabled={isLoading}
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(offer.id)}
                  className={styles.deleteBtn}
                  disabled={isLoading}
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
};

export default StartupOffres

