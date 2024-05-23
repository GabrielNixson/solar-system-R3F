import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import axios from 'axios'
import osmtogeojson from 'osmtogeojson';

function MapWithLogging({geojsonsetter}) {
  const map = useMap();

  const fetchGeojson = async (bounds) => {
    try {
      const response = await axios.get(`https://overpass-api.de/api/interpreter?data=[out:json];
      (
        way["building"](${bounds._southWest.lat}, ${bounds._southWest.lng}, ${bounds._northEast.lat}, ${bounds._northEast.lng});
      relation["building"]["type"="multipolygon"](${bounds._southWest.lat}, ${bounds._southWest.lng}, ${bounds._northEast.lat}, ${bounds._northEast.lng});
      );
      out body;
      >;
      out skel qt;`);
      geojsonsetter(osmtogeojson(response.data));
      console.log(osmtogeojson(response.data));
      console.log(response.data);
      console.log(`${bounds._southWest.lat}, ${bounds._southWest.lng}, ${bounds._northEast.lat}, ${bounds._northEast.lng}`);
    } catch (error) {
      console.error('Error fetching geodata:', error);
    }
  };

  useEffect(() => {
    const handleViewportChanged = () => {
      let zoom = map.getZoom();
      let bounds = map.getBounds();
      console.log('Zoom level:', zoom);
      console.log('Map bounds:', bounds);
      if (zoom == 18) {
        fetchGeojson(bounds);
      }
      console.log('loop');
      console.log('calculate',tileToBounds(4093, 2724, 13));
    };

    map.on('move', handleViewportChanged);

    function tileCornersToLatLon(xtile, ytile, zoom) {
      const n = Math.pow(2, zoom);
      const lonDeg = xtile / n * 360.0 - 180.0;
  
      const latRadNW = Math.atan(Math.sinh(Math.PI * (1 - 2 * (ytile / n))));
      let latDegNW = latRadNW * (180.0 / Math.PI);
  
      const latRadSE = Math.atan(Math.sinh(Math.PI * (1 - 2 * ((ytile + 1) / n))));
      let latDegSE = latRadSE * (180.0 / Math.PI);
  
      latDegNW = Math.max(Math.min(latDegNW, 85.0511), -85.0511);
      latDegSE = Math.max(Math.min(latDegSE, 85.0511), -85.0511);
  
      const topLeft = { lat: latDegNW, lon: lonDeg };
      const topRight = { lat: latDegNW, lon: lonDeg + (360.0 / n) };
      const bottomRight = { lat: latDegSE, lon: lonDeg + (360.0 / n) };
      const bottomLeft = { lat: latDegSE, lon: lonDeg };
  
      return { topLeft, topRight, bottomLeft, bottomRight };
  }

  function tileToBounds(xtile, ytile, zoom) {
    const corners = tileCornersToLatLon(xtile, ytile, zoom);
    
    const southwest = {
        lat: Math.min(corners.bottomLeft.lat, corners.bottomRight.lat),
        lon: Math.min(corners.bottomLeft.lon, corners.topLeft.lon)
    };

    const northeast = {
        lat: Math.max(corners.topLeft.lat, corners.topRight.lat),
        lon: Math.max(corners.topRight.lon, corners.bottomRight.lon)
    };

    return { southwest, northeast };
}
  

    return () => {
      map.off('move', handleViewportChanged);
    };
    
  }, [map]);

  return null; // We don't render anything directly in this component
}
export default MapWithLogging
