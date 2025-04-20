import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <div className={styles.contactPage}>
      <div className={styles.heroSection}>
        <h1>Nous contacter</h1>
        <p>Une question, un projet ? Notre équipe est à votre écoute.</p>
      </div>

      <div className={styles.contactGrid}>
        <div className={styles.contactCard}>
          <div className={styles.iconCircle}>
            <FaEnvelope className={styles.contactIcon} />
          </div>
          <h3>Email</h3>
          <p>contact@forstek.com</p>
          <p>support@forstek.com</p>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.iconCircle}>
            <FaPhone className={styles.contactIcon} />
          </div>
          <h3>Téléphone</h3>
          <p>+216 71 580 334</p>
          <p>Service client: 9h-18h</p>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.iconCircle}>
            <FaMapMarkerAlt className={styles.contactIcon} />
          </div>
          <h3>Adresse</h3>
          <p>5 Rue Abderrahmen Ibn Zied</p>
          <p>2042 Tunis, Tunisie</p>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.iconCircle}>
            <FaClock className={styles.contactIcon} />
          </div>
          <h3>Horaires</h3>
          <p>Lundi-Vendredi: 9h-18h</p>
          <p>Samedi: 10h-14h</p>
        </div>
      </div>

      <div className={styles.teamSection}>
        <h2>Notre équipe</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <div className={styles.memberPhoto}>
            <img src="/src/assets/jesser.jpg" alt="Jesser Ben Salah" />
            </div>
            <h4>Jesser Ben Salah</h4>
            <p>Directeur commercial</p>
            <p>jesser@forstek.com</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberPhoto}>
              <img src="/src/assets/nawress.jpg" alt="Nawress El Abed" />
            </div>
            <h4>Nawress El Abed</h4>
            <p>Responsable clientèle</p>
            <p>nawress@forstek.com</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberPhoto}>
            <img src="/src/assets/hiba.jpg" alt="Hiba Bouslahi" />
            </div>
            <h4>Hiba Bouslahi</h4>
            <p>Support technique</p>
            <p>hiba@forstek.com</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberPhoto}>
            <img src="/src/assets/sarra.jpg" alt="Sarra Charfi" />
            </div>
            <h4>Sarra Charfi</h4>
            <p>Ressources Humaines</p>
            <p>sarra@forstek.com</p>
          </div>
        </div>
      </div>

      <div className={styles.mapSection}>
        <h2>Nous trouver</h2>
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.847517468861!2d10.1555418!3d36.8499143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd33003988e799%3A0xf7e4c8e643cb3c01!2s5%2C%20Rue%20Abderrahmen%20ibn%20ziad%20cit%C3%A9%20Ettahrir!5e0!3m2!1sen!2stn!4v1712345678901!5m2!1sen!2stn"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps - Notre localisation"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
