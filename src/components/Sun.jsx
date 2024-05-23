import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import sunImg from '../img/sun.jpg'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import Mercury from './Mercury'

const Sun = () => {

    const sunTexture = useLoader(TextureLoader, sunImg)

    const rotationRef = useRef();

    useFrame((_, delta) => {
        rotationRef.current.rotation.y += 0.2 * delta
      })

    return (
        <mesh ref={rotationRef}>
            <sphereGeometry args={[3, 256, 256]}/>
            <meshBasicMaterial map={sunTexture} />
        </mesh>
    )
}

export default Sun