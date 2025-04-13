import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";


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
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw error;
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
////demande-incubation


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