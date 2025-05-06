import React, { useState, useEffect } from "react";
import { CgWebsite } from "react-icons/cg";
import { FaFacebook, FaGoogle, FaLinkedin, FaLock, FaPhone, FaTwitter, FaUser } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TfiAgenda } from "react-icons/tfi";
import "./FormulairePartenaire.css";
import { getUsers, signUp, signIn } from '../../Services/userService';
import { useLocation } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import SignUpModal from "../../Sign up/SignUpModal";
import LoginModal from "../../Login/LoginModal";

const FormulairePartenaire = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const location = useLocation();
  
  const role = location.pathname.split('/').pop();
      const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
        const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
      
        const openLoginModal = () => setIsLoginModalOpen(true);
        const closeLoginModal = () => setIsLoginModalOpen(false);
      
        const openSignUpModal = () => setIsSignUpModalOpen(true);
        const closeSignUpModal = () => setIsSignUpModalOpen(false);
  if (role !== 'partenaire') {
    return <div>Invalid access to partenaire form</div>;
  }

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nomSociete: "",
    siteUrl: "",
    adressePostale: "",
    telephone: "",
    dateCreation: "",
    role: role,
  });
  
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    nomSociete: "",
    siteUrl: "",
    adressePostale: "",
    telephone: "",
    dateCreation: "",
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
      case "nomSociete":
        if (!value && isSignUpMode) {
          error = "Nom du société est obligatoire";
        }
        case "adressePostale":
          if (!value && isSignUpMode) {
            error = "Adresse postale est obligatoire";
          }
        break;
      case "siteUrl":
        if (!value && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value)) {
          error = "Entrez un URL valide";
        }
        break;
      case "telephone":
        if (!/^[0-9+\-\s]+$/.test(value) && !value) {
          error = "Entrez le numéro de téléphone";
        }
        break;
      case "dateCreation":
        if (!value && isSignUpMode) {
          error = "Entrez la date de création";
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
        nomSociete: formData.nomSociete,
        siteUrl: formData.siteUrl,
        email: formData.email,
        password: formData.password,
        adressePostale: formData.adressePostale,
        telephone: formData.telephone,
        dateCreation: formData.dateCreation,
        role: role,
      });
      
      setFormData({
        email: "",
        password: "",
        nomSociete: "",
        siteUrl: "",
        adressePostale: "",
        telephone: "",
        dateCreation: "",
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
        nomSociete: "",
        siteUrl: "",
        adressePostale: "",
        telephone: "",
        dateCreation: "",
      });
      setFormError("");
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setFormError("Email ou mot de passe invalide. Réessayez.");
    }
  };

  return ( 
    <>
    <Navbar onLoginClick={openLoginModal} onSignUpClick={openSignUpModal} />
    <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} />
    <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
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
                name="email"
                placeholder="Email"
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
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>
            <input type="submit" value="Se connecter" className="btn solid" />
            <a href="#" className="social-text">Mot de passe oubilé</a>
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
            <h2 className="title">Formulaire Partenaire</h2>
            {formError && <div className="form-error">{formError}</div>}
            <div className="input-field">
              <FaUser className="icon" />
              <input
                type="text"
                name="nomSociete"
                placeholder="Nom du société"
                value={formData.nomSociete}
                onChange={handleInputChange}
                required
              />
              {errors.nomSociete && <span className="field-error">{errors.nomSociete}</span>}
            </div>
            <div className="input-field">
              <FaLocationPin className="icon"/>
              <input
                type="text"
                name="adressePostale"
                placeholder="Adresse postale"
                value={formData.adressePostale}
                onChange={handleInputChange}
                required
              />
              {errors.adressePostale && <span className="field-error">{errors.adressePostale}</span>}
            </div>
            <div className="input-field">
              <FaPhone className="icon"/>
              <input
                type="tel"
                name="telephone"
                placeholder="Téléphone"
                value={formData.telephone}
                onChange={handleInputChange}
              />
              {errors.telephone && <span className="field-error">{errors.telephone}</span>}
            </div>
            <div className="input-field">
              <CgWebsite className="icon" />
              <input
                type="url"
                name="siteUrl"
                placeholder="URL site web"
                value={formData.siteUrl}
                onChange={handleInputChange}
              />
              {errors.siteUrl && <span className="field-error">{errors.siteUrl}</span>}
            </div>
            <div className="input-field">
              <MdEmail className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <div className="input-field">
              <TfiAgenda className='icon'/>
              <input
                type="date"
                name="dateCreation"
                placeholder="Date de création"
                value={formData.dateCreation}
                onChange={handleInputChange}
                required
              />
              {errors.dateCreation && <span className="field-error">{errors.dateCreation}</span>}
            </div>
            <div className="input-field">
              <FaLock className="icon" />
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>
            <input type="submit" value="S'inscrire" className="btn solid" />
            <p className="social-text">Ou utiliser l'un de vos réseaux sociaux</p>
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
                  nomSociete: "",
                  siteUrl: "",
                  adressePostale: "",
                  telephone: "",
                  dateCreation: "",
                });
              }}
            >
              S'inscrire
            </button>
          </div>
          <img src="/src/assets/1.png" className="image" alt="Usability Testing" />
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
                  nomSociete: "",
                  siteUrl: "",
                  adressePostale: "",
                  telephone: "",
                  dateCreation: "",
                });
              }}
            >
              Se connecter
            </button>
          </div>
          <img src="/src/assets/1.png" className="image" alt="Usability Testing" />
        </div>
      </div>
    </div>
  </>);
};

export default FormulairePartenaire;