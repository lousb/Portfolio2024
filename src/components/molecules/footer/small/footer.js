import React, { useState, useRef, useEffect } from "react";
import styles from './footer.module.css';
import { motion } from "framer-motion";
import { translate } from "./anim";

function Footer() {
  const footerRef = useRef(null);
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  function handleGetInTouchClick() {
    const getInTouchElement = document.querySelector(".get-in-touch");
    const email = "louisjwyeth@gmail.com";
    
    navigator.clipboard.writeText(email)
      .then(() => {
        setIsEmailCopied(true);
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust this threshold as needed
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && isEmailCopied) {
          setIsEmailCopied(false);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(footerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isEmailCopied]);

  return (
    <section className="page-five page" id="contact" ref={footerRef}>
      <div className={`footer-dialouge ${isEmailCopied ? 'email-copied' : ''}`}>
        <div className="acknowledgement-of-country">
          <p className="acknowledgement-p">
            I respectfully acknowledge the Gadigal people of the Eora Nation as the Traditional Custodiants of the land. Sydney, Australia.
          </p>
        </div>
        <div className="footer-links">
          <a className="main-page-button-primary" target="_blank" href="https://www.instagram.com/wyeeeeeeeeeeeeeeeth/" rel="noreferrer">
            Instagram
          </a>
          <a className="main-page-button-primary" href={`${process.env.PUBLIC_URL}/Resume-Louis-Wyeth-2024.pdf`} rel="noopener noreferrer" target="_blank">
            Resumé
          </a>
        </div>
      </div>
      <div className="contact-wrap">
        <div className={`get-in-touch title hoverable ${isEmailCopied ? 'email-copied' : ''}`} onClick={handleGetInTouchClick}>
          {isEmailCopied ? 'Email Copied' : 'Get in Touch'}
        </div>
      </div>
    </section>
  );
}

export default Footer;
