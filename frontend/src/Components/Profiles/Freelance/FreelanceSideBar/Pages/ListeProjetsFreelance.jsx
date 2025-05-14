import React, { useEffect, useState, Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProjetsFreelance, createDemandeProjet, uploadCV, executeAIAssistant } from '../../../../Services/userService';
import { LuExpand } from 'react-icons/lu';
import Modal from 'react-modal';
import styles from './projetsFreelance.module.css';

Modal.setAppElement('#root');

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error}>
          <h2>Une erreur s'est produite</h2>
          <p>{this.state.error?.message || 'Erreur inconnue'}</p>
          <button onClick={() => window.location.reload()}>
            Recharger la page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const ListeProjetsFreelance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProjet, setSelectedProjet] = useState(null);
  const [demandeId, setDemandeId] = useState(null);
  const newProjet = location.state?.formData;

  const [aiAssistant, setAiAssistant] = useState({
    goodFit: false,
    tailorResume: false,
    bestPositioning: false,
  });

  const [aiResponses, setAiResponses] = useState({});
  const [aiError, setAiError] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    lettreMotivation: '',
    cv: null,
    projetId: null,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProjets = async () => {
      try {
        setLoading(true);
        const data = await getProjetsFreelance();
        setProjets(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur lors du chargement des projets:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjets();
  }, []);

  useEffect(() => {
    if (newProjet) {
      setProjets(prevProjets => [...prevProjets, newProjet]);
    }
  }, [newProjet]);

  const handleValidation = (projet) => {
    navigate('/profile/freelance/listeProjetsFreelance', {
      state: {
        action: 'validate',
        validatedProjet: projet
      }
    });
    alert("Vous avez postulé à ce poste!");
  };

  const handleAICheckboxChange = (feature) => {
    setAiAssistant((prev) => ({
      goodFit: feature === 'goodFit' ? true : false,
      tailorResume: feature === 'tailorResume' ? true : false,
      bestPositioning: feature === 'bestPositioning' ? true : false,
    }));
    setAiError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert('Le fichier ne doit pas dépasser 5MB');
      return;
    }
    setApplicationData((prev) => ({
      ...prev,
      cv: file,
    }));
  };

  const handleApply = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      let cvUploadResponse = null;
      if (applicationData.cv) {
        cvUploadResponse = await uploadCV(applicationData.cv);
      }

      const response = await createDemandeProjet({
        projetId: selectedProjet?.id,
        name: applicationData.name,
        email: applicationData.email,
        lettreMotivation: applicationData.lettreMotivation,
        cv: cvUploadResponse?.originalname || null,
      });

      setDemandeId(response.id);
      alert('Demande créée avec succès!');
      handleValidation(selectedProjet);
      setApplicationData({
        name: '',
        email: '',
        lettreMotivation: '',
        cv: null,
        projetId: null,
      });
    } catch (error) {
      console.error('Error applying:', error);
      alert(`Erreur: ${error.message || 'Échec de la soumission'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    if (!applicationData.name) {
      alert('Veuillez entrer votre nom');
      return false;
    }
    if (!applicationData.email) {
      alert('Veuillez entrer votre email');
      return false;
    }
    if (!applicationData.cv) {
      alert('Veuillez sélectionner un CV');
      return false;
    }
    if (!selectedProjet?.id) {
      alert('Aucun projet sélectionné');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setApplicationData({
      name: '',
      email: '',
      lettreMotivation: '',
      cv: null,
      projetId: null,
    });
    setAiResponses({});
    setDemandeId(null);
  };

  const openModal = (projet) => {
    setSelectedProjet(projet);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProjet(null);
    setAiAssistant({
      goodFit: false,
      tailorResume: false,
      bestPositioning: false,
    });
    resetForm();
  };

  const handleAIExecution = async () => {
    if (!applicationData.cv || !selectedProjet) {
      setAiError('Veuillez uploader un CV et sélectionner un projet.');
      return;
    }

    const aiQuestions = {
      goodFit: 'Suis-je un bon candidat ?',
      tailorResume: 'Adapter mon CV',
      bestPositioning: 'Comment puis-je me positionner au mieux ?',
    };

    const activeQuestions = Object.keys(aiAssistant)
      .filter((key) => aiAssistant[key])
      .map((key) => aiQuestions[key]);

    if (activeQuestions.length === 0) {
      setAiError('Veuillez sélectionner au moins une option IA.');
      return;
    }

    setAiLoading(true);
    setAiError(null);

    try {
      const projetFile = new File(
        [JSON.stringify({ description: selectedProjet.descriptionprojet })],
        'projet.json',
        { type: 'application/json' },
      );

      const responses = {};
      for (const question of activeQuestions) {
        const result = await executeAIAssistant({
          resumeFile: applicationData.cv,
          jobOfferFile: projetFile,
          question,
        });
        let responseText = result.response?.response || 'Réponse non disponible';
        const salutationIndex = responseText.toLowerCase().lastIndexOf('cordialement');
        if (salutationIndex !== -1) {
          responseText = responseText.substring(0, salutationIndex).trim();
        }
        responses[
          Object.keys(aiQuestions).find((key) => aiQuestions[key] === question)
        ] = responseText;
      }

      setAiResponses((prev) => ({ ...prev, ...responses }));
    } catch (error) {
      console.error('Error with AI Assistant:', error);
      const errorMessage =
        error.response?.data?.message || error.message || 'Erreur inconnue';
      setAiError(`Erreur lors de l'exécution de l'assistant IA : ${errorMessage}`);
    } finally {
      setAiLoading(false);
    }
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '800px',
      width: '90%',
      maxHeight: '80vh',
      overflow: 'auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    },
  };

  if (loading) {
    return <div className={styles.loading}>Chargement en cours...</div>;
  }

  if (error) {
    return <div className={styles.error}>Erreur: {error}</div>;
  }

  return (
    <ErrorBoundary>
      <div className={styles.body}>
        <h1 className={styles.modernTitle}>Liste des Projets Freelance</h1>
        <table className={styles.modernTable}>
          <thead>
            <tr>
              <th>Agrandir</th>
              <th>Société</th>
              <th>Email</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Domaine</th>
              <th>Budget</th>
              <th>Compétences</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projets.length > 0 ? (
              projets.map((projet, index) => (
                <tr key={projet.id || index}>
                  <td
                    className={styles.agrandirIcon}
                    onClick={() => openModal(projet)}
                  >
                    <LuExpand
                      className={styles.icon}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td>{projet.nomSociete || '-'}</td>
                  <td>{projet.email || '-'}</td>
                  <td>{projet.titreprojet || '-'}</td>
                  <td className={styles.descriptionCell}>
                    {projet.descriptionprojet 
                      ? (projet.descriptionprojet.length > 100 
                          ? `${projet.descriptionprojet.substring(0, 100)}...` 
                          : projet.descriptionprojet)
                      : '-'}
                  </td>
                  <td>{projet.domaineprojet || '-'}</td>
                  <td>{projet.budget || '-'}</td>
                  <td className={styles.descriptionCell}>
                    {projet.competencesRequises 
                      ? (projet.competencesRequises.length > 50
                          ? `${projet.competencesRequises.substring(0, 50)}...`
                          : projet.competencesRequises)
                      : '-'}
                  </td>
                  <td>{projet.datedebut || '-'}</td>
                  <td>{projet.datefin || '-'}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button 
                        className={styles.validateBtn}
                        onClick={() => openModal(projet)}
                      >
                        Postuler
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">Aucun projet disponible</td>
              </tr>
            )}
          </tbody>
        </table>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Projet Details"
        >
          {selectedProjet ? (
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>{selectedProjet.titreprojet}</h2>
                <button onClick={closeModal} className={styles.closeButton}>
                  ×
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.detailRow}>
                  <strong>Société:</strong>
                  <span>{selectedProjet.nomSociete || '-'}</span>
                </div>

                <div className={styles.detailRow}>
                  <strong>Email:</strong>
                  <span>{selectedProjet.email || '-'}</span>
                </div>

                <div className={styles.detailRow}>
                  <strong>Domaine:</strong>
                  <span>{selectedProjet.domaineprojet || '-'}</span>
                </div>

                <div className={styles.detailRow}>
                  <strong>Budget:</strong>
                  <span>{selectedProjet.budget || '-'}</span>
                </div>

                <div className={styles.detailRow}>
                  <strong>Date début:</strong>
                  <span>{selectedProjet.datedebut || '-'}</span>
                </div>

                <div className={styles.detailRow}>
                  <strong>Date fin:</strong>
                  <span>{selectedProjet.datefin || '-'}</span>
                </div>

                <div className={styles.aiAssistant}>
                  <div className={styles.premiumHeader}>
                    <h4>Assistance IA</h4>
                  </div>
                  <div className={styles.aiFeatures}>
                    <label className={styles.aiFeature}>
                      <input
                        type="checkbox"
                        checked={aiAssistant.goodFit}
                        onChange={() => handleAICheckboxChange('goodFit')}
                      />
                      <span>Suis-je un bon candidat ?</span>
                    </label>
                    {aiResponses.goodFit && (
                      <div className={styles.aiResponse}>
                        <p>{aiResponses.goodFit}</p>
                      </div>
                    )}

                    <label className={styles.aiFeature}>
                      <input
                        type="checkbox"
                        checked={aiAssistant.tailorResume}
                        onChange={() => handleAICheckboxChange('tailorResume')}
                      />
                      <span>Adapter mon CV</span>
                    </label>
                    {aiResponses.tailorResume && (
                      <div className={styles.aiResponse}>
                        <p>{aiResponses.tailorResume}</p>
                      </div>
                    )}

                    <label className={styles.aiFeature}>
                      <input
                        type="checkbox"
                        checked={aiAssistant.bestPositioning}
                        onChange={() => handleAICheckboxChange('bestPositioning')}
                      />
                      <span>Comment puis-je me positionner au mieux ?</span>
                    </label>
                    {aiResponses.bestPositioning && (
                      <div className={styles.aiResponse}>
                        <p>{aiResponses.bestPositioning}</p>
                      </div>
                    )}

                    {aiError && <div className={styles.aiError}>{aiError}</div>}
                  </div>

                  <button
                    className={styles.aiButton}
                    onClick={handleAIExecution}
                    disabled={
                      !Object.values(aiAssistant).some((val) => val) || aiLoading
                    }
                  >
                    {aiLoading ? 'Chargement...' : 'Exécuter'}
                  </button>
                </div>

                <div className={styles.descriptionSection}>
                  <h3>Description détaillée</h3>
                  <p className={styles.fullDescription}>
                    {selectedProjet.descriptionprojet || '-'}
                  </p>
                </div>

                <div className={styles.applicationForm}>
                  <h3>Postuler à ce projet</h3>

                  <div className={styles.formGroup}>
                    <label>Votre Nom *</label>
                    <input
                      type="text"
                      name="name"
                      value={applicationData.name}
                      onChange={handleInputChange}
                      placeholder="Nom"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="exemple@exemple.com"
                      value={applicationData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Lettre de motivation</label>
                    <textarea
                      name="lettreMotivation"
                      value={applicationData.lettreMotivation}
                      onChange={handleInputChange}
                      placeholder="Décrivez pourquoi vous êtes le bon candidat..."
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>CV (PDF, DOC, DOCX - Max 5MB) *</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                    />
                    {applicationData.cv && (
                      <span className={styles.fileName}>
                        {applicationData.cv.name}
                      </span>
                    )}
                  </div>

                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${uploadProgress}%` }}
                      >
                        {uploadProgress}%
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleApply}
                    className={styles.submitButton}
                    disabled={
                      isSubmitting ||
                      !applicationData.name ||
                      !applicationData.cv
                    }
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Soumettre la demande'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>Chargement...</div>
          )}
        </Modal>
      </div>
    </ErrorBoundary>
  );
};

export default ListeProjetsFreelance;