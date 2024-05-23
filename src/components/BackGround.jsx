import React, { useEffect } from 'react'
import { useThree, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three';
import startImg from '../img/stars.jpg'

const BackGround = () => {

    const { scene } = useThree();

    
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([startImg, startImg, startImg, startImg, startImg, startImg]);
        texture.colorSpace = THREE.SRGBColorSpace;
        scene.background = texture;


  return 
}

export default BackGround