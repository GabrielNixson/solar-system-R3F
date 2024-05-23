import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import saturnImg from '../img/saturn.jpg'
import saturnRingImg from '../img/saturn ring.png'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from "three";

const Saturn = (props) => {

    const saturnTexture = useLoader(TextureLoader, saturnImg)
    const saturnRingTexture = useLoader(TextureLoader, saturnRingImg)


    const rotationRef = useRef();
    const parentMeshRef = useRef();

    useFrame((_, delta) => {
        rotationRef.current.rotation.y += 0.9 * delta
        parentMeshRef.current.rotation.y += 0.45 * delta
    })

    return (
        <mesh ref={parentMeshRef}>
            <mesh {...props} ref={rotationRef}>
                <sphereGeometry args={[2.2, 256, 256]} />
                <meshStandardMaterial map={saturnTexture} />

                <mesh rotation={[5, 0, 5]}>
                    <ringGeometry args={[ 2.5, 3.5, 50]} />
                    <meshStandardMaterial map={saturnRingTexture} side={THREE.DoubleSide} />
                </mesh>
            </mesh>
        </mesh>
    )
}

export default Saturn