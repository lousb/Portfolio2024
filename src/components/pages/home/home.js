// App.js
import React, {Suspense, useRef, useEffect, useState, useLayoutEffect} from "react";
import './home.css';

import { Canvas, useThree  } from "@react-three/fiber";
import { Vector3 } from 'three';
import data from './cameraPositions.json';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from './projectsData';


import { AnimatePresence, useScroll, motion, easeOut } from "framer-motion";
import processData from "./card/processData";
import Card from "./card";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import DelayLink from "../../../utils/delayLink";
import Reveal from "../../../utils/textElementReveal/textElementReveal";
import SmoothScrollLink from "../../../utils/scrollLink";
import LoadingScreen from "../../molecules/loadingScreen/loadingScreen";



gsap.registerPlugin(ScrollTrigger);

function Home() {
  const LouisModel = React.lazy(() => import("../../../Models/FloatingHead/FloatingHead"));
  const EsotericModel = React.lazy(() => import("../../../Models/Esoteric/EsotericModel"));
  const MacsModel = React.lazy(() => import("../../../Models/Macsdona/macsModel"));
  const InkaModel = React.lazy(() => import("../../../Models/Inka/inkaModel"));
  const AMPModel = React.lazy(() => import("../../../Models/AMP/ampModel"));
  const KahilModel = React.lazy(() => import("../../../Models/KahilFoods/kahilFoods"));
  const BeanModel = React.lazy(() => import("../../../Models/BeanScene/beanScene"));

  const pageRef = useRef(null);
  const sectionRefs = {
    introduction: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    processes: useRef(null),
  };
  
  const [scrollPosition, setScrollPosition] = useState(0);



  const [isModelHidden, setIsModelHidden] = useState(false); 
 
  const [activeTileIndex, setActiveTileIndex] = useState(0);
  
  const [moreActive, setMoreActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

const { position } = data[activeTileIndex];


const { x, y, z } = position;


useLayoutEffect(() => {
  const handleResize = () => {
    const newWindowWidth = window.innerWidth;
    const newWindowHeight = window.innerHeight;

    setWindowWidth(newWindowWidth);
    
  };

    gsap.fromTo('.header-page-id',
    {
      opacity:0,
    },{
      opacity:1,
      delay:0.5,
      duration:0.5
    })

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(document.body);

  return () => {
    resizeObserver.disconnect();
  };
}, []);


function CameraPositioning() {
  const { camera } = useThree();
  const [position, setPosition] = useState(camera.position.clone());
  const [targetPosition, setTargetPosition] = useState(new Vector3(x, y, z));

  const animationRef = useRef(null);
  const animationStartTimeRef = useRef(null);
  const animationDuration = 1900; // milliseconds

  useEffect(() => {
    // Start the animation when the target position changes
    animationStartTimeRef.current = performance.now();
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animateCameraPosition);

    return () => {
      // Stop the animation when the component unmounts
      cancelAnimationFrame(animationRef.current);
    };
  }, [targetPosition]);
  
  const easeOutCubic = t => 1 - (({ pow }) => pow(1 - t, 3))({ pow: Math.pow });

  
  function animateCameraPosition(timestamp) {
    const timeElapsed = timestamp - animationStartTimeRef.current;
    const progress = Math.min(timeElapsed / animationDuration, 1);
  
    const easedProgress = easeOutCubic(progress);
  
    const currentX = position.x + (targetPosition.x - position.x) * easedProgress;
    const currentY = position.y + (targetPosition.y - position.y) * easedProgress;
    const currentZ = position.z + (targetPosition.z - position.z) * easedProgress;
  


    setPosition(new Vector3(currentX, currentY, currentZ));
    if (progress < 1) {
      // Continue the animation until it's finished
      animationRef.current = requestAnimationFrame(animateCameraPosition);
    }
  }
  

  camera.position.copy(position);

  return null;
}





  useLayoutEffect(() => { 
     
    
    const LouisCanvasPin = () => {
    
    };

    const handleMobileViewAnimation = () => {
    gsap.to(".louis-canvas canvas" , {
      y:'0',
      scale:1,
      zoom:1,
    })
    gsap.to(".louis-canvas canvas" , {
      y:'0',
      scale:1,
      zoom:1,
    })
  



    };
    const handleDesktopViewAnimation = () => {
      gsap.fromTo(".louis-canvas canvas" , {
        y:'0',
        scale:1,
        zoom:1,
      },{
        y: "-10vh",
        scale:1.6,
        zoom:1.05,


        scrollTrigger: {
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          scrub: true,
          id: "scrub",
          trigger:  pageRef.current,
        },
      });
     
    
    gsap.to(".floating-heads-element", {
      marginTop: "-30%",
      scrollTrigger: {
        start: "top top",
        end: () => `+=${window.innerHeight * 1}`,
        scrub: true,
        id: "scrub",
        trigger:  pageRef.current,
      },
      
    });

    ScrollTrigger.create({
     trigger: pageRef.current,
      start: "top top",
      end:`+=${pageRef.current.clientHeight - window.innerHeight + 200}`,
      pin: '.minimal-header',
      pinSpacer:false,

    })

    
    };


    gsap.to(".main-page-title", {
      y: "25%",
      scrollTrigger: {
        start: "top top",
        end: () => `+=${window.innerHeight}`,
        scrub: true,
        id: "scrub",
        trigger:  pageRef.current,
      },
    });
 
 
    gsap.to(".floating-head.head-5", {
      marginBottom: "-20%",
      scrollTrigger: {
        start: "top top",
        end: () => `+=${window.innerHeight * 1.5}`,
        scrub: true,
        id: "scrub",
        trigger:  pageRef.current,
      },
    });
    gsap.to(".floating-head.head-2", {
      marginBottom: "-20%",
      scrollTrigger: {
        start: "top top",
        end: () => `+=${window.innerHeight * 1.5}`,
        scrub: true,
        id: "scrub",
        trigger:  pageRef.current,
      },
    });
    gsap.to(".floating-head", {
      top: "-0%",
 
      scrollTrigger: {
        start: "top top",
        end: () => `+=${window.innerHeight * 1.5}`,
        scrub: true,
        id: "scrub",
        trigger:  pageRef.current,
      },
    });
    gsap.to(".header-menu-toggler", {
      scale: "0.8",
      scrollTrigger: {
        start: "top top",
        end: () => `+=${window.innerHeight*0.2}`,
        scrub: true,
        id: "scrub",
        trigger:  pageRef.current,
      },
    });

   
    
   

    
   // Set up initial animations based on current window width
   if (windowWidth <= 831) {
    handleMobileViewAnimation();
  } else {
     handleDesktopViewAnimation();
   }

    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [pageRef, windowWidth])


 useEffect(() => {
   const saveScrollPosition = () => {
     setScrollPosition(window.scrollY);
   };

   window.addEventListener('beforeunload', saveScrollPosition);

   return () => {
     window.removeEventListener('beforeunload', saveScrollPosition);
   };
 }, [moreActive]);

 useEffect(()=>{  
  if(moreActive === true){
    gsap.to('.header-page-id > p', {
      opacity:1,
      y: '1.4em',
      duration: 2,
      ease: "power2.out",
    }); 
  }
 },[moreActive])

const [clickedProjectName, setClickedProjectName] = useState(null);

// Step 2: Pass a callback function to the Projects component
const handleProjectClick = (projectName) => {
  setClickedProjectName(projectName);
  setMoreActive(true);
};



  return (
    <div className={`portfolio-page-container ${clickedProjectName === 'ANALYSE MY PROPERTY' ? 'amp':''} ${moreActive&&'more-active'}`} ref={pageRef}>
      <LoadingScreen/>
      <div className="threejs-wrap">
    
    <Canvas tabIndex={0} className='louis-canvas'>
        <Suspense fallback={<></>}>
            <LouisModel isModelHidden={isModelHidden}/>
        </Suspense>
        <fog attach="fog" args={['#354970', 0.5 ,10 ]}/>
        
    </Canvas>
    </div>
     <div className="threejs-wrap project-canvas-wrap">
    
  <Canvas tabIndex={0} className='project-canvas'>
      <Suspense fallback={null}>
          <EsotericModel isModelHidden={isModelHidden} activeTileIndex={activeTileIndex}/>
      </Suspense>
     
      <Suspense fallback={null}>
          <MacsModel isModelHidden={isModelHidden} activeTileIndex={activeTileIndex}/>
      </Suspense>
      <Suspense fallback={null}>
          <InkaModel isModelHidden={isModelHidden} activeTileIndex={activeTileIndex}/>
      </Suspense>
      <Suspense fallback={null}>
          <AMPModel isModelHidden={isModelHidden} activeTileIndex={activeTileIndex}/>
      </Suspense>
      <Suspense fallback={null}>
          <KahilModel isModelHidden={isModelHidden} activeTileIndex={activeTileIndex}/>
      </Suspense>
      <Suspense fallback={null}>
          <BeanModel isModelHidden={isModelHidden} activeTileIndex={activeTileIndex}/>
      </Suspense>

      <fog attach="fog" args={['#354970', 0.8 ,9 ]}/>
      
      <CameraPositioning />
      
  </Canvas>
    

  </div>
  <div className="threejs-background-wrap">
    <div className="threejs-background">
      
      </div>
    </div>

  {moreActive ? (
        // Render different components when "moreActive" is true
      <div className="more-active-project-page">
        <div className="more-active-project-name">
          <Reveal custom={4} elementClass='title' element='h1' textContent={clickedProjectName || ""}/>
        </div>
      </div>
      ) : (
        // Render the default components
          <div className="pages-wrap">
          <Introduction setIsModelHidden={setIsModelHidden}/>
          <About setIsModelHidden={setIsModelHidden} windowWidth={windowWidth}/>
          <Projects setIsModelHidden={setIsModelHidden} isModelHidden={isModelHidden} setActiveTileIndex={setActiveTileIndex} setMoreActive={setMoreActive} windowWidth={windowWidth} onProjectClick={handleProjectClick}/>
          <Processes windowWidth={windowWidth}/>
        </div>
      )}

    </div>

  
  );
}


function Introduction({setIsModelHidden}){

  const sectionRef = useRef(null);
  const elementRef = useRef(null);
  
  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 200;
    const centerY = rect.top + rect.height / 200;

    const floatingHeads = document.querySelectorAll('.floating-head');

    floatingHeads.forEach((head) => {
      const variation = {
        deltaX: 0.002 + 0.02, // Random value between 0.003 & 0.005
        deltaY: 0.002 + 0.03,
      };

      const deltaX = (e.clientX - centerX) * variation.deltaX;
      const deltaY = (e.clientY - centerY) * variation.deltaY;

      const newX = centerX + deltaX;
      const newY = centerY + deltaY;

      gsap.to(head, {
        xPercent: newX/2,

        ease: easeOut,
      });
    });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  });



  useIntersectionObserver(sectionRef, { threshold: 0.99 }, () => {
    gsap.to('.header-page-id > p', {
      opacity: 1,
      y: '1.4em',
      duration: 1,
      ease: "power2.out",
    });

    setIsModelHidden(false);
  });


  return(
      <section className="page-one page" id="page-one" ref={sectionRef}>
          <div className="first-page-background"></div>
          <div className="first-page-wrap">

              <h1 className="main-page-title title loading-title" ref={elementRef}><Reveal element={'span'} textContent={'Louis Wyeeeth'}/></h1>
              <div className="floating-heads-element">
                <div className="floating-head-inner">
                <img loading="lazy" src='/AppImages/floatingHead2.webp' className="floating-head head-1"/>
                <img src='/AppImages/floatingHead2.webp' className="floating-head head-2"/>
                <img src='/AppImages/floatingHead2.webp' className="floating-head head-3"/>
                <img src='/AppImages/floatingHead2.webp' className="floating-head head-4"/>
                <img src='/AppImages/floatingHead2.webp' className="floating-head head-5"/>
                <img src='/AppImages/floatingHead2.webp' className="floating-head head-6"/>
                <img src='/AppImages/floatingHead2.webp' className="floating-head head-7"/>
                <img src='/AppImages/floatingHead2.webp' className="floating-head head-8"/>
                </div>
                
              </div>
              <div className="main-page-intro">
                <Reveal elementClass={'main-page-p'} element={'p'} textContent={'In the intersection of Design & Digital through the display of information. '}/>
                <div className="main-page-buttons-wrap">
                <a  onClick={() =>scrollToAboutSection()}>
                    <a className="main-page-button-primary" >
                      <Reveal textContent={"Read More"} element={'span'}/>
                    </a>
                  </a>
     
                  <SmoothScrollLink to="contact"  smooth={true} offset={-20} duration={2000} delay={10} easing="cubic-bezier(0.76, 0, 0.24, 1)">
                    <a className="main-page-button-secondary hoverable">
                      <Reveal textContent={"Let's Work"} element={'span'}/>
                     
                    </a>
                  </SmoothScrollLink>
 
                
                
                </div>
              </div>
          </div>
      </section>
  )
}

