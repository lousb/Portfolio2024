import React, { useRef, useLayoutEffect, useState } from "react";
import { useGLTF, useCubeTexture } from "@react-three/drei";
import { useFrame } from "react-three-fiber";

export default function LouisModel(props) {
  const { nodes } = useGLTF("/Objects/LouisHead/louisHead.gltf");
  const ref = useRef();
  const eyebrowsRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const texture = useCubeTexture([
    'Objects/px.png', 'Objects/nx.png', 'Objects/py.png', 'Objects/ny.png', 'Objects/pz.png', 'Objects/nz.png'
  ],{path:'/'});

  const hidden = props.isModelHidden;
 

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
        if(!hidden){
    const x = (mousePosition.x / viewport.width) / 50;
    const y = (mousePosition.y / viewport.height);

    const xOffset = mousePosition.x / viewport.width - 0.5;
    const yOffset = mousePosition.y / viewport.height - 0.5;
    
    ref.current.position.x = xOffset * 0.003;
    ref.current.position.y = yOffset * 0.002;
    
    ref.current.position.y = yOffset * 0.002;
    eyebrowsRef.current.position.y = yOffset * 0.0003;
   
    ref.current.lookAt(0, 0 , -2);
        }
  });

  useFrame(({ clock }) => {
    if(!hidden){
      ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.08 ; 
      ref.current.position.x -= 2.5;
      ref.current.position.y = -12.6;
      ref.current.position.z = 3.4;
      ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.05 + 2.8; 
      ref.current.rotation.y = 82;
      ref.current.rotation.x += 1.3;
    }
    
  });
  

  return (
    <group dispose={null} ref={ref} scale={5}>
      <mesh {...props} castShadow receiveShadow geometry={nodes.head_Cube001_skin.geometry}>
        <meshBasicMaterial attach="material" color="#D0D4EB" opacity={1} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.head_Cube001_eyes.geometry}>
        <meshBasicMaterial attach="material" color="#202A45" opacity={1} envMap={texture} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.eyebrow_Cube015_hair.geometry} ref={eyebrowsRef}>
        <meshBasicMaterial attach="material" color="#202A45" opacity={1} envMap={texture} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.head003_Cube018_hair.geometry}>
        <meshBasicMaterial attach="material" color="#202A45" opacity={1} envMap={texture} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.head006_Cube021_dots.geometry}>
        <meshBasicMaterial attach="material" color="#202A45" opacity={1} envMap={texture} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.head007_Cube022_teeth.geometry}>
        <meshBasicMaterial attach="material" color="#FFFFFF" opacity={1} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.head008_Cube005_teeth.geometry}>
        <meshBasicMaterial attach="material" color="#FFFFFF" opacity={1} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Objects/LouisHead/louisHead.gltf");
