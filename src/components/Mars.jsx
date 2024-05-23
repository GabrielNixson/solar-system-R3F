import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import marsImg from '../img/mars.jpg'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const Mars = (props) => {

    const marsTexture = useLoader(TextureLoader, marsImg)

    const rotationRef = useRef();
    const parentMeshRef = useRef();

    useFrame((_, delta) => {
        rotationRef.current.rotation.y += 0.6 * delta
        parentMeshRef.current.rotation.y += 0.7 * delta
    })

    return (
        <mesh ref={parentMeshRef}>
            <mesh {...props} ref={rotationRef}>
                <sphereGeometry args={[1.7, 256, 256]} />
                <meshStandardMaterial map={marsTexture} />
            </mesh>
        </mesh>
    )
}

export default Mars