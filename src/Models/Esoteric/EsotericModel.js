import React, { useRef, useLayoutEffect, useState } from "react";
import { useGLTF, useCubeTexture } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import gsap from "gsap";

import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function EsotericModel(props) {
  const { nodes } = useGLTF("/Objects/Esoteric/esoteric.gltf");
  const ref = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const texture = useCubeTexture([
    'Objects/px.png', 'Objects/nx.png', 'Objects/py.png', 'Objects/ny.png', 'Objects/pz.png', 'Objects/nz.png'
  ],{path:'/'});
  
  const hidden = props.isModelHidden;
  const activeTileIndex = props.activeTileIndex;
 


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
    if(hidden && activeTileIndex === 0){
      var x = (mousePosition.x / viewport.width) / 50;
      var y = (mousePosition.y / viewport.height) / -10;

      var xOffset = mousePosition.x / viewport.width - 0.5;
      var yOffset = mousePosition.y / viewport.height - 0.5;
    }else{


      var x = 1 / 50;
      var y = 1 - 10;

      // Adjust the object's position based on mouse position
      var xOffset = 1 - 0.5;
      var yOffset = 1 - 0.5;
    }


      

      ref.current.position.x = xOffset * 0.003;
      ref.current.position.y = yOffset * 0.2;

      ref.current.lookAt(x - 3, y - 15.5, 10);
  
  });

  useFrame(({ clock }) => {
ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.08; 
ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.05 - 0.1;
  
  });

  return (
    <group dispose={null} scale={0.56}>
      <mesh
        {...props}
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        scale={2.6}
      >
        <meshBasicMaterial
          attach="material"
          color="#202A45"
          opacity={1}
          envMap={texture}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Objects/Esoteric/esoteric.gltf");
