// Project.js

import React, {useEffect, useRef, useLayoutEffect} from "react";
import { useParams } from "react-router-dom";
import projectsData from "../home/projectsData";
import './project.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../../../utils/textElementReveal/textElementReveal";
import YouTube from 'react-youtube';
gsap.registerPlugin(ScrollTrigger);



const Project = () => {
  const { projectId } = useParams();
  const project = projectsData.find((p) => p.title.toLowerCase().replace(/\s/g, '-') === projectId);
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    gsap.to(".project-details", {
      scale:0.95,
      scrollTrigger: {
        start: `bottom bottom `,
        end: () => `+=450px`,
        scrub: true,
        id: "scrub",
        trigger:  pageRef.current,
      },
    });
    gsap.to(".rendered-section-wrap", {
      opacity:1,
     duration: 1,
     delay:1,
     ease: "power2.out",
    });
   
    gsap.to('.header-page-id > .project-home', {
      y: '0',
      duration: 1,
      delay:0.2,
      ease: "power2.out",
    }); 
  ScrollTrigger.create({
      trigger: pageRef.current,
   start: "top top",
   end:`+=${pageRef.current.clientHeight - window.innerHeight - (window.innerWidth * 0.017)}`,
   pin: '.minimal-header',


  });

  gsap.fromTo('.header-page-id',
  {
    opacity:0,
  },{
    opacity:1,
    delay:0.5,
    duration:0.5
  })

  gsap.to('.return-home-button',{
    top:'0',
    delay:0.15,
    duration:0.5
  })

  gsap.fromTo(".project-less-details .title", {
    height:'100vh',
    y:'-2.7svw'
  },{
    height:'auto',
    y:0,
    duration:1,
    delay:0.2,
  });
  return () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
  }, [pageRef])

useEffect(() => {
  // Scroll to the top when the component mounts
  window.scrollTo(0, 0);
}, []); 

  if (!project) {
    // Handle case where project is not found
    return <div>Project not found</div>;
  }

  return (
    <div className="project-container" ref={pageRef}>
      <ProjectDetails project={project} />
    </div>
  );
};

// Define the YouTubeVideoSection component
const YouTubeVideoSection = ({ sectionData, index }) => {
  useEffect(() => {
    // Add any specific animations or effects for this section if needed
    // This is just a basic example
  }, [index]);

  if (sectionData.url) {
    // Extract video ID from YouTube URL
    const videoId = getYouTubeVideoId(sectionData.url);

    // Set the cc_lang_pref parameter for closed captions
    const playerVars = {
      cc_lang_pref: 'en', // Change 'en' to the desired language code
    };

    return (
      <div id={`section-${index}`} className="youtube-video-section">
        <YouTube videoId={videoId} opts={{ playerVars }} />
      </div>
    );
  } else {
    return null;
  }
};

