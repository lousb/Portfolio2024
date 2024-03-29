import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useGLTF, useCubeTexture, useScroll } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import gsap from "gsap";

import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function BeanModel(props) {
  const { nodes } = useGLTF("/Objects/BeanScene/bean_scene.gltf");

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
 if(hidden && activeTileIndex === 5){
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

    ref.current.position.x = xOffset * 0.002 - 1.4;
    ref.current.position.y = yOffset * 0.0005 - 0.6;
    ref.current.rotation.x = xOffset * 0.00005 - 6.4;
    ref.current.rotation.y = yOffset * 0.005 - 6.4;

    ref.current.lookAt(x - 3, y - 98.5, 8);

  });
  
  useFrame(({ clock }) => {
    if(hidden && activeTileIndex === 5){
    ref.current.position.y += Math.sin(clock.getElapsedTime()) * 0.0005; 
    ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.005; 
    }else{
      ref.current.rotation.z += -0.35;
      ref.current.position.y += -0.1;
    }

    ref.current.position.z = 1.6;
    ref.current.rotation.x -= 64.4;
    ref.current.rotation.y += 6.6;
    ref.current.position.y += -71.2;
    ref.current.rotation.z += -25;
  });



  return (
    <group {...props} dispose={null} scale={0.6}>
      <group scale={0.026} ref={ref}>
        <group
        
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Shape_2.geometry}
            material={nodes.Shape_2.material}
            position={[55, -57.1, 0]}
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
            position={[58, -90, 0]}
          ><meshBasicMaterial
            attach="material"
            color="#202A45"
            opacity={1}
            envMap={texture}
          /></mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Shape_0.geometry}
            material={nodes.Shape_0.material}
            position={[1, -0.6, 0]}
          ><meshBasicMaterial
            attach="material"
            color="#202A45"
            opacity={1}
            envMap={texture}
          /></mesh>
        </group>
      </group>
    </group>
  );
}



useGLTF.preload("/Objects/BeanScene/bean_scene.gltf");
