import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import mercuryImg from '../img/mercury.jpg'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const Mercury = (props) => {

    const mercuryTexture = useLoader(TextureLoader, mercuryImg)

    const rotationRef = useRef();
    const parentMeshRef = useRef();

    useFrame((_, delta) => {
        rotationRef.current.rotation.y += 0.6 * delta
        parentMeshRef.current.rotation.y += 1 * delta
    })

    return (
        <mesh ref={parentMeshRef}>
            <mesh {...props} ref={rotationRef}>
                <sphereGeometry args={[1, 256, 256]} />
                <meshStandardMaterial map={mercuryTexture} />
            </mesh>
        </mesh>
    )
}

export default Mercury