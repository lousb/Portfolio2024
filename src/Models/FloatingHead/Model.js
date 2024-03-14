import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useGLTF, useCubeTexture, useScroll } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import gsap from "gsap";

import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function InkaModel(props) {
  const { nodes, scene } = useGLTF("/Objects/LouisHead//louisHead.gltf");

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
    var y = (mousePosition.y / viewport.height) / -10

    // Adjust the object's position based on mouse position
    const xOffset = mousePosition.x / viewport.width - 0.5;
    const yOffset = mousePosition.y / viewport.height - 0.5;


    // scene.position.x = xOffset * 0.003 - 3;
    // scene.position.y = yOffset * 0.2;
    scene.lookAt(x - 3, y - 18.5, 8);
  });

  useFrame(({ clock }) => {
    // scene.position.y = Math.sin(clock.getElapsedTime()) * 0.08 - 18.5;
    // scene.rotation.z = Math.sin(clock.getElapsedTime()) * 0.05 - 0.05;
  });

  return (
    <group dispose={null}>
      <primitive object={scene} scale={1.4}>
        <meshBasicMaterial
          attach="material"
          color="#202A45"
          opacity={1}
          envMap={texture}
        />
        <fog attach="fog" args={['#354970', 0.9 ,100 ]} />
      </primitive>
    </group>
  );
}

useGLTF.preload('/Objects/LouisHead//louisHead.gltf');

