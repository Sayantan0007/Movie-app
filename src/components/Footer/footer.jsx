import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-text">
          &copy; {new Date().getFullYear()}{" "}
          <span className="highlight">Sayantan Mondal</span> | All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
