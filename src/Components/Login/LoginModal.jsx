import React from "react";
import styles from './login.module.css';
import { Button, TextField } from "@mui/material";


const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Login</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="username">Email</label>
            <TextField className={styles.textfield} id="outlined-basic" label="Email" variant="outlined" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <TextField className={styles.textfield} id="outlined-password-input" type="password" label="Password" variant="outlined" />
          </div>
          <div className={styles.btns}>
          <Button variant="outlined" type="submit" color="primary" className={styles.submitButton}>Login</Button>
          <Button variant="outlined" color="error" onClick={onClose} className={styles.closeButton}>Close</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;