import React from 'react';
import LikeBtn from '../../components/Global/btns/likeBtn/likeBtn';
import styles from './realEstateDetail.module.css';

function RealEstateDetail(props) {
    return (
        <div>
            <div className={styles.realEstateHeader}>
                <div>
                    <h2>Appartement te huur voor € 650,98</h2>

                    <div className={styles.flexJustify}>
                        <i class="fa-solid fa-location-dot"></i>
                        <p>Kapelstraat 32, 3600 Genk</p>
                    </div>
                </div>
                <LikeBtn liked={false}/>
            </div>
            
            <h4>QSHJDSHKS</h4>
        </div>
    );
}

export default RealEstateDetail;