import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";


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
    const response = await axios.post(`${AUTH_URL}/login`, loginDto);
    return response.data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
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