function About({windowWidth, setIsModelHidden}){

  const sectionRef = useRef(null);


  useLayoutEffect(() => { 


    const handleMobileViewAnimation = () => {

    };
    const handleTabletViewAnimation = () => {

    };
    const handleDesktopViewAnimation = () => {
      gsap.to(".louis-canvas>div",{
        y:'-180vh',
        scrollTrigger: {
          start: `bottom bottom`,
          end: () => `+=${window.innerHeight * 1.5}}`,
          scrub: true,
          id: "scrub",
          trigger:  sectionRef.current,

        },
      });
      gsap.to(".louis-canvas canvas",{

        rotate:'15deg',
        scrollTrigger: {
          start: `bottom bottom`,
          end: () => `+=${window.innerHeight * 1.5}}`,
          scrub: true,
          id: "scrub",
          trigger:  sectionRef.current,

        },
      });
      
    };


    
   // Set up initial animations based on current window width
   if (windowWidth <= 831) {
    handleMobileViewAnimation();
  }if (windowWidth <= 1350 && windowWidth >= 832) {
    handleTabletViewAnimation();
  } else {
     handleDesktopViewAnimation();
     
   }

    
    return () => {
    };
  }, [sectionRef, windowWidth])
  
 
  useIntersectionObserver(sectionRef, { threshold: 0.4 }, () => {
    gsap.to('.header-page-id > p', {
      opacity: 1,
      y: '0.1em',
      duration: 1,
      ease: "power2.out",
      delay: 0.1,
    });

    setIsModelHidden(false);
  });
 

  
  return(
    <section className="page-two page" id='page-two' ref={sectionRef} >
    <p className="main-page-p">
        Louis Wyeth ⸺ Crafting intuitive, end-to-end products, focusing on scalable systems & interactive user-friendly interfaces.
    </p>
    <p className="main-page-p">
      I bring a love for crafting visual systems. I thrive on untangling complex challenges and iterating on innovative ideas to deliver impactful results for my clients.<br/><br/> Currently focused on empowering local brands and businesses, making a real difference in their online presence.</p>
    </section>
  )
}

