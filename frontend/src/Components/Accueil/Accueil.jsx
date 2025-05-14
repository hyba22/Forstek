import React, {useState} from "react";
import styles from "./accueil.module.css";
import Carousel from "react-bootstrap/Carousel";
import Navbar from "../Navbar/Navbar";
import SignUpModal from "../Sign up/SignUpModal";
import LoginModal from "../Login/LoginModal";
import Chat from "../../../../chatbot/my-react-app/src/Components/Chat";

const Accueil = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  
    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);
  
    const openSignUpModal = () => setIsSignUpModalOpen(true);
    const closeSignUpModal = () => setIsSignUpModalOpen(false);
  
  return (
    <>
      <Navbar onLoginClick={openLoginModal} onSignUpClick={openSignUpModal} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <h1 className={styles.title}>Profitez de nos opportunités</h1>
      <div className={styles.carouselContainer}>
        <Carousel data-bs-theme="dark" className={styles.customCarousel}>
          <Carousel.Item className={styles.carouselItem}>
            <img
              className={`d-block w-100 ${styles.carouselImage}`}
              src="/src/assets/idea2.png"
              alt="First slide"
            />
            <Carousel.Caption className={styles.carouselCaption}>
              <h5>Partagez vos idées</h5>
              <p>
                Nous vous offrons la possibilté d'analyser et d'étudier vos
                idées afin de les rendre réelles.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className={styles.carouselItem}>
            <img
              className={`d-block w-100 ${styles.carouselImage}`}
              src="/src/assets/equipe1.png"
              alt="Second slide"
            />
            <Carousel.Caption className={styles.carouselCaption}>
              <h5>Nos équipes</h5>
              <p>
                Nous vous mettons en relations avec des investisseurs, startup
                et des partenaires pour grandir vos projets.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className={styles.carouselItem}>
            <img
              className={`d-block w-100 ${styles.carouselImage}`}
              src="/src/assets/internships realistic 2.png"
              alt="Third slide"
            />
            <Carousel.Caption className={styles.carouselCaption}>
              <h5>Nos offres et stages</h5>
              <p>
                Nous vous aidons à trouver un stage pour améliorer et acquérir
                des nouvelles compétences.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Chat/>
      </div>
      <div className={styles.body}>
        <div className={styles.leftSide}>
          <img className={styles.styleImg} src="/src/assets/Meeting with investor.jpeg" alt="" />
          <p className={styles.paragraphe}>
          Libérez votre créativité et partagez vos idées novatrices avec nous ! Vous rêvez de les concrétiser ? 
          Inscrivez-vous dès maintenant pour organiser une rencontre avec l’un de nos partenaires ou investisseurs et donner vie à vos projets.
          </p>
        </div>
        <div className={styles.rightSide}>
          <p className={styles.paragraphe}>
          Exprimez votre talent et partagez vos ambitions avec nous! Vous souhaitez décrocher un stage qui lance votre carrière ? 
          Inscrivez-vous dès maintenant pour planifier un entretien avec l’un de nos recruteurs et saisir cette opportunité unique.          </p>
          <img className={styles.styleImg} src="/src/assets/intern meeting.jpg" alt="" />
        </div>
      </div>
    </>
  );
};

export default Accueil;
