import React, { useState, useEffect } from 'react';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { GeoJSON } from 'react-leaflet'
import MapWithLogging from './MapWithLogging';
import 'leaflet/dist/leaflet.css'
import geojson from './geojson';

const HomePage = () => {

  const [geodata, setGeodata] = useState(geojson);
  const [key, setKey] = useState(1)

  const receiveDataFromChild = (data) => {
    setGeodata(data);
    
    
  };
  useEffect(()=>{
    setKey(key => key + 1);
    console.log('triget',key);
  },[geodata])

  return (
    <div style={{width:'100vw',height:'100vh'}}>
      <MapContainer center={[13.069989, 80.231308]} zoom={13} scrollWheelZoom={false} >
        <MapWithLogging geojsonsetter={receiveDataFromChild} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON key={key} data={geodata} />
      </MapContainer>
      </div>
      )
}

export default HomePage