function Projects(props){
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   useLayoutEffect(() => {
     const handleResize = () => {
       const newWindowWidth = window.innerWidth;
       const newWindowHeight = window.innerHeight;

       setWindowWidth(newWindowWidth);

     };

     const resizeObserver = new ResizeObserver(handleResize);
     resizeObserver.observe(document.body);

     return () => {
       resizeObserver.disconnect();
     };
   }, []);

   

  const sectionRef = useRef(null);
  const [hasBeenObserved, setHasBeenObserved] = useState(false);
  const animationRef = useRef(null);
  const [activeTileIndex, setActiveTileIndex] = useState(0);

useLayoutEffect(() => { 


  const handleMobileViewAnimation = () => {

  };
  const handleTabletViewAnimation = () => {

  };
  const handleDesktopViewAnimation = () => {
 gsap.to(".threejs-background",{
   height: "100%",
   scrollTrigger: {
     start: `-${window.innerHeight *0.2}  top`,
     end: () => `+=${window.innerHeight * 0.5}`,
     scrub: true,
     id: "scrub",
     trigger:  sectionRef.current,

   },
 });

 gsap.to(".project-canvas canvas",{
   marginTop:'0vh',
   scale:1,
   scrollTrigger: {
     start: `-${window.innerHeight *0.4}  top`,
     end: () => `+=${window.innerHeight * 0.7}`,
     scrub: true,
     id: "scrub",
     trigger:  sectionRef.current,

   },
 });

  // First animation
  gsap.to(".project-canvas>div", {
    y: '-100vh',
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "bottom+=200 bottom", // 400px from bottom
      end: ()=> '+=400',       // 0px from bottom
      scrub: true,
      id: "scrub",
    },
  });

  // Second animation
  gsap.fromTo(
    ".threejs-background",
    { clipPath: 'inset(0% 0% 0% 0% round 10px)' },
    {
      clipPath: 'inset(0% 0% 100% 0% round 50px)',
      borderRadius: '0px',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom+=200 bottom", // 400px from bottom
        end: ()=> '+=400',        // 0px from bottom
        scrub: true,
        id: "scrub",
      },
    }
  );

  

    
   
  
  };



 // Set up initial animations based on current window width
 if (windowWidth <= 800) {
  handleMobileViewAnimation();
} else {
   handleDesktopViewAnimation();
 }


  return () => {
  };
}, [sectionRef, windowWidth])



  //every view function
  useEffect(() => {

        const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
         
                // Set isModelHidden to true when Projects section is observed
                props.setIsModelHidden(true);
                
                gsap.to('.header-page-id > p', {
                  opacity:1,
                  y: '-1.75em',
                  duration: 1,
                  ease: "power2.out",
                }); 
                gsap.to('.header-menu-toggler', {
                  maxWidth:'calc(82px * 4)',
          
                  ease: "power2.out",
                }); 
              }
          });
      },
      { threshold: 0.3} //adjust the threshold to determine how far into the section to observe
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  });



  //first view function
  useEffect(() => {
 



    if (!hasBeenObserved) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setHasBeenObserved(0);
            }
          });
        },
        { threshold: 0.5 } //adjust the threshold to determine how far into the section to observe
      );

      observer.observe(sectionRef.current);

      return () => observer.disconnect();
    }
  }, [hasBeenObserved]);

  const [moreActive, setMoreActive] = useState(false);
  const [readMoreIndex, setReadMoreIndex] = useState(null);
  

  // Add a function to handle "Read More" click
  const handleReadMoreClick = (index, project) => {
    setMoreActive(true);
    setReadMoreIndex(index);
    props.setMoreActive(index); 

    document.querySelectorAll(".project-tile").forEach((element, i) => {
      element.classList.remove("read-more-tile");
      if (i === index) {
        element.classList.add("read-more-tile");
      }
    });

    props.onProjectClick(project.title);
  };

  useEffect(() => {
    if (moreActive) {
      document.querySelector('.page-three').classList.add('read-more');
    } else {
      document.querySelector('.page-three').classList.remove('read-more');
    }
  }, [moreActive]);



