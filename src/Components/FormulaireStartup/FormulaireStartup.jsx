import React, { useState } from 'react';
import { FaAddressBook, FaLock, FaPhone, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TfiAgenda } from "react-icons/tfi";
import './FormulaireStartup.css';

const FormulaireStartup = () => {

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
                        <input type="text" placeholder="Enter the name of society" required />
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
                    <h1>Formulaire Startup</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Enter the name of society" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Enter the address of society " required />
                        <FaAddressBook className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="number" placeholder="Enter the phone of society" required />
                        <FaPhone className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="Enter the email of society" required />
                        <MdEmail className="icon" />
                    </div>

                    <div className="input-box">
                        <input type="date" placeholder="Enter the date of creation" required />
                        <TfiAgenda className='icon'/>
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

export default FormulaireStartup;
