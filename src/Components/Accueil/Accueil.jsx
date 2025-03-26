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
            src="/src/assets/logo3 copy.png"
            alt="First slide"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={styles.carouselItem}>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src="/src/assets/logo2.png"
            alt="Second slide"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={styles.carouselItem}>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src="/src/assets/logo1.png"
            alt="Third slide"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h5>Third slide label</h5>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Accueil;