const handleTileClick = (index, project) => {


 

  props.setActiveTileIndex(index);
  if(index != activeTileIndex){
    setActiveTileIndex(index);
    document.querySelectorAll(".project-tile").forEach((element) => {
      element.classList.remove("active");
    });
  }

};




  return(
    <section className={`page-three page ${moreActive ? 'read-more' : ''}`} id='page-three' ref={sectionRef}>

        <div className="projects-wrap pointer-events">
            <div className="projects-list ">
            <Reveal elementClass={"main-page-p"} element={'div'} textContent={'The following is a collection of personal & professional self directed projects:'}/>
            {projectsData.map((project, index) => (
            
              <div className={`project-tile project-tile-${index} hoverable ${index === activeTileIndex ? 'active' : ''} ${index === readMoreIndex ? 'read-more-tile' : ''}`} key={index} onClick={() => handleTileClick(index, project)}>
                <div className={`project-line-top project-line`}></div>
                <div className="project-title">{project.title}</div>
                {window.innerWidth <= 800 &&(
                  <div className="mobile-project-model">
                    <img src={project.mobileModel} alt='project-mobile-model'></img>
                  </div>
                )}
                <div className="project-desc-wrap">
                <div className="project-long-desc long-desc-one">
                  <div className="long-desc-col1"></div>
                  <div className="long-desc-col2">{project.description.longCol1}</div>
                  <div className="long-desc-col3">{project.description.longCol2}</div>
                </div>
                <div className={`project-short-desc ${index === 0 ? 'first-project-desc' : ''}`}>
                  <div className={`short-desc-overview ${index === 0 ? 'first-overview' : ''}`}>
                    <div className={`project-contribution`}>
                      <span>{project.contribution}</span>
                    </div>
                  <div>
                    {project.description.short}<br/>
                    {project.status}
                    </div>
                  </div>
                  <div className="short-desc-tech">{project.techUsed}</div>
                  <div className='short-desc-links-wrap'> 
                   <div className="short-desc-links" onClick={() => handleReadMoreClick(index, project)}><p className="link-read-more">Read More -></p>
                      <DelayLink  delay={1700} className="link-view-more" to={`/${project.title.toLowerCase().replace(/\s/g, '-')}`}>
                        Case Study ->
                      </DelayLink>
                    </div>
                  </div>

                  <div className={`project-line-bottom project-line`}></div>
                </div>
                </div>
                
                
              </div>
            ))}

            </div>
        </div>
    </section>
  )
}


