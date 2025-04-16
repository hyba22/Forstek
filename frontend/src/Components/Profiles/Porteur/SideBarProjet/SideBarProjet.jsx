import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./SideBarProjet.module.css";

const SideBarStartup = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={styles.layoutContainer}>
      {}
      <div className={`${styles.sideBar} ${collapsed ? styles.collapsed : ""}`}>
        <div className={styles.logoContainer}>
          <img src="/src/assets/mission.gif" alt="icon" className={styles.logo} />
          <h2 className={styles.title}>Startup</h2>
        </div>

        <div className={styles.burgerContainer} onClick={toggleSidebar}>
          <div className={styles.burgerMenu}></div>
        </div>

        <div className={styles.profileContainer}>
          <img 
            src="/src/assets/435922067_3778167599177347_6082049368084521147_n.jpg" 
            alt="profile" 
            className={styles.profileImage}
          />
          <div className={styles.profileContents}>
            <p className={styles.name}>Hello</p>
            <p className={styles.email}>nawressel761@gmail.com</p>
          </div>
        </div>

        <div className={styles.contentsContainer}>
          <ul>
            <li className={location.pathname.includes("depose-projet") ? styles.active : ""}>
              <img src="/src/assets/job-offer.png" alt="job" className={styles.itemIcon}/>
              <NavLink to="depose-projet">Depose Projet</NavLink>
            </li>
            <li className={location.pathname.includes("rendv") ? styles.active : ""}>
              <img src="/src/assets/calendar.png" alt="rdv" className={styles.itemIcon}/>
              <NavLink to="rendv">Rendez-vous</NavLink>
            </li>
            <li className={location.pathname.includes("parametres") ? styles.active : ""}>
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

      {}
      <div className={`${styles.mainContent} ${collapsed ? styles.collapsedContent : ""}`}>
        <Outlet /> {}
      </div>
    </div>
  );
};

export default SideBarStartup;