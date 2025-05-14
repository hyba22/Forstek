import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './login.module.css';
import { Button, TextField } from "@mui/material";
import { FaTimes } from "react-icons/fa"; 
import { signIn } from "../../Components/Services/userService";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
     
    try {
      const { token, role } = await signIn({ email, password });
      
      // Store token and redirect
      localStorage.setItem('token', token);
      redirectToDashboard(role);
      onClose();
    } catch (err) {
      setError(err.message || 'Erreur, Réessayez.');
    }
  };

  const redirectToDashboard = (role) => {
    const routes = {
      admin: '/dashboard',
      porteur_de_projet: '/profile/porteur',
      startup: '/profile/startup',
      stagiaire: '/profile/stagiaire',
      partenaire: '/profile/partenaire',
      investisseur: '/profile/investisseur',
      freelance: '/profile/freelance'
    };
    navigate(routes[role] || '/');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
      <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="close"
          >
            <FaTimes />
          </button>
        <div className={styles.modalHeader}>
          <h2>Connexion</h2>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <TextField
              className={styles.textfield}
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
          </div>
          <div className={styles.formGroup}>
            <TextField
              className={styles.textfield}
              type="password"
              label="Mot de passe"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
          </div>
          <div className={styles.btns}>
            <Button 
              className={styles.btnStyle}
              variant="outlined" 
              type="submit" 
              color="primary"
            >
              Se connecter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;