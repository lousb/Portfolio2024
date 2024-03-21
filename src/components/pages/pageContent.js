// App.js
import React, { useEffect } from "react";
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

  return (
    <div className="page-content">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:projectId" element={<Project />} />
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}



export default PageContent;
