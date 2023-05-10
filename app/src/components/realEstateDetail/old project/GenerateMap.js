// import './Input.css';
import React, { useRef, useEffect, useState } from 'react';

import mapboxgl , { Marker } from 'mapbox-gl';
// import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import useApi from '../../../../core/hooks/useApi';
import ToggleBtn from '../../Btns/ToggleBtn';



mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
    

function GenerateMap({address, children}) {
    
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [coords, setCoords] = useState();

    const coordsData = useApi(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}`);
    // console.log(coordsData);

    useEffect(()=>{
        if(coordsData.isLoading === false && coordsData.data !== null){
            setCoords(coordsData.data.features[0].geometry.coordinates);
            // console.log(coords);
            
            async function generateMap() {
              // if (map.current) return; // initialize map only once
              map.current = new mapboxgl.Map({
                  container: mapContainer.current,
                  style: 'mapbox://styles/mapbox/streets-v11',
                  center: coords,
                  zoom: 15
              });
      
              new mapboxgl.Marker()
              .setLngLat(coords)
              .addTo(map.current);
          }

          generateMap();
                
        }
    }, [coordsData.isLoading, coords]);

    
  return (
    <>
    <div className='relative w-full md:w-[65%]'>
        <div ref={mapContainer} className="map-container h-[400px] rounded-xl" />
        {children}
    </div>
    
    </>
    
    
  );
}
export default GenerateMap;