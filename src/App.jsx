import React, { useState } from "react";
import Accueil from './Components/Accueil/Accueil';
import LoginModal from './Components/Login/LoginModal';
import Navbar from './Components/Navbar/Navbar';
import InvestisseurLog from "./Components/Investisseur/InvestisseurLog";
import SignUpModal from "./Components/Sign up/SignUpModal";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  return (
    <>
      <Navbar onLoginClick={openLoginModal} onSignUpClick={openSignUpModal} />
      <Accueil />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} />
      <InvestisseurLog/>
    </>
  );
}

export default App;