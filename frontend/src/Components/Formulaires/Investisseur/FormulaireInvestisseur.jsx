import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaGoogle,
  FaLinkedin,
  FaLock,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import { MdCastForEducation, MdEmail } from "react-icons/md";
import "./investisseurLog.module.css";
import { getUsers, signUp, signIn } from "../../Services/userService";
import { useLocation } from "react-router-dom";

const FormulaireInvestisseur = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const location = useLocation();
  
  const role = location.pathname.split('/').pop();
  
  if (role !== 'investisseur') {
    return <div>Invalid access to investisseur form</div>;
  }

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    prenom: "",
    domaine: "",
    role: role,
  });
  
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    prenom: "",
    domaine: "",
  });
  
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setFormError("Failed to fetch users. Please check your connection.");
    }
  };

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
          error = "Il faut seulement des lettres ";
        }
        break;
      case "prenom":
        if (!value && isSignUpMode) {
          error = "Prénom est obligatoire";
        } else if (value && !/^[a-zA-ZÀ-ÿ\s-]+$/.test(value)) {
          error = "Il faut seulement des lettres";
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
    
    // Validate the field
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
        name: formData.name,
        prenom: formData.prenom,
        email: formData.email,
        password: formData.password,
        domaine: formData.domaine,
        role: role,
      });
      
      // Reset form 
      setFormData({
        email: "",
        password: "",
        name: "",
        prenom: "",
        domaine: "",
        role: role,
      });
      
      setFormError("");
      alert("Inscription effectuée avec succès!");
      setIsSignUpMode(false);
      
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
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
      const credentials = {
        email: formData.email,
        password: formData.password,
      };
      const response = await signIn(credentials);
      console.log("Login avec succès:", response);
      alert(`Bienvenue, ${response.user.name}!`);
      setFormData({
        email: "",
        password: "",
        name: "",
        prenom: "",
        domaine: "",
      });
      setFormError("");
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setFormError("Email ou mot de passe invalide. Réessayez.");
    }
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSignIn} action="" className="sign-in-form">
            <h2 className="title">Connexion</h2>
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
            <input type="submit" value="Se connecter" className="btn solid" />
            <a href="#" className="social-text">
              Mot de passe oubilé
            </a>
            <div className="social-media">
              <a href="#" className="social-icon">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon">
                <FaGoogle />
              </a>
              <a href="#" className="social-icon">
                <FaLinkedin />
              </a>
            </div>
          </form>

          <form onSubmit={handleSignUp} action="" className="sign-up-form">
            <h2 className="title">Formulaire Investisseur</h2>
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
                placeholder="Domaine"
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
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>
            <input type="submit" value="S'inscrire" className="btn solid" />
            <p className="social-text">
              Ou utiliser l'un de vos réseaux sociaux
            </p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon">
                <FaGoogle />
              </a>
              <a href="#" className="social-icon">
                <FaLinkedin />
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Nouvel utilisateur?</h3>
            <p>C'est par ici</p>
            <button
              className="btn transparent"
              onClick={() => {
                setIsSignUpMode(true);
                setFormError("");
                setErrors({
                  email: "",
                  password: "",
                  name: "",
                  prenom: "",
                  domaine: "",
                });
              }}
            >
              S'inscrire
            </button>
          </div>
          <img
            src="/src/assets/1.png"
            className="image"
            alt="Usability Testing"
          />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Avez-vous un compte?</h3>
            <p>C'est par ici</p>
            <button
              className="btn transparent"
              onClick={() => {
                setIsSignUpMode(false);
                setFormError("");
                setErrors({
                  email: "",
                  password: "",
                  name: "",
                  prenom: "",
                  domaine: "",
                });
              }}
            >
              Se connecter
            </button>
          </div>
          <img
            src="/src/assets/1.png"
            className="image"
            alt="Usability Testing"
          />
        </div>
      </div>
    </div>
  );
};

export default FormulaireInvestisseur;