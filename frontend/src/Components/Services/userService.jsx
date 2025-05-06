import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";
const AUTH_URL = `${API_BASE_URL}/auth`;
const PROJET_FREELANCE_URL = `${API_BASE_URL}/projet-freelance`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
export const signUp = async (userData) => {
  try {
    if (!userData.role) {
      throw new Error('Role is required');
    }
    
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
      ...userData,
      role: userData.role
    });
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
export const createUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
 
export const signIn = async (loginDto) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, loginDto, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

//offre functions
export const getOffers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/offres`);
    return response.data;
  } catch (error) {
    console.error("Error getting offers:", error.response?.data || error.message);
    throw error;
  }
};

export const getOffer = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/offres/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting offer ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
export const createOffer = async (offerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/offres`, offerData);
    return response.data;
  } catch (error) {
    console.error("Error creating offer:", error.response?.data || error.message);
    throw error;
  }
};

export const updateOffer = async (id, offerData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/offres/${id}`, offerData);
    return response.data;
  } catch (error) {
    console.error(`Error updating offer ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteOffer = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/offres/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting offer ${id}:`, error.response?.data || error.message);
    throw error;
  }
};


export const getDemandes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/demandes`);
    return response.data;
  } catch (error) {
    console.error("Error getting demandes:", error.response?.data || error.message);
    throw error;
  }
};

export const getDemande = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/demandes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting demande ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const createDemande = async (demandeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/demandes`, demandeData);
    return response.data;
  } catch (error) {
    console.error("Error creating demande:", error.response?.data || error.message);
    throw error;
  }
};

export const updateDemande = async (id, demandeData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/demandes/${id}`, demandeData);
    return response.data;
  } catch (error) {
    console.error(`Error updating demande ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const updateDemandeStatus = async (id, statut) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/demandes/${id}/status`, { statut });
    return response.data;
  } catch (error) {
    console.error(`Error updating demande status ${id}:`, error.response?.data || error.message);
    throw error;
  }
};



export const deleteDemande = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/demandes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting demande ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
/////evaluation
export const getEvaluations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/evaluations`);
    return response.data;
  } catch (error) {
    console.error("Error getting evaluations:", error.response?.data || error.message);
    throw error;
  }
};

export const getEvaluation = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/evaluations/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting evaluation ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const createEvaluation = async (evaluationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/evaluations`, evaluationData);
    return response.data;
  } catch (error) {
    console.error("Error creating evaluation:", error.response?.data || error.message);
    throw error;
  }
};

export const updateEvaluation = async (id, evaluationData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/evaluations/${id}`, evaluationData);
    return response.data;
  } catch (error) {
    console.error(`Error updating evaluation ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteEvaluation = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/evaluations/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting evaluation ${id}:`, error.response?.data || error.message);
    throw error;
  }
};



export const getProjets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/deposeprojet`);
    return response.data;
  } catch (error) {
    console.error("Error getting projects:", error.response?.data || error.message);
    throw error;
  }
};

export const getProjet = async (iddeposeprojet) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/deposeprojet/${iddeposeprojet}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting project ${iddeposeprojet}:`, error.response?.data || error.message);
    throw error;
  }
};

export const createDeposeProjet = async (projectData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/deposeprojet`, projectData);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error.response?.data || error.message);
    throw error;
  }
};

export const updateDeposeProjet = async (iddeposeprojet, projectData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/deposeprojet/${iddeposeprojet}`, projectData);
    return response.data;
  } catch (error) {
    console.error(`Error updating project ${iddeposeprojet}:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteDeposeProjet = async (iddeposeprojet) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/deposeprojet/${iddeposeprojet}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting project ${iddeposeprojet}:`, error.response?.data || error.message);
    throw error;
  }
};
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ProjetFreelance CRUD methods
export const getProjetsFreelance = async () => {
  try {
    const response = await axios.get(`${PROJET_FREELANCE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l''affichage:", error.response?.data || error.message);
    throw error;
  }
};

export const createProjetFreelance = async (projectData) => {
  try {
    const response = await axios.post(`${PROJET_FREELANCE_URL}/`, projectData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création:", error.response?.data || error.message);
    throw error;
  }
};

export const updateProjetFreelance = async (id, projectData) => {
  try {
    const response = await axios.put(`${PROJET_FREELANCE_URL}/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteProjetFreelance = async (id) => {
  try {
    const response = await axios.delete(`${PROJET_FREELANCE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression:", error.response?.data || error.message);
    throw error;
  }
};

export const getProjetFreelanceByEmail = async (email) => {
  try {
    const response = await axios.get(`${PROJET_FREELANCE_URL}/by-email/${email}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'importation du projet par mail:", error.response?.data || error.message);
    throw error;
  }
};


// Add demande funstions 

export const createDemandes = async (demandeData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/demandes/apply`, {
      ...demandeData,
      offreId: demandeData.offreId, 
      name: demandeData.name?.split(' ')[0] || '', 
      prenom: demandeData.prenom?.split(' ').slice(1).join(' ') || '', 
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Create Demande Error:", error.response?.data || error.message);
    throw error;
  }
};
/*
export const uploadCV = async (file, offerId) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('cv', file);
    formData.append('offerId', offerId);

    const response = await axios.post(`${API_BASE_URL}/demandes/upload-cv`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Upload CV Error:", error.response?.data || error.message);
    throw error;
  }
};*/
/*
export const uploadCV = async (cvFile) => {
  const formData = new FormData();
  formData.append('cv', cvFile);
  try {
    const response = await api.post('/demandes/upload-cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
*/

export const uploadCV = async (file) => {
  const formData = new FormData();
  formData.append('cv', file);
  const response = await axios.post('http://localhost:3000/api/upload-cv', formData);
  return response.data;
};

export const getOfferDetails = async (offerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/offers/${offerId}`);
    return response.data;
  } catch (error) {
    console.error("Get Offer Error:", error.response?.data || error.message);
    throw error;
  }
};

/*
export const getDemandesWithOffers = async () => {
  
  try {
    const response = await fetch(`${API_BASE_URL}/demandes/with-offers`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Request failed');
    }

    if (!result.success) {
      throw new Error(result.message || 'API request unsuccessful');
    }

    return result.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Failed to fetch applications');
  }
};*/

/*
export const getDemandesWithOffers = async () => {
 
  
  try {
    const response = await fetch(`${API_BASE_URL}/demandes/with-offers`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'include'
    });

    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(errorText || 'Request failed with status ' + response.status);
    }

    
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Expected JSON but got: ${contentType}. Response: ${text.substring(0, 100)}`);
    }

    const data = await response.json();
    console.log('API Response:', data); 
    
    
    return data.map(item => ({
      id: item.demande_id,
      dateDemande: item.demande_dateDemande,
      statut: item.demande_statut,
      offre: {
        id: item.offre_id,
        titre: item.offre_titre,
        societe: item.offre_societe
      }
    }));
  } catch (error) {
    console.error('Full API Error:', error);
    throw new Error(error.message || 'Failed to fetch applications');
  }
};*/

export const getDemandesWithOffers = async () => {
  try {
    const url = 'http://localhost:3000/api/demandes/fetch-with-offers';
    console.log('Sending request to:', url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response data:', errorData);
      throw new Error(JSON.stringify(errorData));
    }
    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

///// AI assictance 
export const executeAIAssistant = async ({ resumeFile, jobOfferFile, question }) => {
  const formData = new FormData();

  if (!resumeFile) {
    throw new Error('Resume file is missing');
  }
  if (!(resumeFile instanceof File)) {
    console.error('Invalid resume file type:', resumeFile);
    throw new Error('Resume file must be a valid File object');
  }
  formData.append('files', resumeFile, 'resume.pdf');

  if (!jobOfferFile) {
    throw new Error('Job offer file is missing');
  }
  if (!(jobOfferFile instanceof File)) {
    console.error('Invalid job offer file type:', jobOfferFile);
    throw new Error('Job offer file must be a valid File object');
  }
  formData.append('files', jobOfferFile, 'jobOffer.json');

  if (!question || typeof question !== 'string') {
    throw new Error('Question must be a non-empty string');
  }
  formData.append('question', question);

  for (let [key, value] of formData.entries()) {
    console.log(`FormData entry: ${key}=${value.name || value}`);
  }

  try {
    const response = await axios.post('http://localhost:3000/api/analyze', formData);
    return response.data;
  } catch (error) {
    console.error('Error with AI Assistant:', error);
    throw error;
  }
};
