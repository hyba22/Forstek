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
import RendezVous from "./Components/Profiles/Startup/SideBarStartup/Pages/RendezVous";
import Parametres from "./Components/Profiles/Startup/SideBarStartup/Pages/Parametres";
import InvestisseurProfile from "./Components/Profiles/Investisseur/InvestisseurProfile";
import RendezVouss from "./Components/Profiles/Investisseur/InvestisseurSidebar/Pages/Rendez-Vous";
import ListeIdees from "./Components/Profiles/Investisseur/InvestisseurSidebar/Pages/ListeIdees";
import FreelanceProfile from "./Components/Profiles/Freelance/FreelanceProfile";
import ListeProjetsFreelance from "./Components/Profiles/Freelance/FreelanceSideBar/Pages/ListeProjetsFreelance";
import StagiaireProfile from "./Components/Profiles/Stagiaire/StagiaireProfile";
import AccueilStagiaire from "./Components/Profiles/Stagiaire/AccueilStagiaire";
import SuiviDemande from "./Components/Profiles/Stagiaire/SuiviDemande";
import Deconnexion from "./Components/Profiles/Stagiaire/Deconnexion";
import PartenaireProfile from "./Components/Profiles/Partenaire/PartenaireProfile";
import Evaluations from "./Components/Profiles/Partenaire/SideBarPartenaire/Pages/Evaluations";
import RendezVousPartenaire from "./Components/Profiles/Partenaire/SideBarPartenaire/Pages/RendezVous";
import ParametresPartenaire from "./Components/Profiles/Partenaire/SideBarPartenaire/Pages/Parametres";
import Demande from "./Components/Profiles/Partenaire/SideBarPartenaire/Pages/Demande";
import DeposeProjet from "./Components/Profiles/Porteur/DeposeProjet/DeposeProjet";
import ListePorteur from "./Components/Profiles/Porteur/ListePorteur/ListePorteur";
import RendV from "./Components/Profiles/Porteur/RendV/RendV";
import SideBarProjet from "./Components/Profiles/Porteur/SideBarProjet/SideBarProjet";
import ListeProjet from "./Components/Profiles/Porteur/ListeProjet/ListeProjet";
import PorteurProfile from "./Components/Profiles/Porteur/PorteurProfile";

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
        <Route path="/contact" element={<Contact />} />
        {/* sign up forms routes */}
        <Route path="/signup">
          <Route path="investisseur" element={<FormulaireInvestisseur />} />
          <Route path="porteur" element={<FormulairePorteurDeProjet />} />
          <Route path="stagiaire" element={<FormulaireStagiaire />} />
          <Route path="startup" element={<FormulaireStartup />} />
          <Route path="partenaire" element={<FormulairePartenaire />} />
          <Route path="freelance" element={<FreelanceFormulaire />} />
        </Route>

         {/*Profiles routes */}
         {/* startup profile's routes */}
        <Route path="/profile/startup" element={<StartupProfile />}>
          <Route path="offres" element={<StartupOffres />} />
          <Route path="evaluation" element={< Evaluations/>} />
          <Route path="rendez-vous" element={<RendezVous />} />
          <Route path="parametres" element={<ParametresPartenaire />} />
          <Route index element={<div>Dashboard Content</div>} />
        </Route>
         {/* investisseur profile's routes */}
        <Route path="/profile/investisseur" element={<InvestisseurProfile/>} >
          <Route path="ListeIdees" element={<ListeProjet />} />
          <Route path="evaluation" element={<Evaluations />} />
          <Route path="rendezVous" element={<RendezVouss />} />
          <Route path="parametres" element={<ParametresPartenaire />} />
          <Route index element={<div>Dashboard Content</div>} />
        </Route>
        {/* freelancer profile's routes */}
        <Route path="/profile/freelance" element={<FreelanceProfile/>}>
          <Route path="listeProjetsFreelance" element={<ListeProjetsFreelance />} />
          <Route path="parametres" element={<ParametresPartenaire />} />
          <Route index element={<div>Dashboard Content</div>} />
        </Route>
        {/* stagiaire profile's routes */}
        <Route path="/profile/stagiaire" element={<StagiaireProfile />}>
          <Route index element={<AccueilStagiaire />} />
          <Route path="suivi-demande" element={<SuiviDemande />} />
          <Route path="parametres" element={<Parametres />} />
          <Route path="deconnexion" element={<Deconnexion />} />
          <Route path="rendez-vous" element={<RendezVous />} />
        </Route> 
        {/* partenaire profile's routes */}
        <Route path="/profile/partenaire" element={<PartenaireProfile />}>
          <Route path="demande" element={<ListeProjet />} />
          <Route path="evaluation" element={<Evaluations />} />
          <Route path="rendez-vous" element={<RendezVousPartenaire />} />
          <Route path="parametres" element={<ParametresPartenaire />} />
          <Route index element={<div>Dashboard Content</div>} />
        </Route>
        {/* porteur profile's routes */}
        <Route path="/profile/porteur" element={<PorteurProfile />}>
          <Route path="depose-projet" element={<DeposeProjet />} />
          <Route path="liste-projet" element={<ListeProjet />} />
          <Route path="rendv" element={<RendV />} />
          <Route path="parametres" element={<ParametresPartenaire />} />
        </Route>
        <Route path="liste-porteur" element={<ListePorteur />} />
      </Routes>
     <FooterPage/> 
    </Router>
  );
}

export default App;
