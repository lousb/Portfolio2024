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

  const hidden = props.isModelHidden;
  const activeTileIndex = props.activeTileIndex;

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
    if(hidden && activeTileIndex === 1){
    var x = (mousePosition.x / viewport.width ) / 50;
    var y = (mousePosition.y / viewport.height) / 50;

    // Adjust the object's position based on mouse position
    var xOffset = mousePosition.x / viewport.width - 0.5;
    var yOffset = mousePosition.y / viewport.height - 0.5;
    }else{
 

      var x = 1 / 50;
      var y = 1 / 50;

      // Adjust the object's position based on mouse position
      var xOffset = 1 - 0.5;
      var yOffset = 1 - 0.5;
    }
    
    
    ref.current.position.x = xOffset /30;
    ref.current.position.y = yOffset / 20;

  
    ref.current.lookAt(x  - 3, y* 20 , 20);
  })
  
  useFrame(({ clock }) => {
    ref.current.position.x += -80;
    ref.current.position.y +=  -510; 
    ref.current.position.z = -2;
    ref.current.rotation.x = 0.1;

    if(hidden && activeTileIndex === 1){

    ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.05;
    ref.current.position.y += Math.sin(clock.getElapsedTime()) * 0.08; 
  


    }
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
