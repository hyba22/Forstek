import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { createDeposeProjet, updateDeposeProjet } from "../../../Services/userService";
import styles from './DeposeProjet.module.css';

const DeposeProjet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { projetToEdit, isEditing } = location.state || {};
  
  const [formData, setFormData] = useState({
    nomporteur: "",
    email: "",
    titreprojet: "",
    descriptionprojet: "",
    domaineprojet: "",
    budget: "",
    moyens: "",
    datedebut: "",
    datefin: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing && projetToEdit) {
      setFormData({
        nomporteur: projetToEdit.nomporteur || "",
        email: projetToEdit.email || "",
        titreprojet: projetToEdit.titreprojet || "",
        descriptionprojet: projetToEdit.descriptionprojet || "",
        domaineprojet: projetToEdit.domaineprojet || "",
        budget: projetToEdit.budget || "",
        moyens: projetToEdit.moyens || "",
        datedebut: formatDateForInput(projetToEdit.datedebut),
        datefin: formatDateForInput(projetToEdit.datefin)
      });
    }
  }, [isEditing, projetToEdit]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (e) {
      console.error("Erreur de formatage de date:", e);
      return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nomporteur.trim()) newErrors.nomporteur = "Le nom du porteur est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    if (!formData.titreprojet.trim()) newErrors.titreprojet = "Le titre du projet est requis";
    if (!formData.descriptionprojet.trim()) newErrors.descriptionprojet = "La description est requise";
    if (!formData.domaineprojet) newErrors.domaineprojet = "Le domaine est requis";
    if (!formData.budget.trim()) newErrors.budget = "Le budget est requis";
    if (!formData.moyens.trim()) newErrors.moyens = "Les moyens sont requis";
    if (!formData.datedebut) newErrors.datedebut = "La date de début est requise";
    if (!formData.datefin) newErrors.datefin = "La date de fin est requise";
    
    if (formData.datedebut && formData.datefin) {
      const startDate = new Date(formData.datedebut);
      const endDate = new Date(formData.datefin);
      if (startDate > endDate) {
        newErrors.datefin = "La date de fin doit être après la date de début";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        budget: String(formData.budget) || 0
      };

      if (isEditing && projetToEdit?.iddeposeprojet) {
        await updateDeposeProjet(projetToEdit.iddeposeprojet, payload);
        alert("Projet mis à jour avec succès!");
      } else {
        await createDeposeProjet(payload);
        alert("Projet ajouté avec succès!");
      }
      navigate('/liste-porteur');
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      alert("Une erreur est survenue: " + (error.message || "Veuillez réessayer"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.globalContainer}>
      <div className={styles.jobFormContainer}>
        <h2>{isEditing ? "Modifier un projet" : "Ajouter un projet"}</h2>
        
        <form onSubmit={handleSubmit} className={styles.jobForm}>
          <div className={styles.formGroup}>
            <label>Nom de porteur *</label>
            <input
              type="text"
              name="nomporteur"
              value={formData.nomporteur}
              onChange={handleChange}
              className={errors.nomporteur ? styles.error : ""}
              disabled={isSubmitting}
            />
            {errors.nomporteur && <span className={styles.errorMessage}>{errors.nomporteur}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.error : ""}
              disabled={isSubmitting}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Titre de projet *</label>
            <input
              type="text"
              name="titreprojet"
              value={formData.titreprojet}
              onChange={handleChange}
              className={errors.titreprojet ? styles.error : ""}
              disabled={isSubmitting}
            />
            {errors.titreprojet && <span className={styles.errorMessage}>{errors.titreprojet}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Description *</label>
            <textarea
              name="descriptionprojet"
              value={formData.descriptionprojet}
              onChange={handleChange}
              className={errors.descriptionprojet ? styles.error : ""}
              rows="4"
              disabled={isSubmitting}
            />
            {errors.descriptionprojet && <span className={styles.errorMessage}>{errors.descriptionprojet}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Domaine *</label>
            <select
              name="domaineprojet"
              value={formData.domaineprojet}
              onChange={handleChange}
              className={errors.domaineprojet ? styles.error : ""}
              disabled={isSubmitting}
            >
              <option value="">Sélectionner un domaine</option>
              <option value="Technologie">Technologie</option>
              <option value="Santé">Santé</option>
              <option value="Éducation">Éducation</option>
              <option value="Environnement">Environnement</option>
              <option value="Autre">Autre</option>
            </select>
            {errors.domaineprojet && <span className={styles.errorMessage}>{errors.domaineprojet}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Budget *</label>
            <input
              type="string"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={errors.budget ? styles.error : ""}
              disabled={isSubmitting}
            />
            {errors.budget && <span className={styles.errorMessage}>{errors.budget}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Moyens *</label>
            <input
              type="text"
              name="moyens"
              value={formData.moyens}
              onChange={handleChange}
              className={errors.moyens ? styles.error : ""}
              disabled={isSubmitting}
            />
            {errors.moyens && <span className={styles.errorMessage}>{errors.moyens}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Date début *</label>
            <input
              type="date"
              name="datedebut"
              value={formData.datedebut}
              onChange={handleChange}
              className={errors.datedebut ? styles.error : ""}
              disabled={isSubmitting}
            />
            {errors.datedebut && <span className={styles.errorMessage}>{errors.datedebut}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Date fin *</label>
            <input
              type="date"
              name="datefin"
              value={formData.datefin}
              onChange={handleChange}
              className={errors.datefin ? styles.error : ""}
              disabled={isSubmitting}
            />
            {errors.datefin && <span className={styles.errorMessage}>{errors.datefin}</span>}
          </div>

          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "En cours..." : isEditing ? "Mettre à jour" : "Ajouter"}
            </button>
            <button
              type="button"
              onClick={() => navigate('/liste-porteur')}
              className={styles.cancelBtn}
              disabled={isSubmitting}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeposeProjet;