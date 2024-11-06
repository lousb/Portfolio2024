import React, { useEffect, useState, lazy, Suspense } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Home from './home/home';
import Lenis from "@studio-freight/lenis";
import Project from "./project/project";
import Footer from "../molecules/footer/small/footer";

function PageContent() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.3,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      lerp: 0.8,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

  }, []);

  const [isHomeLoaded, setIsHomeLoaded] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  // Function to handle the Home component loading
  const handleHomeLoad = () => {
    setIsHomeLoaded(true); // Set isHomeLoaded to true when Home component is loaded
  };

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(userAgent);
    const isMacBook = /Macintosh/.test(userAgent);
    setIsSafari(isSafariBrowser && isMacBook);
  }, []);

  return (
    <div className="page-content">
    
        
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <div className={`${!isHomeLoaded ? 'loading' : ''}`}>
                    <Home onLoad={handleHomeLoad} />
                  </div>
                }
              />
              <Route path="/:projectId" element={<Project />} />
            </Routes>
          </Router>
        

      <Footer />
    </div>
  );
}

export default PageContent;
