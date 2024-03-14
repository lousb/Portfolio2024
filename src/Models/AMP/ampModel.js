import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useGLTF, useCubeTexture, useScroll } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import gsap from "gsap";

import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function KazanModel(props) {
  const { nodes } = useGLTF("/Objects/AMP/amp.gltf");

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

    ref.current.position.x = xOffset * 0.002 - 1.6;
    ref.current.position.y = yOffset * 0.001;

    ref.current.lookAt(x - 3, y - 98.5, 8);

  });
  
  useFrame(({ clock }) => {
    ref.current.position.y += Math.sin(clock.getElapsedTime()) * 0.03 - 41; 
    ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.005 - 0.1; 

    ref.current.position.z = 1.2;
    ref.current.rotation.x = -0.2;
    ref.current.rotation.y = 0.2;
  });


  
  return (
    <group {...props} dispose={null} scale={0.58}>
      <group scale={0.018} ref={ref}>
        <group

        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Shape_0.geometry}
            material={nodes.Shape_0.material}
            position={[1.927, 35.231, 0]}
          >
            <meshBasicMaterial
              attach="material"
              color="#202A45"
              opacity={1}
              envMap={texture}
            />
                <fog attach="fog" args={['#354970', 0.9 ,200 ]} />
          </mesh>
        </group>
 
        
      </group>
  
    </group>
  );
}

useGLTF.preload("/Objects/Kazan/kazan.gltf");
