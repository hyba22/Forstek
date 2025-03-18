import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from './Components/Accueil/Accueil';
import LoginModal from './Components/Login/LoginModal';
import Navbar from './Components/Navbar/Navbar';
import SignUpModal from "./Components/Sign up/SignUpModal";
import FormulaireInvestisseur from "./Components/Investisseur/FormulaireInvestisseur";
import FormulairePorteurDeProjet from "./Components/Porteur/FormulairePorteurDeProjet";
import FormulaireStagiaire from "./Components/FormulaireStagiaire/FormulaireStagiaire";
import FormulaireStartup from "./Components/FormulaireStartup/FormulaireStartup";
import FormulairePartenaire from "./Components/FormulairePartenaire/FormulairePartenaire";
import Contact from "./Components/contact/Contact";


function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  return (
    <Router>
      <Navbar onLoginClick={openLoginModal} onSignUpClick={openSignUpModal} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <Routes>
        <Route path="/" element={<Accueil />} />      
        <Route path="/investisseur" element={<FormulaireInvestisseur />} />
        <Route path="/porteur-de-projet" element={<FormulairePorteurDeProjet />} />
        <Route path="/stagiaire" element={<FormulaireStagiaire />} />
        <Route path="/startup" element={<FormulaireStartup />} />
        <Route path="/partenaire" element={<FormulairePartenaire />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;