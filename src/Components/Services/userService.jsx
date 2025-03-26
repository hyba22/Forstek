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
