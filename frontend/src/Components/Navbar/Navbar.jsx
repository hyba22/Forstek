import React, { useState } from "react";
import styles from "./navbar.module.css";
import { IoMenu, IoSearch } from "react-icons/io5";

const Navbar = ({ onLoginClick, onSignUpClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // still search code with ai
  };

  return (
    <div className={styles.container}>
      <a className={styles.title} href="/">
        <img className={styles.logo} src="/src/assets/logo3 copy.png" />
      </a>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className={styles.searchButton}>
          <IoSearch className={styles.searchIcon} />
        </button>
      </div>
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
                S'inscrire
              </button>
              <button className={styles.btnLog} onClick={onLoginClick}>
                Se connecter
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
