import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./Components/Accueil/Accueil";
import LoginModal from "./Components/Login/LoginModal";
import Navbar from "./Components/Navbar/Navbar";
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
import StartupOffres from "./Components/Profiles/Startup/SideBarStartup/Pages/StartupOffres";
import EvaluationProjets from "./Components/Profiles/Startup/SideBarStartup/Pages/EvaluationProjets";
import RendezVous from "./Components/Profiles/Startup/SideBarStartup/Pages/RendezVous";
import Parametres from "./Components/Profiles/Startup/SideBarStartup/Pages/Parametres";

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
        <Route
          path="/porteur-de-projet"
          element={<FormulairePorteurDeProjet />}
        />
        <Route path="/stagiaire" element={<FormulaireStagiaire />} />
        <Route path="/startup" element={<FormulaireStartup />} />
        <Route path="/partenaire" element={<FormulairePartenaire />} />
        <Route path="/freelance" element={<FreelanceFormulaire />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/startupprofile" element={<StartupProfile />}>
          <Route path="offres" element={<StartupOffres />} />
          <Route path="evaluation" element={<EvaluationProjets />} />
          <Route path="rendez-vous" element={<RendezVous />} />
          <Route path="parametres" element={<Parametres />} />
          <Route index element={<div>Dashboard Content</div>} />
        </Route>
      </Routes>
      {/**  <FooterPage/> */}
    </Router>
  );
}

export default App;
