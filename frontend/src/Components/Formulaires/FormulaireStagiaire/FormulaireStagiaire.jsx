import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail, MdCastForEducation } from "react-icons/md";
import { signUp, signIn } from "../../Services/userService";
import "./FormulaireStagiaire.css";

const FormulaireStagiaire = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const { state } = useLocation();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    prenom: "",
    domaine: "",
    role: state?.role || "stagiaire",
  });
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    prenom: "",
    domaine: "",
  });
  
  const [formError, setFormError] = useState("");

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "email":
        if (!value) {
          error = "Email Est obligatoire";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Entrez un email valide";
        }
        break;
      case "password":
        if (!value) {
          error = "Mot de passe est obligatoire";
        } else if (value.length < 8) {
          error = "Il faut 8 caractères minimum";
        } else if (!/[A-Z]/.test(value)) {
          error = "Il faut au moins une lettre en majuscule";
        } else if (!/[0-9]/.test(value)) {
          error = "Il faut au moins un chiffre";
        }
        break;
      case "name":
        if (!value && isSignUpMode) {
          error = "Nom est obligatoire";
        } else if (value && !/^[a-zA-ZÀ-ÿ\s-]+$/.test(value)) {
          error = "Il faut des lettres seulement";
        }
        break;
      case "prenom":
        if (!value && isSignUpMode) {
          error = "Prénom est obligatoire";
        } else if (value && !/^[a-zA-ZÀ-ÿ\s-]+$/.test(value)) {
          error = "Il faut des lettres seulement";
        }
        break;
      case "domaine":
        if (!value && isSignUpMode) {
          error = "Domaine est obligatoire";
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    const error = validateField(name, value);
    
    setErrors({
      ...errors,
      [name]: error
    });
    
    setFormData({ 
      ...formData, 
      [name]: value 
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      if (isSignUpMode || (key === "email" || key === "password")) {
        const error = validateField(key, formData[key]);
        newErrors[key] = error;
        if (error) isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setFormError("Corrigez les erreurs du formulaire");
      return;
    }
    
    try {
      const response = await signUp({
        ...formData,
        role: "stagiaire"
      });
      
      setFormData({
        name: "",
        email: "",
        password: "",
        prenom: "",
        domaine: "",
        role: "stagiaire",
      });
      
      setFormError("");
      navigate("/stagiaire", { 
        state: { user: response.user } 
      });
    } catch (error) {
      console.error("Signup error:", error);
      setFormError(error.response?.data?.message || "Erreur. Réessayez de nouveau.");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setFormError("Entrez un email valide et votre mot de passe");
      return;
    }
    
    try {
      const response = await signIn({
        email: formData.email,
        password: formData.password
      });
      
      setFormError("");
      navigate(`/${response.user.role.toLowerCase()}`);
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setFormError("Email ou mot de passe invalide. Réessayez.");
    }
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSignIn} className="sign-in-form">
            <h2 className="title">Connexion Stagiaire</h2>
            {formError && <div className="form-error">{formError}</div>}
            <div className="input-field">
              <MdEmail className="icon" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <div className="input-field">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Mot de passe"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>
            <button type="submit" className="btn solid">
              Se connecter
            </button>
          </form>

          <form onSubmit={handleSignUp} className="sign-up-form">
            <h2 className="title">Inscription Stagiaire</h2>
            {formError && <div className="form-error">{formError}</div>}
            <div className="input-field">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Nom"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="input-field">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                required
              />
              {errors.prenom && <span className="field-error">{errors.prenom}</span>}
            </div>
            <div className="input-field">
              <MdCastForEducation className="icon" />
              <input
                type="text"
                placeholder="Domaine d'étude"
                name="domaine"
                value={formData.domaine}
                onChange={handleInputChange}
                required
              />
              {errors.domaine && <span className="field-error">{errors.domaine}</span>}
            </div>
            <div className="input-field">
              <MdEmail className="icon" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <div className="input-field">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Mot de passe"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>
            <button type="submit" className="btn solid">
              S'inscrire
            </button>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Nouveau stagiaire?</h3>
            <p>Créez votre compte ici</p>
            <button
              className="btn transparent"
              onClick={() => {
                setIsSignUpMode(true);
                setFormError("");
                setErrors({
                  name: "",
                  email: "",
                  password: "",
                  prenom: "",
                  domaine: "",
                });
              }}
            >
              S'inscrire
            </button>
          </div>
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Déjà inscrit?</h3>
            <p>Connectez-vous ici</p>
            <button
              className="btn transparent"
              onClick={() => {
                setIsSignUpMode(false);
                setFormError("");
                setErrors({
                  name: "",
                  email: "",
                  password: "",
                  prenom: "",
                  domaine: "",
                });
              }}
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaireStagiaire;