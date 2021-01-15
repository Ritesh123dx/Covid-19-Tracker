import React from 'react';
import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet';
import './Map.css';
import { showDataOnMap } from './utils';

function Map({countries, casesType, center, zoom}) {
    console.log(center, zoom)
    
    function MyComponent() {
        const map = useMap()
        map.setView(center, zoom);
        return null
      }
      
    return (
        <div className="shadow map" style={{height : '600px'}}>
       
            <LeafletMap center={center} zoom={zoom}>
                <MyComponent />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {showDataOnMap(countries, casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
