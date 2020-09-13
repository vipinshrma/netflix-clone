import React, { useEffect, useState } from "react";
import netflixLogo from "../images/Logo_Netflix.png";
import smileLogo from "../images/smile_logo.png";
import "./styles/navbar.css";
export default function Navbar() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <nav className={`nav ${show ? "nav_black" : null}`}>
      <img src={netflixLogo} className="nav-logo" alt="logo" />
      <img src={smileLogo} className="nav-avatar" alt="smile" />
    </nav>
  );
}
