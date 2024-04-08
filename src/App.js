// App.js
import React, { useState, useEffect } from "react";
import './App.css';

//components
import Header from './components/molecules/header/simple/header';
import PageContent from './components/pages/pageContent.js';
import Footer from './components/molecules/footer/small/footer.js';
import useScroll from "./utils/useScroll.js";
import CircleCursor from "./utils/circleCursor.js";
import gsap, { TweenMax } from 'gsap'; // Import GSAP library

//context - Make sure to use the correct import name here
import MouseCursor from "./utils/mouseCursor";

function App() {
  const isScrolled = useScroll();
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseDown = (event) => {
      // Check if the mouse down event target is not a link
      if (!event.target.closest('a')) {
        setMouseDown(true);
      }
    };

    const handleMouseUp = () => {
      setMouseDown(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(()=>{
    if(isScrolled){
      gsap.to('.header-page-id > p', {
        opacity: 1,
        y: '0.1em',
        duration: 1,
        ease: "power2.out",
        delay: 0.1,
      });
    }else{
      return
    };

  },[isScrolled])
  
  return (
    <div className={`App ${isScrolled ? 'scrolled' : ''} ${mouseDown ? 'mousedown' : ''}`}>
      {/* <div className='grid-overlay'></div> */}
      <Header/>
      <PageContent/>
      <CircleCursor/>
      <div className="page-background"></div>
    </div>
  );
}

export default App;
