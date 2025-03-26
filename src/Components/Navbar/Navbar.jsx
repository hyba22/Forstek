import React, { useState } from "react";
import styles from "./navbar.module.css";
import { IoMenu } from "react-icons/io5";

const Navbar = ({ onLoginClick, onSignUpClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      <a className={styles.title} href="/">
        <img className={styles.logo} src='/src/assets/logo3 copy.png' />
      </a>
      <div className={styles.menu}>
        <IoMenu
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen ? styles.menuOpen : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a className={styles.menuItem} href="/">
              Accueil
            </a>
          </li>
          <li>
            <a className={styles.menuItem} href="/contact">
              Contact us
            </a>
          </li>
          <li>
            <a className={styles.menuItem} href="">
              Nos équipes
            </a>
          </li>
          <li>
            <div className={styles.buttons}>
              <button className={styles.btnSign} onClick={onSignUpClick}>
                Sign up
              </button>
              <button className={styles.btnLog} onClick={onLoginClick}>
                Login
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
