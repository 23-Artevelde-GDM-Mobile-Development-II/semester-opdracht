import ToggleBtn from "../../Btns/ToggleBtn";
import Gallery from "./Gallery";
import GenerateMap from "./GenerateMap";
import React, { useState } from 'react';

function GalleryMap({address, imgPath}) {
    const [item1Active, setItem1Active] = useState(true);
    const [item2Active, setItem2Active] = useState(false);

    function clickToggle() {
        setItem1Active(!item1Active);
        setItem2Active(!item2Active);
    }

    if (item1Active) {
        return (
            <Gallery imgPath={imgPath}>
                <ToggleBtn onClick={clickToggle} isItem1Active={item1Active} isItem2Active={item2Active} text1={"Foto's"} text2={"Locatie"} className={'absolute bottom-4 right-4'}/>
            </Gallery>
        )
    } else {
        return (
            <GenerateMap address={address}>
                <ToggleBtn onClick={clickToggle} isItem1Active={item1Active} isItem2Active={item2Active} text1={"Foto's"} text2={"Locatie"} className={'absolute bottom-4 right-4'}/>
            </GenerateMap>
          );
    }
  
}
export default GalleryMap;