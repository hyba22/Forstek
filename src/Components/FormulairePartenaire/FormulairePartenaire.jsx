import React, { useState } from "react";
import { CgWebsite } from "react-icons/cg";
import { FaFacebook, FaGoogle, FaLinkedin, FaLock, FaTwitter, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./FormuliarePartenaire.css";

const FormulairePartenaire = () => {
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
            <p className="social-text">Or Sign in with social platforms</p>
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
            <h2 className="title">Formulaire Partenaire</h2>
            <div className="input-field">
              <MdEmail className="icon" />
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="input-field">
              <FaUser className="icon" />
              <input type="text" placeholder="Enter the name of society" />
            </div>
            <div className="input-field">
              <CgWebsite className="icon" />
              <input type="text" placeholder="Enter the web site url" />
            </div>
            <div className="input-field">
              <FaLock className="icon" />
              <input type="password" placeholder="Enter your password" />
            </div>
            <input type="submit" value="Sign up" className="btn solid" />
            <p className="social-text">Or Sign up with social platforms</p>
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
            <h3>New here?</h3>
            <p>Lorem......</p>
            <button className="btn transparent" onClick={() => setIsSignUpMode(true)}>
              Sign up
            </button>
          </div>
          <img src="/Assets/1.png" className="image" alt="Usability Testing" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>Lorem....</p>
            <button className="btn transparent" onClick={() => setIsSignUpMode(false)}>
              Sign in
            </button>
          </div>
          <img src="/Assets/1.png" className="image" alt="Usability Testing" />
        </div>
      </div>
    </div>
  );
};

export default FormulairePartenaire;