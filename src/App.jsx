import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from './Components/Accueil/Accueil';
import LoginModal from './Components/Login/LoginModal';
import Navbar from './Components/Navbar/Navbar';
import SignUpModal from "./Components/Sign up/SignUpModal";
import FormulaireInvestisseur from "./Components/Formulaires/Investisseur/FormulaireInvestisseur";
import FormulairePorteurDeProjet from "./Components/Formulaires/Porteur/FormulairePorteurDeProjet";
import FormulaireStagiaire from "./Components/Formulaires/FormulaireStagiaire/FormulaireStagiaire";
import FormulaireStartup from "./Components/Formulaires/FormulaireStartup/FormulaireStartup";
import FormulairePartenaire from "./Components/Formulaires/FormulairePartenaire/FormulairePartenaire";
import Contact from "./Components/contact/Contact";
import FreelanceFormulaire from "./Components/Formulaires/Freelance/FreelanceFormulaire";
import FooterPage from "./Components/Footer/FooterPage";
import StartupProfile from "./Components/Profiles/Startup/StartupProfile";
import StagiaireProfile from "./Components/Profiles/Stagiaire/StagiaireProfile";
import Parametres from "./Components/Profiles/Stagiaire/Parametres";
import SuiviDemande from "./Components/Profiles/Stagiaire/SuiviDemande";
import Deconnexion from "./Components/Profiles/Stagiaire/Deconnexion";

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
        <Route path="/freelance" element={<FreelanceFormulaire />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/startupprofile" element={<StartupProfile />} />
        <Route path="/stagiaire-profile" element={<StagiaireProfile />} />
        <Route path="/stagiaire/parametres" element={<Parametres />} />
        <Route path="/stagiaire/suivi-demande" element={<SuiviDemande />} />
        <Route path="/stagiaire/deconnexion" element={<Deconnexion/>} />

      </Routes>
      <FooterPage/>
    </Router>
  );
}

export default App;