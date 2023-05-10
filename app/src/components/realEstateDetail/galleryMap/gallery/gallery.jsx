import React, { useState } from 'react';
import styles from './gallery.module.css';

function Gallery({imgPath}) {
    const [active, setActive] = useState(1);

    // function nextImg() {
    //     setActive(active + 1);
    //     if (active> (imgPath.length-1)) {
    //         setActive(1);
    //     }
    // }

    // function prevImg() {
    //     setActive(active -1);
    //     if (active < 2) {
    //         setActive(imgPath.length);
    //     }
    // }
    return (
        <div className={styles.imgGallery}>
        {imgPath.map(img => {
            return(
                <div key={img} className={`slides ${active !== (imgPath.indexOf(img) + 1)  ? styles.hidden : ''}`}>
                    <img src={img} alt="pictures" />
                </div>
            )
            
        })}

        {/* <RegularBtn click={prevImg} text={<i className="fa-solid fa-chevron-left prev absolute top-[40%] text-[21px] left-[2em] text-blue-100"></i>}/> */}
        {/* <RegularBtn click={nextImg} text={<i className="fa-solid fa-chevron-right next absolute top-[40%] text-[21px] right-[2em] text-blue-100"></i>}/> */}

        
      </div>
    );
}

export default Gallery;