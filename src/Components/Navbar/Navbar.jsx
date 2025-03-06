import React from 'react';
import styles from './navbar.module.css';

const Navbar = ({ onLoginClick, onSignUpClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Forstek</h1>
      </div>
      <div className={styles.menu}>
        <a className={styles.menuItem} href="">Accueil</a>
        <a className={styles.menuItem} href="">Contact us</a>
        <a className={styles.menuItem} href="">Nos équipes</a>
      </div>
      <div className={styles.buttons}>
        <button className={styles.btnSign} onClick={onSignUpClick}>Sign up</button>
        <button className={styles.btnLog} onClick={onLoginClick}>Login</button>
      </div>
    </div>
  );
};

export default Navbar;