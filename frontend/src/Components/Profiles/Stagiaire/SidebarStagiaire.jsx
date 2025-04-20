import React, { useState } from "react";
import styles from "./SidebarStagiaire.module.css";
import { NavLink, useLocation } from "react-router-dom";

const SidebarStagiaire = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`${styles.sideBar} ${collapsed ? styles.collapsed : ""}`}>
    <div className={styles.logoContainer}>
      <img src="/src/assets/mission.gif" alt="icon" className={styles.logo} />
      <h2 className={styles.title}>Stagiaire</h2>
    </div>

    <div className={styles.burgerContainer} onClick={toggleSidebar}>
      <div className={styles.burgerMenu}></div>
    </div>

    <div className={styles.profileContainer}>
      <img src="/src/assets/jesser.jpg" alt="profile" className={styles.profileImage}/>
      <div className={styles.profileContents}>
        <p className={styles.name}>Hello, jesser</p>
        <p className={styles.email}>jass@gmail.com</p>
      </div>
    </div>
 
      <div className={styles.contentsContainer}>
        <ul>
          <li className={location.pathname.includes("suivi-demande") ? styles.active : ""}>
            <img src="/src/assets/Demande.png" alt="suivi" className={styles.itemIcon} />
            <NavLink to="suivi-demande">Suivi de demande</NavLink>
          </li>
          <li className={location.pathname.includes("offres-dispo") ? styles.active : ""}>
            <img src="/src/assets/job-offer.png" alt="offres" className={styles.itemIcon} />
            <NavLink to="offres-dispo">Offres disponibles</NavLink>
          </li>
          <li className={location.pathname.includes("rendez-vous") ? styles.active : ""}>
            <img src="/src/assets/calendar.png" alt="rdv" className={styles.itemIcon}/>
            <NavLink to="rendez-vous">Rendez-vous</NavLink>
          </li>
          <li className={location.pathname.includes("parametres") ? styles.active : ""}>
            <img src="/src/assets/settings.png" alt="parametres" className={styles.itemIcon} />
            <NavLink to="parametres">Paramètres</NavLink>
          </li>
          <li>
            <img src="/src/assets/logout.png" alt="deconnexion" className={styles.itemIcon}/>
            <NavLink to="/">Déconnexion</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarStagiaire;