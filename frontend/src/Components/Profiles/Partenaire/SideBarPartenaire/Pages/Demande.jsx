import React, { useEffect, useState } from 'react';
import { createDemande, deleteDemande, getDemandes, updateDemande } from '../../../../Services/userService';
import styles from './demande.module.css';

const Demande = () => {
  const [formData, setFormData] = useState({
    nomProjet: '',
    nomPorteur: '',
    email: '',
    description: '',
    secteurActivite: '',
    stadeDeveloppement: '',
    siteWeb: '',
    besoins: '',
    equipe: ''
  });

  const [demandes, setDemandes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    setIsLoading(true);
    try {
      const data = await getDemandes();
      setDemandes(data);
    } catch (error) {
      console.error("Failed to fetch demandes:", error);
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
    if (!formData.nomProjet.trim()) newErrors.nomProjet = 'Nom du projet obligatoire';
    if (!formData.nomPorteur.trim()) newErrors.nomPorteur = 'Nom du porteur obligatoire';
    if (!formData.email.trim()) newErrors.email = 'Email obligatoire';
    if (!formData.description.trim()) newErrors.description = 'Description obligatoire';
    if (!formData.secteurActivite.trim()) newErrors.secteurActivite = 'Secteur obligatoire';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (editingId) {
        await updateDemande(editingId, formData);
        alert("Demande mise à jour avec succès!");
      } else {
        await createDemande(formData);
        alert("Demande ajoutée avec succès!");
      }
      await fetchDemandes();
      resetForm();
    } catch (error) {
      console.error("Error saving demande:", error);
      alert("Erreur lors de la sauvegarde de la demande");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (demande) => {
    setFormData({
      nomProjet: demande.nomProjet,
      nomPorteur: demande.nomPorteur,
      email: demande.email,
      description: demande.description,
      secteurActivite: demande.secteurActivite,
      stadeDeveloppement: demande.stadeDeveloppement || "",
      siteWeb: demande.siteWeb || "",
      besoins: demande.besoins || "",
      equipe: demande.equipe || ""
    });
    setEditingId(demande.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette demande?")) return;

    setIsLoading(true);
    try {
      await deleteDemande(id);
      alert("Demande supprimée avec succès!");
      await fetchDemandes();
      if (editingId === id) resetForm();
    } catch (error) {
      console.error("Error deleting demande:", error);
      alert("Erreur lors de la suppression de la demande");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir ${newStatus === 'Accepté' ? 'accepter' : 'refuser'} cette demande?`)) return;

    setIsLoading(true);
    try {
      const demandeToUpdate = demandes.find(d => d.id === id);
      await updateDemande(id, { ...demandeToUpdate, statut: newStatus });
      alert(`Demande ${newStatus === 'Accepté' ? 'acceptée' : 'refusée'} avec succès!`);
      await fetchDemandes();
    } catch (error) {
      console.error(`Error ${newStatus === 'Accepté' ? 'accepting' : 'rejecting'} demande:`, error);
      alert(`Erreur lors de ${newStatus === 'Accepté' ? "l'acceptation" : 'du refus'} de la demande`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nomProjet: "",
      nomPorteur: "",
      email: "",
      description: "",
      secteurActivite: "",
      stadeDeveloppement: "",
      siteWeb: "",
      besoins: "",
      equipe: ""
    });
    setEditingId(null);
  };

  return (
    <div className={styles.globalContainer}>
      <div className={styles.demandeFormContainer}>
        <h2>{editingId ? "Modifier une demande" : "Ajouter une demande"}</h2>
        <form onSubmit={handleSubmit} className={styles.demandeForm}>
          <div className={styles.formGroup}>
            <label>Nom du projet*</label>
            <input
              type="text"
              name="nomProjet"
              value={formData.nomProjet}
              onChange={handleChange}
              className={errors.nomProjet ? styles.error : ""}
              disabled={isLoading}
            />
            {errors.nomProjet && <span className={styles.errorMessage}>{errors.nomProjet}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Nom du porteur*</label>
            <input
              type="text"
              name="nomPorteur"
              value={formData.nomPorteur}
              onChange={handleChange}
              className={errors.nomPorteur ? styles.error : ""}
              disabled={isLoading}
            />
            {errors.nomPorteur && <span className={styles.errorMessage}>{errors.nomPorteur}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.error : ""}
              disabled={isLoading}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
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
            <label>Secteur d'activité*</label>
            <input
              type="text"
              name="secteurActivite"
              value={formData.secteurActivite}
              onChange={handleChange}
              className={errors.secteurActivite ? styles.error : ""}
              disabled={isLoading}
            />
            {errors.secteurActivite && <span className={styles.errorMessage}>{errors.secteurActivite}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Stade de développement</label>
            <select
              name="stadeDeveloppement"
              value={formData.stadeDeveloppement}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="">Sélectionner...</option>
              <option value="Idée">Idée</option>
              <option value="Prototype">Prototype</option>
              <option value="MVP">MVP</option>
              <option value="Commercialisation">Commercialisation</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Site web</label>
            <input
              type="url"
              name="siteWeb"
              value={formData.siteWeb}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="https://example.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Besoins</label>
            <textarea
              name="besoins"
              value={formData.besoins}
              onChange={handleChange}
              rows="3"
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Équipe</label>
            <textarea
              name="equipe"
              value={formData.equipe}
              onChange={handleChange}
              rows="2"
              disabled={isLoading}
              placeholder="Membres de l'équipe et leurs rôles"
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
      
      <div className={styles.demandesList}>
        <h3>Liste des demandes</h3>
        {isLoading && demandes.length === 0 ? (
          <p>Chargement en cours...</p>
        ) : demandes.length === 0 ? (
          <p>Aucune demande disponible</p>
        ) : (
          <ul>
            {demandes.map((demande) => (
              <li key={demande.id} className={styles.demandeItem}>
                <div className={styles.demandeInfo}>
                  <h4>
                    {demande.nomProjet} - {demande.nomPorteur}
                    <span className={styles.statusBadge} data-status={demande.statut}>
                      {demande.statut}
                    </span>
                  </h4>
                  <p><strong>Email:</strong> {demande.email}</p>
                  <p><strong>Secteur:</strong> {demande.secteurActivite}</p>
                  <p><strong>Stade:</strong> {demande.stadeDeveloppement}</p>
                  <p>
                    <strong>Description:</strong> {demande.description.substring(0, 100)}...
                  </p>
                  {demande.siteWeb && (
                    <p>
                      <strong>Site web:</strong> 
                      <a href={demande.siteWeb} target="_blank" rel="noopener noreferrer">
                        {demande.siteWeb}
                      </a>
                    </p>
                  )}
                  {demande.besoins && (
                    <p>
                      <strong>Besoins:</strong> {demande.besoins.substring(0, 50)}...
                    </p>
                  )}
                  {demande.equipe && (
                    <p>
                      <strong>Équipe:</strong> {demande.equipe.substring(0, 50)}...
                    </p>
                  )}
                  <p className={styles.dateInfo}>
                    Créée le: {new Date(demande.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className={styles.demandeActions}>
                  <button
                    onClick={() => handleEdit(demande)}
                    className={styles.editBtn}
                    disabled={isLoading}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(demande.id)}
                    className={styles.deleteBtn}
                    disabled={isLoading}
                  >
                    Supprimer
                  </button>
                  {demande.statut !== 'Accepté' && (
                    <button
                      onClick={() => handleStatusChange(demande.id, 'Accepté')}
                      className={styles.acceptBtn}
                      disabled={isLoading}
                    >
                      Accepter
                    </button>
                  )}
                  {demande.statut !== 'Refusé' && (
                    <button
                      onClick={() => handleStatusChange(demande.id, 'Refusé')}
                      className={styles.rejectBtn}
                      disabled={isLoading}
                    >
                      Refuser
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Demande;