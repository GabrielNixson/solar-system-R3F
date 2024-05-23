import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import venusImg from '../img/venus.jpg'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const Venus = (props) => {

    const mercuryTexture = useLoader(TextureLoader, venusImg)

    const rotationRef = useRef();
    const parentMeshRef = useRef();

    useFrame((_, delta) => {
        rotationRef.current.rotation.y += 0.8 * delta
        parentMeshRef.current.rotation.y += 0.3 * delta
    })

    return (
        <mesh ref={parentMeshRef}>
            <mesh {...props} ref={rotationRef}>
                <sphereGeometry args={[1.5, 256, 256]} />
                <meshStandardMaterial map={mercuryTexture} />
            </mesh>
        </mesh>
    )
}

export default Venus