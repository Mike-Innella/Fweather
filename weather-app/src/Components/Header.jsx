import { useState } from "react";
import React from "react";
import "../Styling/Header.css";
import "../Styling/Global.css";
import "../Styling/Queries.css";

const Header = ({ onAboutClick, onContactClick, onToggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu open/close
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="header" id="header">
      <div className="header__wrapper">
        <div className="header__logo">
          <img
            src={require("../assets/Logo Black.PNG")}
            alt="Fweather Logo"
            className="logo"
          />
        </div>
        <div className="header__title">
          <h1>
            <span className="color-text">F </span>w e a t h e r
          </h1>
        </div>

        <nav className="nav">
          <div id="navList">
            <ul className="nav__list">
              <li className="nav__link" onClick={onAboutClick}>
                About
              </li>
              <li className="nav__link" onClick={onContactClick}>
                Contact Us
              </li>
            </ul>

            <button className="contrast" onClick={onToggleTheme}>
              <i className="fa fa-adjust"></i>
            </button>

            <button className="burgerBtn" onClick={toggleMenu}>
              <i className="fa fa-bars"></i>
            </button>
          </div>

          <div className={`menu ${menuOpen ? "menu--open" : ""}`}>
            <button className="burgerClose" onClick={toggleMenu}>
              X
            </button>
            <ul className="nav__list--burger">
              <li className="nav__link" onClick={onAboutClick}>
                About
              </li>
              <li className="nav__link" onClick={onContactClick}>
                Contact Us
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
