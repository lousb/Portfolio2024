import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useGLTF, useCubeTexture, useScroll } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import gsap from "gsap";

import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function InkaModel(props) {
  const { nodes, scene } = useGLTF("/Objects/Inka/inka.gltf");
  const ref = useRef();

  const hidden = props.isModelHidden;
  const activeTileIndex = props.activeTileIndex;

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
    if(hidden && activeTileIndex === 2){
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
    
    ref.current.position.x = xOffset * 0.002;
    ref.current.position.y = yOffset * 0.002;

    ref.current.lookAt(x - 3, y - 98.5, 8);
  });

  useFrame(({ clock }) => {
    ref.current.rotation.x = -.22;
    ref.current.rotation.y += 0.2;
    ref.current.position.y += -29.8;
    ref.current.position.x += -2.4;

    if(hidden && activeTileIndex === 2){
    ref.current.position.y += Math.sin(clock.getElapsedTime()) * 0.08;
    ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.005 ;
    }else{
      ref.current.rotation.z += -0.37;
      ref.current.position.y += 0.02;
    }

  
  });

  return (
    <group {...props} dispose={null} scale={0.5}>
      <group scale={0.035} ref={ref}>
        <group
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Shape_0.geometry}
            material={nodes.Shape_0.material}
            position={[88.2, -9.15, 0]}
          ><meshBasicMaterial
            attach="material"
            color="#202A45"
            opacity={1}
            envMap={texture}
          /></mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Shape_1.geometry}
            material={nodes.Shape_1.material}
            position={[38.26, -0.01, 0.01]}
          ><meshBasicMaterial
            attach="material"
            color="#202A45"
            opacity={1}
            envMap={texture}
          /></mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Shape_2.geometry}
            material={nodes.Shape_2.material}
            position={[132.53, -0.05, 0.02]}
          ><meshBasicMaterial
            attach="material"
            color="#202A45"
            opacity={1}
            envMap={texture}
          /></mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Shape_3.geometry}
            material={nodes.Shape_3.material}
            position={[0.01, -23.55, 0.03]}
          ><meshBasicMaterial
            attach="material"
            color="#202A45"
            opacity={1}
            envMap={texture}
          /></mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Shape_4.geometry}
            material={nodes.Shape_4.material}
            position={[5.28, -11.36, 0.04]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Objects/Inka/inka.gltf");
