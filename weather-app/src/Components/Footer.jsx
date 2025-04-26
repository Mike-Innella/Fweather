import React from "react";
import "../Styling/Footer.css";
import logo from "../assets/Logo Black.PNG"; // Replaces require

const Footer = ({ onAboutClick, onContactClick }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e) => {
    e.preventDefault(); // Prevents the default anchor jump
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    onAboutClick();
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    onContactClick();
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <img src={logo} alt="Fweather Logo" className="logo" />
        </div>

        <div className="footer__content">
          <div className="footer__section">
            <h3>Fweather</h3>
            <p>Get accurate weather forecasts for any location worldwide.</p>
          </div>

          <div className="footer__section">
            <h3>Quick Links</h3>
            <ul className="footer__links">
              <li>
                <a href=" " onClick={scrollToTop}>
                  Home
                </a>
              </li>
              <li>
                <a href=" " onClick={handleAboutClick}>
                  About
                </a>
              </li>
              <li>
                <a href=" " onClick={handleContactClick}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__section">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a
                href=" "
                onClick={(e) => e.preventDefault()}
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-facebook" />
              </a>
              <a
                href=" "
                onClick={(e) => e.preventDefault()}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-instagram" />
              </a>
              <a
                href="https://github.com/Mike-Innella"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-github" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {currentYear} Fweather. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
