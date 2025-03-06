import React, { useState } from "react";
import styles from "./signup.module.css";
import FormControl from "@mui/joy/FormControl";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Button from "@mui/joy/Button";

const SignUpModal = ({ isOpen, onClose }) => {
  const [selectedValue, setSelectedValue] = useState("Porteur de projet");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.section}>
      <h2>Choisissez votre rôle</h2>
      <div className={styles.roles}>
        <FormControl>
          <RadioGroup
            value={selectedValue}
            onChange={handleChange}
            name="radio-buttons-group"
          >
            <div className={styles.roleOption}>
              <Radio value="Porteur de projet" variant="outlined" />
              <label>Porteur de projet</label>
            </div>
            <div className={styles.roleOption}>
              <Radio value="Investisseur" variant="outlined" />
              <label>Investisseur</label>
            </div>
            <div className={styles.roleOption}>
              <Radio value="Stagiaire" variant="outlined" />
              <label>Stagiaire</label>
            </div>
            <div className={styles.roleOption}>
              <Radio value="Startup" variant="outlined" />
              <label>Startup</label>
            </div>
            <div className={styles.roleOption}>
              <Radio value="Partenaire" variant="outlined" />
              <label>Partenaire</label>
            </div>
          </RadioGroup>
        </FormControl>
        <div className={styles.btns}>
          <Button
            variant="outlined"
            type="submit"
            color="primary"
            className={styles.submitButton}
          >
            S'inscrire
          </Button>
          <Button
            variant="outlined"
            color="danger"
            onClick={onClose}
            className={styles.closeButton}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;