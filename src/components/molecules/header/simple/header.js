import React, { useState, useEffect, useLayoutEffect } from "react";
import styles from './header.module.css';
import { motion } from "framer-motion";
import { translate } from "./anim";
import Hamburger from "../../../atoms/buttons/hamburger/hamburger.js";
import gsap from "gsap";

function Header() {
  // State variables to manage header and navigation visibility
  const [isActive, setIsActive] = useState(false); // Header active (toggled) state
  const [isNavVisible, setIsNavVisible] = useState(false); // Navigation visibility state
  const [isHovered, setIsHovered] = useState(false); // Hover state for header-menu-toggler




  // Function to handle hover start
  // const handleHoverStart = () => {
  //   setIsHovered(true);
  // };

  // // Function to handle hover end
  // const handleHoverEnd = () => {
  //   setIsHovered(false);
  // };

  // Use useEffect to watch isHovered state and update isActive accordingly
  // useEffect(() => {
  //   if (!isHovered && isActive) {
  //     setIsActive(false);
  //     setIsNavVisible(false);
  //   }
  // }, [isHovered, isActive]);

  // Function to handle header toggling
  const handleHeaderToggle = () => {
    setIsActive((prevIsActive) => !prevIsActive); // Toggle isActive state
    setIsNavVisible(true); // Set navigation visibility to true
  };

  // Function called when navigation exit animation completes
  const handleNavExitComplete = () => {
    if (!isHovered) {
      setIsNavVisible(false); // Set navigation visibility to false after exit animation if not hovered
    }
  };

  // Function to animate each character of the link text
  const animateChars = (title, toggle) => {
    return title.split("").map((char, index) => (
      // Framer Motion span for each animated character
      <motion.span
        custom={[0.15 + index * 0.02, (title.length - index) * 0.01]}
        variants={translate}
        initial="initial"
        animate={!isActive ? (toggle === "toggle" ? "open" : "closed") : toggle === "toggle" ? "closed" : "open"}
        key={`c_${index}`}
      >
        {char}
      </motion.span>
    ));
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    setIsActive(false);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    // Framer Motion header element
    <header
      className={`${styles["minimal-header"]} minimal-header ${isActive ? `${styles["header-toggled"]} header-toggled` : ''}`} // Set class names based on isActive state
 
    >
      {/* Inner content of the header */}
      <div className={styles["header-inner-content"]}> {/* Set class name for inner content */}
        {/* Header logo */}

        {/* Hamburger menu icon */}
        <div
          className={`${styles["header-menu-toggler"]}  header-menu-toggler`}
          // onMouseEnter={handleHoverStart}
          // onMouseLeave={handleHoverEnd}
        >
          <div
            className={`${styles["header-hamburger"]} header-hamburger hoverable`}
            onClick={handleHeaderToggle} // Call handleHeaderToggle when clicked
          >
            <Hamburger isActive={isActive} /> {/* Pass isActive prop to Hamburger component */}
          </div>

          <div className={`${styles["header-menu-expanded"]} header-menu-expanded`}>
            <div className={`${styles['return-home-button']} return-home-button hoverable`}>
              <a href="/">Home</a>
            </div>
            <div className={`${styles["header-page-id"]} header-page-id`}>
              <p>About</p>
              <p>Projects</p>
           
            </div>
            <div>
            <a onClick={() => scrollToSection('page-one')}>{animateChars('Home')}</a>
              <a onClick={() => scrollToSection('page-two')}>{animateChars('About')}</a>
              <a onClick={() => scrollToSection('page-three')}>{animateChars('Projects')}</a>
              <a onClick={() => scrollToSection('contact')}>{animateChars('Contact')}</a>
            </div>
            <div>
              <a href="https://www.instagram.com/wyeeeeeeeeeeeeeeeth/" target="_blank" rel="noreferrer">{animateChars('Instagram ')}</a>
              <a href={`${process.env.PUBLIC_URL}/Resume-Louis-Wyeth-2024.pdf`} rel="noopener noreferrer" target="_blank">{animateChars('Resumé ')}</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
