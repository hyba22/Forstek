import React from "react";
import styles from "./investisseurlog.module.css";
import { Button, TextField } from "@mui/material";

const InvestisseurLog = () => {
  return (
    <div id="investisseurSign" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
            <div className={styles.title}>
                <h2>Log In</h2>
            </div>
          <div className={styles.fields}>
            <TextField className={styles.textfield} id="outlined-basic" label="Email" variant="outlined" />
            <TextField className={styles.textfield} id="outlined-password-input" type="password" label="Password" variant="outlined" />
          </div> 
          <div className={styles.button}>
          <Button variant="outlined" color="secondary" className={styles.btn}>Sign Up</Button>
          </div>
        </div>
        <div className={styles.rightSection}>
            <div className={styles.title}>
                <h2>Sign Up</h2>
            </div>
          <div className={styles.fields}>
            <TextField className={styles.textfield} id="outlined-basic" label="Nom" variant="outlined" />
            <TextField className={styles.textfield} id="outlined-basic" label="Nom" variant="outlined" />
            <TextField className={styles.textfield} id="outlined-basic" label="Nom" variant="outlined" />
            <TextField className={styles.textfield} id="outlined-basic" label="Nom" variant="outlined" />
          </div>
          <div className={styles.button}>
            <Button variant="outlined" color="secondary" className={styles.btn}>Sign Up</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestisseurLog;
