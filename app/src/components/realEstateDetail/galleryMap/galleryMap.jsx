import React, { useState } from 'react';
import Gallery from './gallery/gallery';
import Map from './map/map';

function GalleryMap({imgPath, address}) {

    const [activeElement, setActiveElement] = useState({
        isPicturesActive: true,
        isLocationActive: false
    });

    function clickToggle() {
        setActiveElement((prevActiveElement)=> (
            {
                isPicturesActive: !prevActiveElement.isPicturesActive,
                isLocationActive: !prevActiveElement.isLocationActive
            }
        ))
    }

    if (activeElement.isPicturesActive) {
        return (
            <Gallery imgPath={imgPath}>
                {/* <ToggleBtn onClick={clickToggle} isItem1Active={item1Active} isItem2Active={item2Active} text1={"Foto's"} text2={"Locatie"} className={'absolute bottom-4 right-4'}/> */}
            </Gallery>
        )
    } else {
        return (
            <Map address={address}>
                {/* <ToggleBtn onClick={clickToggle} isItem1Active={item1Active} isItem2Active={item2Active} text1={"Foto's"} text2={"Locatie"} className={'absolute bottom-4 right-4'}/> */}
            </Map>
          );
    }
}

export default GalleryMap;