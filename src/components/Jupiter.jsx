import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import jupiterImg from '../img/jupiter.jpg'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const Jupiter = (props) => {

    const jupiterTexture = useLoader(TextureLoader, jupiterImg)

    const rotationRef = useRef();
    const parentMeshRef = useRef();

    useFrame((_, delta) => {
        rotationRef.current.rotation.y += 0.7 * delta
        parentMeshRef.current.rotation.y += 0.8 * delta
    })

    return (
        <mesh ref={parentMeshRef}>
            <mesh {...props} ref={rotationRef}>
                <sphereGeometry args={[2.4, 256, 256]} />
                <meshStandardMaterial map={jupiterTexture} />
            </mesh>
        </mesh>
    )
}

export default Jupiter