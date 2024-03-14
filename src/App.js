// App.js
import React from "react";
import './App.css';

//components
import Header from './components/molecules/header/simple/header';
import PageContent from './components/pages/pageContent.js';
import Footer from './components/molecules/footer/small/footer.js';
import useScroll from "./utils/useScroll.js";
import CircleCursor from "./utils/circleCursor.js";
import { TweenMax } from 'gsap'; // Import GSAP library

//context - Make sure to use the correct import name here
import MouseCursor from "./utils/mouseCursor";

function App() {
  const isScrolled = useScroll();
  
 

  return (

      <div className={`App ${isScrolled ? 'scrolled' : ''}`}>
        {/* <div className='grid-overlay'></div> */}
        <Header/>
        <PageContent/>
        <CircleCursor/>
        <div className="page-background">      </div>
      </div>

  );
}

export default App;
