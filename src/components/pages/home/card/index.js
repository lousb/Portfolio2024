import React, { useLayoutEffect, useRef } from 'react';
import './card.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from '../../../../utils/textElementReveal/textElementReveal';

gsap.registerPlugin(ScrollTrigger);

const Card = ({windowWidth, title, boxes, className, cardId }) => {
  const cardRef = useRef();


  useLayoutEffect(() => { 
    const cardTitleWrap = cardRef.current.querySelector('.card-title-wrap');
    const cardTitle = cardRef.current.querySelector('.card-title-wrap .title');
    const CurateImage = cardRef.current.querySelector('.card-specific-item.curate');
    const DefineImage = cardRef.current.querySelector('.card-specific-item.define');


    const handleMobileViewAnimation = () => {

    };

    const handleDesktopViewAnimation = () => {
   
// Dynamic ScrollTrigger for the card
ScrollTrigger.create({
  trigger: cardRef.current,
  start: `-${window.innerWidth * 0.0169}top`,
  end: 'max', // Stick until the end of the card
  pin: true,
  pinSpacing: false,
});

gsap.to(cardTitleWrap,{
  marginTop:()=>`-${window.innerWidth * 0.09 + (window.innerHeight * 0.1 - window.innerWidth * 0.00169) }`,
  scrollTrigger: {
    start: `-100vh top`,
    end: () => `+=${window.innerHeight * 1.3}`,
    scrub: true,
    id: `scrub-define-${cardId}`,
    trigger: cardRef.current,
  },
})
  
    };



gsap.fromTo(cardTitle, {
  y: '9svw',
}, { 
  y: '0',
  scrollTrigger: {
    start: `-${window.innerHeight * 0.5} top`,
    end: () => `+=200px`,
    scrub: true,
    id: `scrub-title-${cardId}`, 
    trigger: cardRef.current,

  },
});



   // Set up initial animations based on current window width
   if (windowWidth <= 800) {
    handleMobileViewAnimation();
  } else {
     handleDesktopViewAnimation();

   }


return () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};
  }, [  cardRef, cardId, windowWidth])
  

  useLayoutEffect(() => {

    const handleMobileViewAnimation = () => {

    };
    const handleDesktopViewAnimation = () => {
    if (className === 0) {
      gsap.fromTo('.card-specific-item.curate', {
        y: '50%',
      }, { 
        y: '-50%',
        scrollTrigger: {
          start: `-${window.innerHeight * 0.1} top`,
          end: () => `+=${window.innerHeight * 4}`,
          scrub: true,
          id: `scrub-curate-${cardId}`, 
          trigger: cardRef.current, 
        },
      });
    }

    if (className === 0) {
      gsap.fromTo('.card-specific-item.define', {
        height: '0',
      }, {
        height: 'auto',
        scrollTrigger: {
          start: `-${window.innerHeight} top`,
          end: () => `+=${window.innerHeight * 0.7}`,
          scrub: true,
          id: `scrub-define-${cardId}`,
          trigger: cardRef.current.querySelector('.card-specific-item.define'),
        },
      });
    }
    if (className === 1) {
      gsap.fromTo('.card-specific-item.js', {
        scale: '1',
      }, {
        scale: '1.2',
        scrollTrigger: {
          start: `-${window.innerHeight} top`,
          end: () => `+=${window.innerHeight * 0.7}`,
          scrub: true,
          id: `scrub-define-${cardId}`,
          trigger: cardRef.current.querySelector('.card-specific-item.js'),
        },
      });

      gsap.fromTo('.card-specific-item.three', {
        scale: '1',
      }, {
        scale: '1.2',
        scrollTrigger: {
          start: `-${window.innerHeight} top`,
          end: () => `+=${window.innerHeight * 0.7}`,
          scrub: true,
          id: `scrub-define-${cardId}`,
          trigger: cardRef.current.querySelector('.card-specific-item.three'),
        },
      });

      gsap.fromTo('.card-specific-item.visual', {
        scale: '0.9',
        rotate:'-20deg',
      }, {
        scale: '1.1',
        rotate:'-0deg',
        scrollTrigger: {
          start: `-${window.innerHeight} top`,
          end: () => `+=${window.innerHeight * 1}`,
          scrub: true,
          id: `scrub-define-${cardId}`,
          trigger: cardRef.current.querySelector('.card-specific-item.visual'),
        },
      });

     gsap.fromTo('.card-specific-item.figma', {
       scale: '1',
     }, {
       scale: '1.2',
       scrollTrigger: {
         start: `-${window.innerHeight * 0.5} top`,
         end: () => `+=${window.innerHeight * 0.7}`,
         scrub: true,
         id: `scrub-define-${cardId}`,
         trigger: cardRef.current.querySelector('.card-specific-item.figma'),
       },
     });
    }

    gsap.fromTo('.card-specific-item.adobe', {
        y: '50%',
      }, { 
        y: '-20%',
        scrollTrigger: {
          start: `-${window.innerHeight * 2} top`,
          end: () => `+=${window.innerHeight * 4}`,
          scrub: true,
          id: `scrub-adobe-${cardId}`, 
          trigger: cardRef.current.querySelector('.card-specific-item.adobe'), 
        },
      });


      gsap.fromTo('.card-specific-item.grid', {
        y: '50%',
      }, { 
        y: '-20%',
        scrollTrigger: {
          start: `-${window.innerHeight * 2} top`,
          end: () => `+=${window.innerHeight * 4}`,
          scrub: true,
          id: `scrub-grid-${cardId}`, 
          trigger: cardRef.current.querySelector('.card-specific-item.grid'), 
        },
      });
    };

      // Set up initial animations based on current window width
       if (windowWidth <= 800) {
        handleMobileViewAnimation();
      } else {
         handleDesktopViewAnimation();

       }
    
  }, [className, cardId, windowWidth]);
  




  return (
    <div className={`card card-${className}`} ref={cardRef}>
      <div className='card-title-wrap'>
        {className === 0 && (
          <h2 className='title'>Process</h2>
        )}
        {className === 1 && (
          <h2 className='title'>Development</h2>
        )}
        {className === 2 && (
          <h2 className='title'>Design</h2>
        )}
      </div>
      
      <div className="angry-grid"> 
        {boxes.map((box, index) => (
          <div key={index} className={`item-${index} grid-box`}>
            <p className="box-index">{index + 1}</p>
            <div>
                <h4 className="grid-box-title">{box.title || ''}</h4>
                <h4 className="grid-box-subtitle">{box.subtitle || ''}</h4>
            </div>

            
            
            <div className="grid-box-desc">
            {className ===2 && index === 0 && (
                <img src='/AppItems/figma.svg' alt='figma-graphic' className='card-specific-item figma'/>
              )}

              <Reveal element={'p'} textContent={box.desc}/>
              {className === 0 && index === 3 && (
                <Reveal element={'p'} textContent={box.desc2} elementClass={'box-2'}/>
              )}

              {className ===2 && index === 1 && (
                <img src='/AppItems/ADOBE.svg' alt='adobe-graphic' className='card-specific-item adobe'/>
              )}
              {className ===2 && index === 2 && (
                <img src='/AppItems/Grid.svg' alt='grid-graphic' className='card-specific-item grid'/>
              )}
         

              {className ===1 && index === 2 && (
                <img src='/AppItems/VISUAL.svg' alt='visual-graphic' className='card-specific-item visual'/>
              )}
              {className === 0 && index === 4 && (
                <img src='/AppItems/DEFINE.svg' alt='define-graphic' className='card-specific-item define'/>
              )}
            </div>

          

            {className === 0 && index === 0 && (
              <img src='/AppItems/CURATE.svg' alt='curate-graphic' className='card-specific-item curate'/>
            )}


            {className === 1 && index === 0 && (
                          <img src='/AppItems/js.svg' alt='curate-graphic' className='card-specific-item js'/>
                        )}
                        {className === 1 && index === 1 && (
                          <img src='/AppItems/three.gif' alt='curate-graphic' className='card-specific-item three'/>
                        )}

            {className === 0 && index === 2 && (
              <div className='iterate-flex'>
                <div className='card-specific-item iterate'></div>
                <div className='card-specific-item iterate'></div>
                <div className='card-specific-item iterate'></div>
                <div className='card-specific-item iterate'></div>
                <div className='card-specific-item iterate'></div>
              </div>
           )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
