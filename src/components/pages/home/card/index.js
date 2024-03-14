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


    const handleMobileViewAnimation = () => {

    };
    const handleTabletViewAnimation = () => {

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

gsap.to(cardRef.current.querySelector('.card-title-wrap'),{
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

// Dynamic animations specific to this card:
gsap.fromTo(cardRef.current.querySelector('.card-specific-item.curate'), {
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

gsap.fromTo(cardRef.current.querySelector('.card-specific-item.define'), {
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

   // Set up initial animations based on current window width
   if (windowWidth <= 800) {
    handleMobileViewAnimation();
  } else {
     handleDesktopViewAnimation();
     console.log(`windowwidth ${windowWidth}`)
   }


return () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};
  }, [  cardRef, cardId, windowWidth])




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
              <Reveal element={'p'} textContent={box.desc}/>
              {className === 0 && index === 3 && (
                <Reveal element={'p'} textContent={box.desc2} elementClass={'box-2'}/>
              )}
              {className === 0 && index === 4 && (
                <img src='/AppItems/DEFINE.svg' alt='define-graphic' className='card-specific-item define'/>
              )}
            </div>

          

            {className === 0 && index === 0 && (
              <img src='/AppItems/CURATE.svg' alt='curate-graphic' className='card-specific-item curate'/>
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
