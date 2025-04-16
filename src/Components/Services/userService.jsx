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
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
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