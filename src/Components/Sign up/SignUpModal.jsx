import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import FormControl from "@mui/joy/FormControl";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Button from "@mui/joy/Button";

const SignUpModal = ({ isOpen, onClose }) => {
  const [selectedValue, setSelectedValue] = useState("Porteur de projet");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSignUp = () => {
    // Close the modal
    onClose();

    // Navigate to the appropriate route based on the selected role
    switch (selectedValue) {
      case "Porteur de projet":
        navigate("/porteur-de-projet");
        break;
      case "Investisseur":
        navigate("/investisseur");
        break;
      case "Stagiaire":
        navigate("/stagiaire");
        break;
      case "Startup":
        navigate("/startup");
        break;
      case "Partenaire":
        navigate("/partenaire");
        break;
      default:
        break;
    }
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
            onClick={handleSignUp}
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