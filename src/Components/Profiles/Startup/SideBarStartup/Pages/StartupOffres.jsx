import {React, useState} from 'react';
import styles from './startupOffres.module.css';

const StartupOffres = () => {
  const [formData, setFormData] = useState({
    titre: '',
    societe: '', 
    description: '',
    localisation: '',
    salaire: '',
    deadline: ''
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Offre est ajoutée avec succès!');
      setFormData({
        titre: '',
        societe: '',
        description: '',
        localisation: '',
        salaire: '',
        deadline: ''
      });
    }
  };

  return (
    <div className={styles.jobFormContainer}>
      <h2>Ajouter une offre</h2>
      <form onSubmit={handleSubmit} className={styles.jobForm}>
        <div className={styles.formGroup}>
          <label>Titre*</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            className={errors.titre ? styles.error : ''}
          />
          {errors.titre && <span className={styles.errorMessage}>{errors.titre}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Socièté*</label>
          <input
            type="text"
            name="societe"
            value={formData.societe}
            onChange={handleChange}
            className={errors.societe ? styles.error : ''}
          />
          {errors.societe && <span className={styles.errorMessage}>{errors.societe}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? styles.error : ''}
            rows="4"
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
            className={errors.localisation ? styles.error : ''}
          />
          {errors.localisation && <span className={styles.errorMessage}>{errors.location}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Salaire (optional)</label>
          <input
            type="text"
            name="salaire"
            value={formData.salaire}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Deadline d'offre (optional)</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          Ajouter
        </button>
      </form>
    </div>
  );
};
export default StartupOffres

