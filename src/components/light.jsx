import React,{ useRef } from 'react'
import { useHelper } from '@react-three/drei';
import { PointLightHelper } from 'three';


const Light = () => {

    const directionalLightRef = useRef(null);
    useHelper(directionalLightRef, PointLightHelper, 1, "green");

  return (
    <pointLight color="white" intensity={1} distance={300} decay={0} position={[0, 0, 0]} ref={directionalLightRef}/>
  )
}

export default Light