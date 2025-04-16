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
  
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp({
        ...formData,
        role: "stagiaire"
      });
      navigate("/stagiaire", { 
        state: { user: response.user } 
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn({
        email: formData.email,
        password: formData.password
      })
      navigate(`/${response.user.role.toLowerCase()}`); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="sign-in-form">
            <h2 className="title">Connexion Stagiaire</h2>
            {/* Email Input */}
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
            </div>
            {/* Password Input */}
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
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn solid">
              Se connecter
            </button>
          </form>

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="sign-up-form">
            <h2 className="title">Inscription Stagiaire</h2>
            {/* Name Input */}
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
            </div>
            {/* First Name Input */}
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
            </div>
            {/* Domain Input */}
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
            </div>
            {/* Email Input */}
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
            </div>
            {/* Password Input */}
            <div className="input-field">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Mot de passe"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn solid">
              S'inscrire
            </button>
          </form>
        </div>
      </div>

      {/* Toggle between sign in/up */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Nouveau stagiaire?</h3>
            <p>Créez votre compte ici</p>
            <button
              className="btn transparent"
              onClick={() => setIsSignUpMode(true)}
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
              onClick={() => setIsSignUpMode(false)}
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