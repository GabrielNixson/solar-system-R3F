// src/MapMesh.jsx
import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const generateTileUrls = (zoom, x, y, tileCount) => {
  const urls = [];
  for (let i = 0; i < tileCount; i++) {
    for (let j = 0; j < tileCount; j++) {
      urls.push(`https://tile.openstreetmap.org/${zoom}/${x + i}/${y + j}.png`);
    }
  }
  return urls;
};

const MapMesh = ({ zoom, x, y, tileCount }) => {
  const tileUrls = generateTileUrls(zoom, x, y, tileCount);
  const textures = useLoader(THREE.TextureLoader, tileUrls);

  return (
    <>
      {textures.map((texture, index) => (
        <mesh
          key={index}
          position={[
            (index % tileCount) * 10,
            Math.floor(index / tileCount) * 10,
            0
          ]}
        >
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      ))}
    </>
  );
};

export default MapMesh;