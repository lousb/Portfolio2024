import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useGLTF, useCubeTexture, useScroll } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import gsap from "gsap";

import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function MacsModel(props) {
  const { nodes } = useGLTF("/Objects/MaxDona/macs.gltf");

  const ref = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const texture = useCubeTexture([
    'Objects/px.png', 'Objects/nx.png', 'Objects/py.png', 'Objects/ny.png', 'Objects/pz.png', 'Objects/nz.png'
  ],{path:'/'});

  useLayoutEffect(() => {
    function handleMouseMove(event) {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    }

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(({ viewport }) => {
    var x = (mousePosition.x / viewport.width ) / 50
    var y = (mousePosition.y / viewport.height) / 50

    // Adjust the object's position based on mouse position
    const xOffset = mousePosition.x / viewport.width - 0.5;
    const yOffset = mousePosition.y / viewport.height - 0.5;
    

    
    ref.current.position.x = xOffset /30 - 80;
    ref.current.position.y = yOffset / 20;


    ref.current.lookAt(x  - 3, y* 20 , 20);

  })
  
  useFrame(({ clock }) => {
    ref.current.position.y += Math.sin(clock.getElapsedTime()) * 0.08 - 510; 
    ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.05;
    
    ref.current.rotation.x = 0.1;

    ref.current.position.z = -2;
  });


  return (
    <group {...props} dispose={null}  scale={0.55}>
      <group    scale={0.025}>
        <group
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Shape.geometry}
            material={nodes.Shape.material}
            ref={ref}
          >
            <meshBasicMaterial
              attach="material"
              color="#202A45"
              opacity={1}
              envMap={texture}
            />
            
          </mesh>
        </group>
        
      </group>
      <fog attach="fog" args={['#354970', 0.9 ,100 ]} />
    </group>
  );


  
}

useGLTF.preload("/Objects/MaxDona/macs.gltf");
