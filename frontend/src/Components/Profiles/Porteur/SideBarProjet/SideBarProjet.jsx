import React, { useState } from "react";
import styles from "./SideBarProjet.module.css";
import { NavLink, useLocation } from "react-router-dom";

 
const SideBarProjet = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`${styles.sideBar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.logoContainer}>
        <img src="/src/assets/mission.gif" alt="icon" className={styles.logo} />
        <h2 className={styles.title}>Porteur</h2>
      </div>

      <div className={styles.burgerContainer} onClick={toggleSidebar}>
        <div className={styles.burgerMenu}></div>
      </div>

      <div className={styles.profileContainer}>
        <img src="/src/assets/hiba.jpg" alt="profile" className={styles.profileImage}/>
        <div className={styles.profileContents}>
          <p className={styles.name}>Hello, Nawress</p>
          <p className={styles.email}>nawressel761@gmail.com</p>
        </div>
      </div>

      <div className={styles.contentsContainer}>
        <ul>
          <li className={location.pathname.includes("depose-projet") ? styles.active : ""}>
            <img src="/src/assets/job-offer.png" alt="job" className={styles.itemIcon}/>
            <NavLink to="depose-projet">Deposer Projet</NavLink>
          </li>
          <li className={location.pathname.includes("rendv") ? styles.active : ""}>
            <img src="/src/assets/calendar.png" alt="rdv" className={styles.itemIcon}/>
            <NavLink to="rendv">Rendez-vous</NavLink>
          </li>
          <li className={location.pathname.includes("/parametres") ? styles.active : ""}>
            <img src="/src/assets/settings.png" alt="parametres" className={styles.itemIcon}/>
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

export default SideBarProjet;
