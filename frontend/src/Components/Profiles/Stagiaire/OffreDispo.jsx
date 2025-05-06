import React, { useEffect, useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOffers, createDemandes, uploadCV, executeAIAssistant } from '../../Services/userService';
import styles from './offreliste.module.css';
import { LuExpand } from 'react-icons/lu';
import Modal from 'react-modal';

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

const OffreDispo = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [demandeId, setDemandeId] = useState(null);
  const navigate = useNavigate();

  const [aiAssistant, setAiAssistant] = useState({
    goodFit: false,
    tailorResume: false,
    bestPositioning: false,
  });

  const [aiResponses, setAiResponses] = useState({});
  const [aiError, setAiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    lettreMotivation: '',
    cv: null,
    offreId: null,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      setIsLoading(true);
      try {
        const data = await getOffers();
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

      const response = await createDemandes({
        offreId: selectedOffer?.id,
        name: applicationData.name,
        email: applicationData.email,
        lettreMotivation: applicationData.lettreMotivation,
        cv: cvUploadResponse?.originalname || null,
      });

      setDemandeId(response.id);
      alert('Demande créée avec succès!');
      setApplicationData({
        name: '',
        email: '',
        lettreMotivation: '',
        cv: null,
        offreId: null,
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
    if (!selectedOffer?.id) {
      alert('Aucune offre sélectionnée');
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
      offreId: null,
    });
    setAiResponses({});
    setDemandeId(null);
  };

  const openModal = (offer) => {
    setSelectedOffer(offer);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedOffer(null);
    setAiAssistant({
      goodFit: false,
      tailorResume: false,
      bestPositioning: false,
    });
    resetForm();
  };

  const handleAIExecution = async () => {
    if (!applicationData.cv || !selectedOffer) {
      alert('Veuillez uploader un CV et sélectionner une offre.');
      return;
    }
  
    const aiQuestions = {
      goodFit: 'Suis-je un bon candidat ?',
      tailorResume: 'Quels sont les points à améliorer dans mon CV ?',
      bestPositioning: 'Comment puis-je me positionner au mieux ?',
    };
  
    const activeQuestions = Object.keys(aiAssistant)
      .filter((key) => aiAssistant[key])
      .map((key) => aiQuestions[key]);
  
    if (activeQuestions.length === 0) {
      alert('Veuillez sélectionner au moins une option IA.');
      return;
    }
  
    setLoading(true);
    setAiError(null);
  
    try {
      const jobOfferFile = new File(
        [JSON.stringify({ description: selectedOffer.description })],
        'jobOffer.json',
        { type: 'application/json' },
      );
  
      console.log('Submitting AI request:', {
        resumeFile: applicationData.cv.name,
        jobOfferFile: jobOfferFile.name,
        questions: activeQuestions,
      });
  
      const responses = {};
      for (const question of activeQuestions) {
        const result = await executeAIAssistant({
          resumeFile: applicationData.cv,
          jobOfferFile,
          question,
        });
        // Extract the response string from the nested response object
        const responseText = result.response?.response || 'Réponse non disponible';
        console.log(`AI response for "${question}":`, responseText);
        responses[
          Object.keys(aiQuestions).find((key) => aiQuestions[key] === question)
        ] = responseText; // Store only the string
      }
  
      setAiResponses((prev) => ({ ...prev, ...responses }));
    } catch (error) {
      console.error('Error with AI Assistant:', error);
      const errorMessage =
        error.response?.data?.message || error.message || 'Erreur inconnue';
      setAiError(`Erreur lors de l'exécution de l'assistant IA : ${errorMessage}`);
    } finally {
      setLoading(false);
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

  if (isLoading) {
    return <div className={styles.loading}>Chargement en cours...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <ErrorBoundary>
      <div className={styles.body}>
        <h1 className={styles.modernTitle}>Liste des Offres</h1>
        <table className={styles.modernTable}>
          <thead>
            <tr>
              <th>Agrandir</th>
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
              offers.map((offer) => (
                <tr key={offer.id}>
                  <td
                    className={styles.agrandirIcon}
                    onClick={() => openModal(offer)}
                  >
                    <LuExpand
                      className={styles.icon}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td>{offer.titre}</td>
                  <td>{offer.societe}</td>
                  <td className={styles.descriptionCell}>
                    {offer.description.length > 100
                      ? `${offer.description.substring(0, 100)}...`
                      : offer.description}
                  </td>
                  <td>{offer.localisation}</td>
                  <td>{offer.salaire || 'Non spécifié'}</td>
                  <td>
                    {offer.deadline
                      ? new Date(offer.deadline).toLocaleDateString()
                      : 'Non spécifiée'}
                  </td>
                  <td>
                    <button
                      onClick={() => openModal(offer)}
                      className={styles.applyButton}
                    >
                      Postuler
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">Aucune offre disponible</td>
              </tr>
            )}
          </tbody>
        </table>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Offer Details"
        >
          {selectedOffer ? (
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>{selectedOffer.titre}</h2>
                <button onClick={closeModal} className={styles.closeButton}>
                  ×
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.detailRow}>
                  <strong>Société:</strong>
                  <span>{selectedOffer.societe}</span>
                </div>

                <div className={styles.detailRow}>
                  <strong>Localisation:</strong>
                  <span>{selectedOffer.localisation}</span>
                </div>

                <div className={styles.detailRow}>
                  <strong>Salaire:</strong>
                  <span>{selectedOffer.salaire || 'Non spécifié'}</span>
                </div>

                <div className={styles.detailRow}>
                  <strong>Date limite:</strong>
                  <span>
                    {selectedOffer.deadline
                      ? new Date(selectedOffer.deadline).toLocaleDateString()
                      : 'Non spécifiée'}
                  </span>
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
                  </div>

                  {aiError && (
                    <div className={styles.aiError}>
                      <p>{aiError}</p>
                    </div>
                  )}

                  <button
                    className={styles.aiButton}
                    onClick={handleAIExecution}
                    disabled={
                      !Object.values(aiAssistant).some((val) => val) || loading
                    }
                  >
                    {loading ? 'Chargement...' : 'Exécuter'}
                  </button>
                </div>

                <div className={styles.descriptionSection}>
                  <h3>Description détaillée</h3>
                  <p className={styles.fullDescription}>
                    {selectedOffer.description}
                  </p>
                </div>

                <div className={styles.applicationForm}>
                  <h3>Postuler à cette offre</h3>

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

export default OffreDispo;