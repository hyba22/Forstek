import React, { useState } from 'react';
import { FaLock, FaUser } from "react-icons/fa";
import { MdCastForEducation, MdEmail } from "react-icons/md";
import './FormulaireStagiaire.css';

const FormulaireStagiaire = () => {

    const [action, setAction] = useState('');  

    const registerLink = () => {
        setAction('active'); 
    };

    const loginLink = () => {
        setAction(''); 
    };

    return (
        <div className={`wrapper ${action}`}>
            <div className="form-box login">
                <form>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Enter your username" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Enter your password" required />
                        <FaLock className="icon" />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" /> Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form>
                    <h1>Formulaire Stagiaire</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Enter your firstname" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Enter your lastname" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Enter your domain" required />
                        <MdCastForEducation className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="Enter your email" required />
                        <MdEmail className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Enter your password" required />
                        <FaLock className="icon" />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" /> I agree to the terms & conditions</label>
                    </div>
                    <button type="submit">SignUp</button>
                    <div className="register-link">
                        <p>I already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormulaireStagiaire;
