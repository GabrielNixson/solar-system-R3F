import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import earthImg from '../img/earth.jpg'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const Earth = (props) => {

    const earthTexture = useLoader(TextureLoader, earthImg)

    const rotationRef = useRef();
    const parentMeshRef = useRef();

    useFrame((_, delta) => {
        rotationRef.current.rotation.y += 0.9 * delta
        parentMeshRef.current.rotation.y += 0.45 * delta
    })

    return (
        <mesh ref={parentMeshRef}>
            <mesh {...props} ref={rotationRef}>
                <sphereGeometry args={[2, 256, 256]} />
                <meshStandardMaterial map={earthTexture} />
            </mesh>
        </mesh>
    )
}

export default Earth