import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { motion } from "framer-motion";
import { reveal, paddingReveal, opacity } from "./anim";

function Reveal({ textContent, element, elementClass, custom, variant }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const elementTop = ref.current.getBoundingClientRect().top;
        setIsVisible(elementTop < window.innerHeight);
      }
    };

    // Check on initial load
    handleScroll();

    const scrollHandler = () => {
      handleScroll();

      // Remove event listener after animation has played
      if (isVisible) {
        window.removeEventListener("scroll", scrollHandler);
      }
    };

    // Add event listener
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [isVisible]); // Add isVisible to dependency array

  const MotionComponent = motion[element] || motion.div;

  const variants = {
    initial: "initial",
    open: "open",
    closed: "closed",
  };

  const lines = textContent.split("\n").map((line, index) => {
    if (elementClass === "title" || elementClass === "heading") {
      return (
        <MotionComponent
          key={index}
          className={"text-reveal-element " + elementClass}
          variants={reveal}
          initial="initial"
          animate={isVisible ? "open" : "closed"}
          custom={custom}
        >
          {line}
        </MotionComponent>
      );
    } else {
      return (
        <MotionComponent
          key={index}
          custom={custom}
          className={"text-reveal-element " + elementClass}
        >
          {line}
        </MotionComponent>
      );
    }
  });

  if (variant === "opacity") {
    return (
      <motion.div
        className="text-reveal-container"
        ref={ref}
        variants={opacity}
        initial="initial"
        animate={isVisible ? "open" : "closed"}
        custom={custom}
      >
        {lines}
      </motion.div>
    );
  } else if (elementClass === "title" || elementClass === "heading") {
    return (
      <motion.div className="text-reveal-container" ref={ref} custom={custom}>
        {lines}
      </motion.div>
    );
  } else {
    return (
      <motion.div
        className="text-reveal-container"
        ref={ref}
        variants={paddingReveal}
        initial="initial"
        animate={isVisible ? "open" : "closed"}
      >
        {lines}
      </motion.div>
    );
  }
}

export default Reveal;
