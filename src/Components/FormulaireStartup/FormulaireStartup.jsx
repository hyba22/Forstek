import React, { useState } from "react";
import { FaFacebook, FaGoogle, FaLinkedin, FaLock, FaPhone, FaTwitter, FaUser } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TfiAgenda } from "react-icons/tfi";
import "./FormulaireStartup.css";

const FormulaireStartup = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="" className="sign-in-form">
            <h2 className="title">Login</h2>
            <div className="input-field">
              <MdEmail className="icon" />
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="input-field">
              <FaLock className="icon" />
              <input type="password" placeholder="Enter your password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
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

          <form action="" className="sign-up-form">
            <h2 className="title">Formulaire Startup</h2>
            <div className="input-field">
            <FaUser className="icon" />
              <input type="text" placeholder="Enter the name of society" />
            </div>
            <div className="input-field">
            <FaLocationPin className="icon"/>
              <input type="text" placeholder="Enter the address of society" />
            </div>
            <div className="input-field">
            <FaPhone className="icon"/>
              <input type="text" placeholder="Enter the phone of society" />
            </div>
            <div className="input-field">
            <MdEmail className="icon" />
              <input type="email" placeholder="Enter they email of society" />
            </div>
            <div className="input-field">
            <TfiAgenda className='icon'/>
                <input type="date" placeholder="Enter the date of creation" />
                
            </div>
            <div className="input-field">
              <FaLock className="icon" />
              <input type="password" placeholder="Enter your password" />
            </div>
            <input type="submit" value="Sign up" className="btn solid" />
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
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Nouvel utilisateur?</h3>
            <p>C'est par ici</p>
            <button className="btn transparent" onClick={() => setIsSignUpMode(true)}>
              Sign up
            </button>
          </div>
          <img src="/src/assets/1.png" className="image" alt="Usability Testing" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Avez-vous un compte?</h3>
            <p>c'est par ici</p>
            <button className="btn transparent" onClick={() => setIsSignUpMode(false)}>
              Sign in
            </button>
          </div>
          <img src="/src/assets/1.png" className="image" alt="Usability Testing" />
        </div>
      </div>
    </div>
  );
};

export default FormulaireStartup;