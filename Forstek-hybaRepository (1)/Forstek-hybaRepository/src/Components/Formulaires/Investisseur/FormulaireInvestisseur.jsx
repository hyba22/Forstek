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

const FormulaireStagiaire = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    prenom: "",
    domaine: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setError("Failed to fetch users. Please check your connection.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        domaine: formData.domaine,
        prenom: formData.prenom,
      });
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const credentials = {
        email: formData.email,
        password: formData.password,
      };
      const response = await signIn(credentials);
      console.log("Sign-in successful:", response);
      alert(`Welcome back, ${response.user.name}!`);
      setFormData({
        email: "",
        password: "",
        prenom: "",
        domaine: "",
        name: "",
      });
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSignIn} action="" className="sign-in-form">
            <h2 className="title">Connexion</h2>
            <div className="input-field">
              <MdEmail className="icon" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Mot de passe"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
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
            <div className="input-field">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Nom"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <MdCastForEducation className="icon" />
              <input
                type="text"
                placeholder="Domaine"
                name="domaine"
                value={formData.domaine}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <MdEmail className="icon" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Mot de passe"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <input type="submit" value="Sign up" className="btn solid" />
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
              onClick={() => setIsSignUpMode(true)}
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
              onClick={() => setIsSignUpMode(false)}
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

export default FormulaireStagiaire;
