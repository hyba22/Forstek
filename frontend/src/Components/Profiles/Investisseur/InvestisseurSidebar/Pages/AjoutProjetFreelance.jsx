import React, { useState, useEffect } from 'react';
import styles from './ajoutProjetFreelance.module.css';
import { 
  getProjetsFreelance, 
  createProjetFreelance, 
  updateProjetFreelance, 
  deleteProjetFreelance 
} from '../../../../Services/userService';

const AjoutProjetFreelance = () => {
  const [formData, setFormData] = useState({
    nomSociete: '',
    email: '',
    titreprojet: '',
    descriptionprojet: '',
    domaineprojet: '',
    budget: '',
    competencesRequises: '',
    datedebut: '',
    datefin: '',
    isActive: true
  });

  const [projets, setProjets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProjets();
  }, []);

  const fetchProjets = async () => {
    setIsLoading(true);
    try {
      const data = await getProjetsFreelance();
      setProjets(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      alert("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
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
    if (!formData.nomSociete.trim()) newErrors.nomSociete = 'Champs obligatoire';
    if (!formData.email.trim()) newErrors.email = 'Champs obligatoire';
    if (!formData.titreprojet.trim()) newErrors.titreprojet = 'Champs obligatoire';
    if (!formData.descriptionprojet.trim()) newErrors.descriptionprojet = 'Champs obligatoire';
    if (!formData.domaineprojet.trim()) newErrors.domaineprojet = 'Champs obligatoire';
    if (!formData.budget) newErrors.budget = 'Champs obligatoire';
    if (!formData.competencesRequises.trim()) newErrors.competencesRequises = 'Champs obligatoire';
    if (!formData.datedebut) newErrors.datedebut = 'Champs obligatoire';
    if (!formData.datefin) newErrors.datefin = 'Champs obligatoire';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (editingId) {
        await updateProjetFreelance(editingId, formData);
        setSuccessMessage('Le projet est à jour!');
      } else {
        await createProjetFreelance(formData);
        setSuccessMessage('Projet créé avec succès!');
      }
      await fetchProjets();
      resetForm();
    } catch (error) {
      console.error("Erreur lors d'enregistrement:", error);
      alert("Erreur, le projet n'est pas enregistré");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleEdit = (projet) => {
    setFormData({
      nomSociete: projet.nomSociete,
      email: projet.email,
      titreprojet: projet.titreprojet,
      descriptionprojet: projet.descriptionprojet,
      domaineprojet: projet.domaineprojet,
      budget: projet.budget,
      competencesRequises: projet.competencesRequises,
      datedebut: projet.datedebut.split('T')[0],
      datefin: projet.datefin.split('T')[0],
      isActive: projet.isActive
    });
    setEditingId(projet.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Etes vous sur de supprimer le projet?")) return;

    setIsLoading(true);
    try {
      await deleteProjetFreelance(id);
      setSuccessMessage('Projet supprimé avec succès!');
      await fetchProjets();
      if (editingId === id) resetForm();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur, le projet n'est pas supprimé");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      nomSociete: '',
      email: '',
      titreprojet: '',
      descriptionprojet: '',
      domaineprojet: '',
      budget: '',
      competencesRequises: '',
      datedebut: '',
      datefin: '',
      isActive: true
    });
    setEditingId(null);
  };

  return (
    <div className={styles.globalContainer}>
      <div className={styles.jobFormContainer}>
        <h2>{editingId ? "Modifier projet" : "Ajouter un nouveau Projet"}</h2>
        
        {successMessage && (
          <div className={styles.successMessage}>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.jobForm}>
          <div className={styles.formGroup}>
            <label>Nom du société*</label>
            <input
              type="text"
              name="nomSociete"
              value={formData.nomSociete}
              onChange={handleChange}
              className={errors.nomSociete ? styles.error : ""}
              disabled={isLoading}
            />
            {errors.nomSociete && <span className={styles.errorMessage}>{errors.nomSociete}</span>}
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
            <label>Titre du projet*</label>
            <input
              type="text"
              name="titreprojet"
              value={formData.titreprojet}
              onChange={handleChange}
              className={errors.titreprojet ? styles.error : ""}
              disabled={isLoading}
            />
            {errors.titreprojet && <span className={styles.errorMessage}>{errors.titreprojet}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Description*</label>
            <textarea
              name="descriptionprojet"
              value={formData.descriptionprojet}
              onChange={handleChange}
              className={errors.descriptionprojet ? styles.error : ""}
              rows="4"
              disabled={isLoading}
            />
            {errors.descriptionprojet && <span className={styles.errorMessage}>{errors.descriptionprojet}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Domaine</label>
            <input
              type="text"
              name="domaineprojet"
              value={formData.domaineprojet}
              onChange={handleChange}
              className={errors.domaineprojet ? styles.error : ""}
              disabled={isLoading}
            />
            {errors.domaineprojet && <span className={styles.errorMessage}>{errors.domaineprojet}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Budget*</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={errors.budget ? styles.error : ""}
              disabled={isLoading}
            />
            {errors.budget && <span className={styles.errorMessage}>{errors.budget}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Compétences requises*</label>
            <textarea
              name="competencesRequises"
              value={formData.competencesRequises}
              onChange={handleChange}
              className={errors.competencesRequises ? styles.error : ""}
              rows="3"
              disabled={isLoading}
            />
            {errors.competencesRequises && <span className={styles.errorMessage}>{errors.competencesRequises}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Date du début*</label>
            <input
              type="date"
              name="datedebut"
              value={formData.datedebut}
              onChange={handleChange}
              className={errors.datedebut ? styles.error : ""}
              disabled={isLoading}
            />
            {errors.datedebut && <span className={styles.errorMessage}>{errors.datedebut}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Date du fin*</label>
            <input
              type="date"
              name="datefin"
              value={formData.datefin}
              onChange={handleChange}
              className={errors.datefin ? styles.error : ""}
              disabled={isLoading}
            />
            {errors.datefin && <span className={styles.errorMessage}>{errors.datefin}</span>}
          </div>

          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? "Enregistrement..." : editingId ? "Modifier" : "Ajouter "}
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

      <div className={styles.projectsList}>
        <h3>Liste des projets</h3>
        {isLoading && projets.length === 0 ? (
          <p>Chargement des projets...</p>
        ) : projets.length === 0 ? (
          <p>Pas de projets</p>
        ) : (
          <div className={styles.projectsGrid}>
            {projets.map((projet) => (
              <div key={projet.id} className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h4>{projet.titreprojet}</h4>
                  <span className={projet.isActive ? styles.activeBadge : styles.inactiveBadge}>
                    {projet.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p><strong>Société:</strong> {projet.nomSociete}</p>
                <p><strong>Email:</strong> {projet.email}</p>
                <p><strong>Domaine:</strong> {projet.domaineprojet}</p>
                <p><strong>Budget:</strong> {projet.budget}DT</p>
                <p><strong>Dates:</strong> {new Date(projet.datedebut).toLocaleDateString()} - {new Date(projet.datefin).toLocaleDateString()}</p>
                <div className={styles.projectActions}>
                  <button
                    onClick={() => handleEdit(projet)}
                    className={styles.editBtn}
                    disabled={isLoading}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(projet.id)}
                    className={styles.deleteBtn}
                    disabled={isLoading}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AjoutProjetFreelance;