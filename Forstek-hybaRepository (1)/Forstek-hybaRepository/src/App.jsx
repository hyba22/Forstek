import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Accueil from "./Components/Accueil/Accueil";
import Contact from "./Components/contact/Contact";
import FormulairePartenaire from "./Components/Formulaires/FormulairePartenaire/FormulairePartenaire";
import FormulaireStagiaire from "./Components/Formulaires/FormulaireStagiaire/FormulaireStagiaire";
import FormulaireStartup from "./Components/Formulaires/FormulaireStartup/FormulaireStartup";
import FreelanceFormulaire from "./Components/Formulaires/Freelance/FreelanceFormulaire";
import FormulaireInvestisseur from "./Components/Formulaires/Investisseur/FormulaireInvestisseur";
import FormulairePorteurDeProjet from "./Components/Formulaires/Porteur/FormulairePorteurDeProjet";
import LoginModal from "./Components/Login/LoginModal";
import Navbar from "./Components/Navbar/Navbar";
import PartenaireProfile from "./Components/Profiles/Partenaire/PartenaireProfile";
import ParametresPartenaire from "./Components/Profiles/Partenaire/SideBarPartenaire/Pages/Parametres";
import RendezVousPartenaire from "./Components/Profiles/Partenaire/SideBarPartenaire/Pages/RendezVous";
import EvaluationProjets from "./Components/Profiles/Startup/SideBarStartup/Pages/EvaluationsProjets";
import ParametresStartup from "./Components/Profiles/Startup/SideBarStartup/Pages/Parametres";
import RendezVousStartup from "./Components/Profiles/Startup/SideBarStartup/Pages/RendezVous";
import StartupOffres from "./Components/Profiles/Startup/SideBarStartup/Pages/StartupOffres";
import Demande from "./Components/Profiles/Partenaire/SideBarPartenaire/Pages/Demande"
import Evaluations from "./Components/Profiles/Partenaire/SideBarPartenaire/Pages/Evaluations";
import StartupProfile from "./Components/Profiles/Startup/StartupProfile";
import SignUpModal from "./Components/Sign up/SignUpModal";

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
        
        <Route path="/startupprofile" element={<StartupProfile />}>
          <Route path="offres" element={<StartupOffres />} />
          <Route path="evaluation" element={<EvaluationProjets />} />
          <Route path="rendez-vous" element={<RendezVousStartup />} />
          <Route path="parametres" element={<ParametresStartup />} />
          <Route index element={<div>Dashboard Content</div>} />
        </Route>
        
        <Route path="/partenaireprofile" element={<PartenaireProfile />}>
          <Route path="demande" element={<Demande />} />
          <Route path="evaluation" element={<Evaluations />} />
          <Route path="rendez-vous" element={<RendezVousPartenaire />} />
          <Route path="parametres" element={<ParametresPartenaire />} />
          <Route index element={<div>Dashboard Content</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
