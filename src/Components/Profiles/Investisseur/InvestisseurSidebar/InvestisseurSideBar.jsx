import React, {useState} from 'react';
import { NavLink, useLocation } from "react-router-dom";
import styles from './investisseurSideBar.module.css';

const InvestisseurSideBar = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
  
    const toggleSidebar = () => {
      setCollapsed(!collapsed);
    };
  
    return (
      <div className={`${styles.sideBar} ${collapsed ? styles.collapsed : ""}`}>
        <div className={styles.logoContainer}>
          <img src="/src/assets/mission.gif" alt="icon" className={styles.logo} />
          <h2 className={styles.title}>Investisseur</h2>
        </div>
  
        <div className={styles.burgerContainer} onClick={toggleSidebar}>
          <div className={styles.burgerMenu}></div>
        </div>
  
        <div className={styles.profileContainer}>
          <img src="/src/assets/hiba.jpg" alt="profile" className={styles.profileImage}/>
          <div className={styles.profileContents}>
            <p className={styles.name}>Hello, Hiba</p>
            <p className={styles.email}>bouslahihiba55@gmail.com</p>
          </div>
        </div>
  
        <div className={styles.contentsContainer}>
          <ul>
            <li className={location.pathname.includes("/ListeIdees") ? styles.active : ""}>
              <img src="/src/assets/job-offer.png" alt="job" className={styles.itemIcon}/>
              <NavLink to="ListeIdees">Liste des idées</NavLink>
            </li>
            <li className={location.pathname.includes("/rendezVous") ? styles.active : ""}>
              <img src="/src/assets/calendar.png" alt="rdv" className={styles.itemIcon}/>
              <NavLink to="rendezVous">Rendez-vous</NavLink>
            </li>
            <li className={location.pathname.includes("/evaluation") ? styles.active : ""}>
              <img src="/src/assets/good-feedback.png" alt="evaluation" className={styles.itemIcon} />
              <NavLink to="evaluation">Evaluation</NavLink>
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

export default InvestisseurSideBar
