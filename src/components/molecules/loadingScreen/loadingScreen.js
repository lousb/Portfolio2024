import React, { useState, useEffect, useRef } from 'react';
import { TweenMax, Power3, TimelineMax, gsap } from 'gsap';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);
  const columnsRef = useRef([]);
  const [intervalCount, setIntervalCount] = useState(0);
  const [timeline, setTimeline] = useState(null);

  //unrendering timer
  


useEffect(() => {
  // Define a variable to store the animation loop
  let animationLoopId;

  // Start the animation loop
  if (isVisible) {
    const tl = new TimelineMax();
    setTimeline(tl);
    animationLoopId = repeatAnimation(tl);
  }

  // Cleanup function
  return () => {
    // Stop GSAP animations
    if (timeline) {
      timeline.kill();
    }
    clearInterval(intervalCount); // Clear the interval

    // Stop the animation loop
    cancelAnimationFrame(animationLoopId);
  };

}, [isVisible]);
  
useEffect(() => {
  // Event listener for scroll
  const handleScroll = () => {
    if (window.scrollY > 0) {
      // If scrolled past the top, trigger final animation immediately
      finalAnimation();
      setTimeout(() => {
        setIsRendered(false);
      }, 2200);
    }
  };

  window.addEventListener('scroll', handleScroll);

  // Cleanup function for removing event listener
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };

}, []);


  const finalAnimation = () => {
    const titleElement = document.querySelector('.site-title');
    const titleContainerElement = document.querySelector('.site-title-container');

    if (titleElement && titleContainerElement) {
      gsap.to(titleElement, {
        y: 0,
        duration: 1,
        delay: 0.4,
        ease: 'power2.out',
        transform: 'scale(1)',
      });
      gsap.to(titleContainerElement, {
        duration: 1.5,
        height: 'auto',
        ease: 'power2.out',
        onComplete: () => {
          setIsVisible(false);
        },
      });
      gsap.to('.main-page-intro', {
        duration: 1,
        opacity: 1,
        delay: 1.4,
      });
    } else {
      setIsVisible(false); // Set isVisible to false if the elements are not found
    }
  };
  
 

const repeatAnimation = (tl) => {
  let count = 0;
  const itemHeight = 1; // Height of each item

  // Define the loop function
  const animationLoop = () => {
    if (isRendered) {
      const columnRef = columnsRef.current[1];
      if (columnRef && columnRef.children) {
        gsap.to(
          columnRef.children,
          {
            y: `-${count}em`,
            ease: Power3.easeInOut,
            duration: 0.7,
            onComplete: () => {
              count++; // Increment count on each animation iteration

              if ((count === 4 || count === 5) && isRendered) { // Check for the 4th iteration
                const firstColumnRef = columnsRef.current[0];
                setTimeout(()=>{
                  finalAnimation();
                }, 800)
                if (firstColumnRef && firstColumnRef.children) {
                  gsap.to(
                    firstColumnRef.children,
                    {
                      y: `-=1em`,
                      ease: Power3.easeInOut,
                      duration: 0.7,
                      
                    }
                  );
                }
              }
              if ((count === 6) && isRendered) {
                
                setTimeout(() => {
                  setIsRendered(false);
                }, 1600);
                return;
              }

              if (isRendered) { // Check if the animation should continue
                animationLoopId = requestAnimationFrame(animationLoop); // Continue the loop
              }
            },
          }
        );
      }
    }
  };

  // Start the animation loop and return the animation loop ID
  let animationLoopId = requestAnimationFrame(animationLoop);
  return animationLoopId;
};
        
      
  
  
  return (
    <>
    {isRendered && 
    <div
      className={`loading-container ${isVisible ? '' : 'hide'}`}
      style={styles.container}
    >
      <div className='loading-numbers' style={styles.loadingNumbers}>
        <div
          style={styles.numColumn}
          ref={(el) => (columnsRef.current[0] = el)}
          className='num-column-1 title'
        >
          <span>0</span>
          <span>1</span>
        </div>
        <div
          style={styles.numColumn}
          ref={(el) => (columnsRef.current[1] = el)}
          className='num-column-2 title'
        >
          <span>00</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>00</span>
        </div>
      </div>
      <div className='site-title-container'>
        <div className='site-title-wrap'>
          <h1 className='site-title'>LOUIS WYEEETH</h1>
        </div>
      </div>
    </div>
    }
      
    </>
  );
};

const styles = {
  container: {
    PointerEvent: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9900,
    clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)',
  },
  loadingNumbers: {
    display:'none',
    fontSize: '5em',
    fontWeight: '600',
    height: '1em',
    overflow: 'hidden',
  
  },
  numColumn: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '1em',
  },
};

export default LoadingScreen;
