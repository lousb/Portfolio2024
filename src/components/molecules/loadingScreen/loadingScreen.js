import React, { useState, useEffect, useRef } from 'react';
import { TweenMax, Power3, TimelineMax, gsap } from 'gsap';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);
  const columnsRef = useRef([]);
  const [intervalCount, setIntervalCount] = useState(0);
  const [timeline, setTimeline] = useState(null);

  // //unrendering timer
  // setTimeout(() => {
  //   setIsRendered(false);
  // }, 6500);


  useEffect(() => {
    if (isVisible) {
      const tl = new TimelineMax();
      setTimeline(tl);
      repeatAnimation(tl);
    } else {
      // Cleanup when component unmounts or isVisible becomes false
      if (timeline) {
        timeline.kill(); // Cancel GSAP animations
      }
      clearInterval(intervalCount); // Clear the interval
    }

    // Event listener for scroll
    const handleScroll = (tl) => {
        if (window.scrollY > 0) {
          // If scrolled past the top, trigger final animation immediately
          finalAnimation(tl);
          setTimeout(() => {
            setIsRendered(false);
          }, 3200);
        }
      };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  const finalAnimation = (tl) => {
    gsap.to('.site-title', {
      y: 0,
      duration: 1,
      delay:0.6,
      ease: 'power2.out',
      transform: 'scale(1)',
    });
    gsap.to('.site-title-container', {
      duration: 2,
      height: 'auto',
      delay: 0.2,
      ease: 'power2.out',
    onComplete: () => {
        setIsVisible(false);
    },
    });
    gsap.to('.main-page-intro', {
      duration: 1,
      opacity: 1,
      delay: 1.8,
    });
  };
 

 const repeatAnimation = () => {
   let count = 0;
   const itemHeight = 1; // Height of each item

   // Define the loop function
   const animationLoop = () => {
    if(isRendered){
     gsap.to(
       columnsRef.current[1].children,
       {
        y: `-${count}em`,
         ease: Power3.easeInOut,
         duration: 0.7,
         onComplete: () => {
       
            count++; // Increment count on each animation iteration
          


           if ((count === 4 || count === 5) && isRendered) { // Check for the 4th iteration
             gsap.to(
               columnsRef.current[0].children,
               {
                 y: `-=1em`,
                 ease: Power3.easeInOut,
                 duration: 0.7,
                 onComplete:()=>{finalAnimation()},
               }
             );
           }

           if (isRendered) { // Check if the animation should continue
             animationLoop(); // Continue the loop
           }
         },
       }
     );}
   };

   // Start the animation loop
   animationLoop();
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
