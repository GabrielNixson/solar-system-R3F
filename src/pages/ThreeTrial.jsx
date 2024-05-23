import React, { useRef, useEffect } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, useHelper } from '@react-three/drei'
import Light from '../components/light'
import BackGround from '../components/BackGround'
import Sun from '../components/Sun'
import Mercury from '../components/Mercury'
import Venus from '../components/Venus'
import Earth from '../components/Earth'
import Mars from '../components/Mars'
import Jupiter from '../components/Jupiter'
import Saturn from '../components/Saturn'
import Uranus from '../components/Uranus'
import Neptune from '../components/Neptune'


const ThreeTrial = () => {

    return (
        <>
        <Canvas camera={{position:[-15,20,35]}}>
            <ambientLight intensity={0.15} />
            {/* <pointLight color="white" intensity={1} position={[0, 0, 0]} distance={300} /> */}
            <BackGround />
            <Sun />
            <Mercury position={[5,0,0]} />
            <Venus position={[8,0,0]} />
            <Earth position={[13,0,0]} />
            <Mars position={[18,0,0]} />
            <Jupiter position={[24,0,0]} />
            <Saturn position={[29,0,0]} />
            <Uranus position={[35,0,0]} />
            <Neptune position={[39,0,0]} />
            

            <Light />
            
            <OrbitControls />
        </Canvas>
        </>
    )
}

export default ThreeTrial