function Processes({windowWidth}){

  

//   const sectionRef = useRef(null);
//   const cardRef = useRef(null);

//  //every view function
//  useEffect(() => {

//   const observer = new IntersectionObserver(
//     entries => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           gsap.to('.header-page-id > p', {
//             opacity:0,
//             y: '-3.75em',
//             duration: 1,
//             ease: "power2.out",
//           }); 
//           gsap.to('.header-menu-toggler', {
//             maxWidth:83,
   
//             ease: "power2.out",
//           }); 
//         }
//     });
// },
// { threshold: 0.1} //adjust the threshold to determine how far into the section to observe
// );


// observer.observe(sectionRef.current);


// return () => {
//   observer.disconnect();
 
// };
// });

  

//   useLayoutEffect(() => { 


//     const handleMobileViewAnimation = () => {

//     };
//     const handleTabletViewAnimation = () => {

//     };
//     const handleDesktopViewAnimation = () => {
   
// 
// });
//   gsap.to(".threejs-background",{
//     scale: "1",
//     scrollTrigger: {
//       start: `-350 top`,
//       end: () => `+=310`,
//       scrub: true,
//       id: "scrub",
//       trigger:  sectionRef.current,
//     },
//   });
//   gsap.fromTo(".threejs-background-wrap", {width: '46.6svw'},{
//     width: "94.5vw",
//     height:'100%',
//     top:'1.7svw',
//     left:'50%',
//     x:'-50%',
//     scrollTrigger: {
//       start: `-340 top`,
//       end: () => `+=200`,
//       scrub: true,
//       id: "scrub",
//       trigger:  sectionRef.current,

//     },
//   });
//   gsap.to(".cards-wrap .angry-grid",{

//     marginTop:`-${window.innerHeight}`,
//     scrollTrigger: {
//       start: `bottom bottom`,
//       end:()=>`+=${window.innerHeight}`,
//       scrub: true,
//       id: "scrub",
//       trigger:  sectionRef.current,
//     },
//   });
//   gsap.to("header",{

//     marginTop:`-${window.innerHeight*0.3 + 82}`,
//     scrollTrigger: {
//       start: `bottom bottom`,
//       end:()=>`+=${window.innerHeight}`,
//       scrub: true,
//       id: "scrub",
//       trigger:  sectionRef.current,
//     },
//   });
//   gsap.to(".card-2",{

//     top:0,
//     scrollTrigger: {
//       start: `bottom bottom`,
//       end:()=>`+=${window.innerHeight}`,
//       scrub: true,
//       id: "scrub",
//       trigger:  sectionRef.current,
//     },
//   });


//     };



//    // Set up initial animations based on current window width
//    if (windowWidth <= 800) {
//     handleMobileViewAnimation();
//   } else {
//      handleDesktopViewAnimation();
//    }


//     return () => {
//     };
//   }, [sectionRef, windowWidth])

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ['start start', 'end end']
//   })

//     return(
//             <section className="page-four page" ref={sectionRef}>
//               <div className="cards-wrap">
//               {processData.map((page, index) => (
//                 <Card ref={cardRef} windowWidth={windowWidth} key={index} title={page.title} boxes={page.boxes} className={index} sectionRef={sectionRef}/>
//               ))}
//               </div>
//             </section>
//     )
}

const scrollToAboutSection = () => {
  const aboutSectionHeight = document.querySelector('.page-two').clientHeight;
  const windowHeight = window.innerHeight;
 
  if(aboutSectionHeight <= windowHeight){
    window.scrollTo({
      top: aboutSectionHeight,
      behavior: 'smooth'
    });
  }else{
    window.scrollTo({
      top: windowHeight,
      behavior: 'smooth'
    });
  }


 
};

// Reusable Intersection Observer setup
const useIntersectionObserver = (ref, options, callback) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options, callback]);
};

// Reusable Scroll Trigger setup
const useScrollTrigger = (ref, options, callback) => {
  useEffect(() => {
    gsap.to(ref.current, {
      ...options,
      scrollTrigger: {
        ...options.scrollTrigger,
        trigger: ref.current,
        id: "scrub",
      },
      onComplete: callback,
    });

    return () => {
      ScrollTrigger.getById("scrub").kill();
    };
  }, [ref, options, callback]);
};


export default Home;
