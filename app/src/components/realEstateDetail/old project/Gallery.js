import RegularBtn from "../../Btns/RegularBtn";
import React, {useState } from 'react';
import ToggleBtn from "../../Btns/ToggleBtn";

function Gallery({imgPath, children}) {

    const [active, setActive] = useState(1);

    function nextImg() {
        setActive(active + 1);
        if (active> (imgPath.length-1)) {
            setActive(1);
        }
    }

    function prevImg() {
        setActive(active -1);
        if (active < 2) {
            setActive(imgPath.length);
        }
    }

    return (
      <div className="img-gallery rounded-xl h-[400px] relative  w-full md:w-[65%]">
        {imgPath.map(img => {
            // console.log(active);
            // console.log(imgPath.indexOf(img) + 1);
            // console.log(active !== (imgPath.indexOf(img) + 1));
            return(
                <div key={img} className={`slides ${active !== (imgPath.indexOf(img) + 1)  ? 'hidden' : ''}`}>
                    <img className="w-full h-[400px] object-cover rounded-xl" src={img} alt="pictures" />
                </div>
            )
            
        })}

        <RegularBtn click={prevImg} text={<i className="fa-solid fa-chevron-left prev absolute top-[40%] text-[21px] left-[2em] text-blue-100"></i>}/>
        <RegularBtn click={nextImg} text={<i className="fa-solid fa-chevron-right next absolute top-[40%] text-[21px] right-[2em] text-blue-100"></i>}/>

        {children}
      </div>
    );
  }
  export default Gallery;