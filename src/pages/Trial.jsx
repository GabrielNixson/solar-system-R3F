// import React from 'react'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import MapMesh from './MapMesh';

// const Trial = () => {
//   return (
//     <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
//     <ambientLight intensity={0.5} />
//     <MapMesh zoom={16} x={35210} y={21492} tileCount={10} />
//     <OrbitControls enableZoom={true} />
//   </Canvas>
//   )
// }

// export default Trial

import React, { useState, useRef, useEffect } from 'react';

const Map = () => {
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const [zoom, setZoom] = useState(1);
  const mapRef = useRef(null);

  useEffect(() => {
    const canvas = mapRef.current;
    const ctx = canvas.getContext('2d');

    const drawTile = (x, y, zoomLevel) => {
      const url = `https://a.tile.openstreetmap.org/${zoomLevel}/${x}/${y}.png`;
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, x * 256, y * 256);
      };
      image.src = url;
    };

    const updateMap = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const tileSize = 256 * zoom;

      const startX = Math.floor((centerX - canvas.width / 2) / tileSize);
      const startY = Math.floor((centerY - canvas.height / 2) / tileSize);
      const endX = Math.floor((centerX + canvas.width / 2) / tileSize) + 1;
      const endY = Math.floor((centerY + canvas.height / 2) / tileSize) + 1;

      for (let x = startX; x < endX; x++) {
        for (let y = startY; y < endY; y++) {
          drawTile(x, y, zoom);
        }
      }
    };

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    });
    canvas.addEventListener('mouseup', () => {
      isDragging = false;
    });
    canvas.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        setCenterX((prev) => prev - deltaX / (256 * zoom));
        setCenterY((prev) => prev - deltaY / (256 * zoom));
        updateMap();
        lastX = e.clientX;
        lastY = e.clientY;
      }
    });

    canvas.addEventListener('wheel', (e) => {
      // Ensure zoom stays within valid range (1 and above)
      const newZoom = zoom + (e.deltaY > 0 ? 0.1 : -0.1);
      setZoom(newZoom < 1 ? 1 : newZoom);
      updateMap();
    });

    updateMap();
  }, [centerX, centerY, zoom]);

  return (
    <div style={{ border: '1px solid black' }}>
      <canvas ref={mapRef} width="600" height="400" />
    </div>
  );
};

export default Map;