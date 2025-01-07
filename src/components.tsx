import React, { useState } from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Pexels</div>
      <ul className="navbar-links">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export { Navbar };
