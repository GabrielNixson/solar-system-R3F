import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import uranusImg from '../img/uranus.jpg'
import uranusRingImg from '../img/uranus ring.png'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from "three";

const Uranus = (props) => {

    const uranusTexture = useLoader(TextureLoader, uranusImg)
    const uranusRingTexture = useLoader(TextureLoader, uranusRingImg)

    const rotationRef = useRef();
    const parentMeshRef = useRef();

    useFrame((_, delta) => {
        rotationRef.current.rotation.y += 0.8 * delta
        parentMeshRef.current.rotation.y += 0.65 * delta
    })

    return (
        <mesh ref={parentMeshRef}>
            <mesh {...props} ref={rotationRef}>
                <sphereGeometry args={[2, 256, 256]} />
                <meshStandardMaterial map={uranusTexture} />
                <mesh rotation={[5, 0, 2]}>
                    <ringGeometry args={[ 2.5, 3.5, 50]} />
                    <meshStandardMaterial map={uranusRingTexture} side={THREE.DoubleSide} />
                </mesh>
            </mesh>
        </mesh>
    )
}

export default Uranus