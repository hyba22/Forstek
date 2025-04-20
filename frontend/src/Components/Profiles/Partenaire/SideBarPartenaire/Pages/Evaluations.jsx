import React, { useEffect, useState } from 'react';
import { FiEdit2, FiRefreshCw, FiSend, FiStar, FiTrash2 } from 'react-icons/fi';
import {
  createEvaluation,
  deleteEvaluation,
  getDemandes,
  getEvaluations,
  updateEvaluation
} from '../../../../Services/userService';
import styles from './evaluationProjet.module.css';

const Evaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [partners, setPartners] = useState([]);
  const [formData, setFormData] = useState({
    projectId: '',
    partnerId: '', 
    comments: '',
    innovationStars: 3,
    marketPotentialStars: 3,
    teamStars: 3,
    feasibilityStars: 3,
    overallStars: 3,
    date: new Date().toISOString().split('T')[0]
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const loadDemandes = async () => {
    try {
      const response = await getDemandes();
      if (!response) throw new Error('Aucune réponse du serveur');
      
      const data = response.data || response;
      const formattedData = Array.isArray(data) ? data : [data];
      
      // Extraire les projets
      const projectsList = formattedData.map(demande => ({
        projectId: demande._id || demande.id,
        projectName: demande.name || `Projet ${demande._id || demande.id}`
      }));
      
      return { projects: projectsList, partners: [] }; 
    } catch (err) {
      console.error('Erreur chargement demandes:', err);
      setError(err.message || "Erreur lors du chargement des demandes.");
      return { projects: [], partners: [] };
    }
  };

  const loadEvaluations = async () => {
    try {
      const response = await getEvaluations();
      if (!response) throw new Error('Aucune réponse du serveur');
      
      const data = response.data || response;
      return Array.isArray(data) ? data : [data];
    } catch (err) {
      console.error('Erreur chargement évaluations:', err);
      setError(err.message || "Erreur lors du chargement des évaluations.");
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [demandesData, evaluationsData] = await Promise.all([
          loadDemandes(),
          loadEvaluations()
        ]);
        
        setProjects(demandesData.projects);
        setEvaluations(evaluationsData);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement des données.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Stars') ? parseInt(value, 10) : value
    }));
  };

  const handleStarChange = (name, value) => {
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name !== 'overallStars') {
        const avg = Math.round((
          updated.innovationStars +
          updated.marketPotentialStars +
          updated.teamStars +
          updated.feasibilityStars
        ) / 4);
        updated.overallStars = avg;
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (!formData.projectId) throw new Error('Veuillez sélectionner un projet');
      if (!formData.partnerId) throw new Error('Veuillez saisir l\'ID de l\'évaluateur');

      const payload = {
        ...formData,
        score: formData.overallStars * 20,
        partnerName: formData.partnerId 
      };

      let response;
      if (editingId) {
        response = await updateEvaluation(editingId, payload);
      } else {
        response = await createEvaluation(payload);
      }

      if (!response) {
        throw new Error('Pas de réponse du serveur');
      }

      const result = response.data || response;
      if (!result) {
        throw new Error('Données manquantes dans la réponse');
      }

      setSuccessMessage(`Évaluation ${editingId ? 'mise à jour' : 'ajoutée'} avec succès !`);
      
      if (editingId) {
        setEvaluations(prev => prev.map(item => 
          (item._id || item.id) === editingId ? result : item
        ));
      } else {
        setEvaluations(prev => [...prev, result]);
      }
      
      resetForm();
    } catch (err) {
      console.error('Erreur soumission:', err);
      setError(err.response?.data?.message || err.message || "Erreur lors de l'envoi des données.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      projectId: item.projectId,
      partnerId: item.partnerId || '',
      comments: item.comments || '',
      innovationStars: item.innovationStars || 3,
      marketPotentialStars: item.marketPotentialStars || 3,
      teamStars: item.teamStars || 3,
      feasibilityStars: item.feasibilityStars || 3,
      overallStars: item.overallStars || 3,
      date: item.date ? item.date.split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setEditingId(item._id || item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette évaluation ?")) return;
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    try {
      await deleteEvaluation(id);
      setEvaluations(prev => prev.filter(item => (item._id || item.id) !== id));
      setSuccessMessage("Évaluation supprimée avec succès !");
    } catch (err) {
      console.error('Erreur suppression:', err);
      setError(err.response?.data?.message || err.message || "Erreur lors de la suppression.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      projectId: '',
      partnerId: '',
      comments: '',
      innovationStars: 3,
      marketPotentialStars: 3,
      teamStars: 3,
      feasibilityStars: 3,
      overallStars: 3,
      date: new Date().toISOString().split('T')[0]
    });
    setEditingId(null);
  };

  const refreshData = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const [demandesData, evaluationsData] = await Promise.all([
        loadDemandes(),
        loadEvaluations()
      ]);
      setProjects(demandesData.projects);
      setEvaluations(evaluationsData);
      setSuccessMessage("Données actualisées avec succès !");
    } catch (err) {
      console.error('Erreur actualisation:', err);
      setError(err.message || "Erreur lors de l'actualisation des données.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const StarRating = ({ value, onChange, name }) => (
    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          className={`${styles.star} ${star <= value ? styles.filled : ''}`}
          onClick={() => onChange(name, star)}
        />
      ))}
    </div>
  );

  const getProjectName = (id) => {
    const project = projects.find((p) => p.projectId === id);
    return project ? project.projectName : `Projet (ID: ${id})`;
  };

  const getPartnerName = (id) => {
    return `Évaluateur (ID: ${id})`; 
  };

  return (
    <div className={styles.evaluationContainer}>
      {isLoading && <div className={styles.loaderOverlay}>Chargement en cours...</div>}
      
      {error && <div className={styles.errorMessage}>⚠️ {error}</div>}
      {successMessage && <div className={styles.successMessage}>✅ {successMessage}</div>}

      <div className={styles.evaluationHeader}>
        <h1>Évaluer un projet</h1>
        <button 
          onClick={refreshData} 
          disabled={isLoading} 
          className={styles.refreshButton}
        >
          <FiRefreshCw /> {isLoading ? 'Actualisation...' : 'Actualiser'}
        </button>
      </div>

      <div className={styles.evaluationLayout}>
        <form className={styles.evaluationForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Projet</label>
            <select
              name="projectId"
              value={formData.projectId}
              onChange={handleInputChange}
              required
              className={styles.formControl}
              disabled={isLoading}
            >
              <option value="">-- Choisir un projet --</option>
              {projects.map((project) => (
                <option key={project.projectId} value={project.projectId}>
                  {project.projectName}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>ID de l'évaluateur</label>
            <input
              type="text"
              name="partnerId"
              value={formData.partnerId}
              onChange={handleInputChange}
              required
              className={styles.formControl}
              disabled={isLoading}
              placeholder="Saisissez l'ID de l'évaluateur"
            />
          </div>

          <div className={styles.criteriaGrid}>
            <div>
              <label>Innovation</label>
              <StarRating name="innovationStars" value={formData.innovationStars} onChange={handleStarChange} />
            </div>
            <div>
              <label>Potentiel du marché</label>
              <StarRating name="marketPotentialStars" value={formData.marketPotentialStars} onChange={handleStarChange} />
            </div>
            <div>
              <label>Équipe</label>
              <StarRating name="teamStars" value={formData.teamStars} onChange={handleStarChange} />
            </div>
            <div>
              <label>Faisabilité</label>
              <StarRating name="feasibilityStars" value={formData.feasibilityStars} onChange={handleStarChange} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Note globale</label>
            <StarRating name="overallStars" value={formData.overallStars} onChange={handleStarChange} />
            <div className={styles.scorePreview}>
              Score: {formData.overallStars * 20}/100
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={styles.formControl}
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Commentaires</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              className={styles.formControl}
              rows="3"
              placeholder="Commentaires"
              disabled={isLoading}
            />
          </div>

          <div className={styles.formActions}>
            <button 
              type="button" 
              onClick={resetForm} 
              className={styles.secondaryButton}
              disabled={isLoading}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className={styles.primaryButton} 
              disabled={isLoading}
            >
              {isLoading ? (
                'Envoi en cours...'
              ) : editingId ? (
                <><FiEdit2 /> Modifier</>
              ) : (
                <><FiSend /> Envoyer</>
              )}
            </button>
          </div>
        </form>

        <div className={styles.evaluationList}>
          <h2>Évaluations existantes</h2>
          {isLoading && evaluations.length === 0 ? (
            <p>Chargement en cours...</p>
          ) : evaluations.length === 0 ? (
            <p>Aucune évaluation disponible</p>
          ) : (
            evaluations.map((item) => (
              <div key={item._id || item.id} className={styles.evaluationCard}>
                <h3>{getProjectName(item.projectId)}</h3>
                <p><strong>Évalué par :</strong> {getPartnerName(item.partnerId)}</p>
                <p><strong>Score :</strong> {item.score || (item.overallStars * 20)}/100</p>
                <p><strong>Date :</strong> {item.date ? new Date(item.date).toLocaleDateString() : 'Non spécifiée'}</p>
                {item.comments && <p><strong>Commentaires :</strong> {item.comments}</p>}
                <div className={styles.cardActions}>
                  <button 
                    onClick={() => handleEdit(item)}
                    disabled={isLoading}
                  >
                    <FiEdit2 />
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id || item.id)}
                    disabled={isLoading}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Evaluations;