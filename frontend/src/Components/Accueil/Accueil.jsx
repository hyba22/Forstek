import React from 'react';
import styles from './accueil.module.css';
import Carousel from 'react-bootstrap/Carousel';

const Accueil = () => {
  return (
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
            <p>Nous vous offrons la possibilté d'analyser et d'étudier vos idées afin de les rendre réelles.</p>
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
            <p>Nous vous mettons en relations avec des investisseurs, startup et des partenaires pour grandir vos projets.</p>
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
              Nous vous aidons à trouver un stage pour améliorer et acquérir des nouvelles compétences.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Accueil;