// Helper function to extract video ID from YouTube URL
const getYouTubeVideoId = (url) => {
  const regExp =
    /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=|t\=|.*[?&]v=|.*[?&]list=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const LargeImageSection = ({ sectionData, index }) => {
useEffect(() => {
  gsap.to(`#section-${index}`, {
    opacity: 1,
    y: 0,
    scale:1,
    scrollTrigger: {
      trigger: `#section-${index}`,
      start: `top ${window.innerHeight}`, // Adjust as needed
      end:()=>'+=100px', // Adjust as needed
      scrub: 1, // Adjust as needed
    },
  });
}, [index]);
  
const { largeImage } = sectionData;

  if (sectionData.largeImage && sectionData.largeImage.imageUrl) {
    const isVideo = sectionData.largeImage.imageUrl.endsWith(".mp4") || sectionData.largeImage.imageUrl.endsWith(".webm");

    return (
      <div id={`section-${index}`} className={`large-${isVideo ? 'video' : 'image'}-section`}>
        {isVideo ? (
          <div>
            {largeImage && largeImage.imageUrl &&(
              <video autoPlay loop muted playsInline>
                <source src={sectionData.largeImage.imageUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
         
          
        ) : (
          <img src={sectionData.largeImage.imageUrl} alt={sectionData.largeImage.imageName} loading="lazy" />
        )}
      </div>
    );
  } else {
    return null;
  }
};

const DualImageSection = ({ sectionData, index }) => {
useEffect(() => {
  gsap.to(`#section-${index}`, {
    opacity: 1,
    y: 0,
    scale:1,
    scrollTrigger: {
      trigger: `#section-${index}`,
      start: `top ${window.innerHeight}`, // Adjust as needed
      end:()=>'+=100px', // Adjust as needed
      scrub: 1, // Adjust as needed
    },
  });
}, [index]);
  

  if (sectionData.image1 && sectionData.image1.imageUrl && sectionData.image2 && sectionData.image2.imageUrl) {
    const isVideo1 = sectionData.image1.imageUrl.endsWith(".mp4") || sectionData.image1.imageUrl.endsWith(".webm");
    const isVideo2 = sectionData.image2.imageUrl.endsWith(".mp4") || sectionData.image2.imageUrl.endsWith(".webm");

    return (
      <div id={`section-${index}`} className="dual-image-section">
        {isVideo1 ? (
          <video autoPlay loop muted playsInline>
            <source src={sectionData.image1.imageUrl} type="video/webm" />
            <source src={sectionData.image1.imageUrl.replace(".webm", ".mp4")} type="video/mp4" />
          </video>
        ) : (
          <img src={sectionData.image1.imageUrl} alt={sectionData.image1.imageName} iid={sectionData.image1.id ? sectionData.image1.id : null} loading="lazy"/>
        )}

        {isVideo2 ? (
          <video autoPlay loop muted playsInline>
            <source src={sectionData.image2.imageUrl} type="video/webm" />
            <source src={sectionData.image2.imageUrl.replace(".webm", ".mp4")} type="video/mp4" />
          </video>
        ) : (
          <img src={sectionData.image2.imageUrl} alt={sectionData.image2.imageName} id={sectionData.image2.id ? sectionData.image2.id : null} loading="lazy"/>
        )}
      </div>
    );
  } else {
    return null;
  }
};

const DualDescSection = ({ sectionData, index }) => {
useEffect(() => {
  gsap.to(`#section-${index}`, {
    opacity: 1,
    y: 0,
    scale:1,
    scrollTrigger: {
      trigger: `#section-${index}`,
      start: `top ${window.innerHeight}`, // Adjust as needed
      end:()=>'+=200px', // Adjust as needed
      scrub: 1, // Adjust as needed
    },
  });
}, [index]);
  

  const { desc1, desc2 } = sectionData;

  const renderLines = (text) => {
    const lines = text.split(/(?:\r\n|\r|\n)/g);
    return lines.map((line, index) => <Reveal element={'p'} elementClass={'dual-desc'} textContent={`${line}`} key={index}/>);
  };

  return (
    <div id={`section-${index}`} className="dual-desc-section">
      <div className="desc1">{renderLines(desc1)}</div>
      <div className="desc2">{renderLines(desc2)}</div>
    </div>
  );
};

export const ProjectDetails = ({ project }) => {
  const { title, description, techUsed, readMoreData, index, WebsiteLink, announcement } = project;

  const renderSections = () => {
    return readMoreData.map((sectionData, index) => {
      const sectionType = Object.keys(sectionData)[0];

      switch (sectionType) {
        case "large-image-section":
          return <LargeImageSection sectionData={sectionData[sectionType]} index={index} />;
        case "dual-image-section":
          return <DualImageSection sectionData={sectionData[sectionType]} index={index} />;
        case "dual-desc-section":
          return <DualDescSection sectionData={sectionData[sectionType]} index={index} />;
        case "youtube-video-section":
          return <YouTubeVideoSection sectionData={sectionData[sectionType]} index={index} />;
        default:
          return null;
      }
    });
  };

  return (
    <div className={`project-details project-details-${index}`}>
      <div className="project-less-details">
        <div className="title-wrap">
          <h1 className="title">{title}</h1>
        </div>
      
        <div className="dual-less-section">
          <Reveal custom={6} textContent={`${description.longCol1}`} element={"p"} />
          <Reveal custom={6} textContent={`${description.longCol2}`} element={"p"} />
        </div>
        {WebsiteLink?
        <a href={WebsiteLink} target="_blank" className="website-link main-page-button-secondary">
          <Reveal custom={6} textContent={`Website`} element={"span"} />
        </a>
        :
        <></>
        }
        {announcement?
        
          <Reveal custom={6} textContent={announcement} element={"span"} elementClass={'announcement'}/>
        :
        <></>
        }

     
   
      </div>
     

      {/* Render additional sections based on readMoreData */}
      <div className="rendered-section-wrap">
      {renderSections()}
      </div>
     
      <Reveal custom={2} textContent={`This system was built with ${techUsed}`} element={"p"} elementClass={'tech-used'}/>
    </div>
  );
};

export default Project;
