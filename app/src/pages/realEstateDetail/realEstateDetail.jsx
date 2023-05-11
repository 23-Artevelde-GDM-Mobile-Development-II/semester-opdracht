import React from 'react';
import LikeBtn from '../../components/Global/btns/likeBtn/likeBtn';
import styles from './realEstateDetail.module.css';
import GalleryMap from '../../components/realEstateDetail/galleryMap/galleryMap';
import ContactCard from '../../components/realEstateDetail/contactCard/contactCard';

function RealEstateDetail(props) {
    return (
        <div>
            {/* Header real estate information */}
            <div className={styles.realEstateHeader}>
                <div>
                    <h2>Appartement te huur voor € 650,98</h2>

                    <div className={styles.flexJustify}>
                        <i className="fa-solid fa-location-dot"></i>
                        <p>Kapelstraat 32, 3600 Genk</p>
                    </div>
                </div>
                <LikeBtn liked={false}/>
            </div>
            
            <h4>QSHJDSHKS</h4>

            <div className="leftContainer">
                <GalleryMap imgPath={['https://namastehallyu.com/wp-content/uploads/2021/08/IMG-20210819-WA0003.jpg', 'https://image.kpopmap.com/2021/04/Ateez-mbti-cover.jpg', 'https://img.kpopmap.com/780x0/2021/04/ATEEZ-members-mbti-5.jpg', 'https://img.kpopmap.com/780x0/2021/04/ATEEZ-members-mbti-4.jpg', 'https://img.kpopmap.com/780x0/2021/04/ATEEZ-members-mbti-7.jpg']} address={'Bauterstraat Zulte'}/>

            </div>

            <div className="rightContainer">
                
            <ContactCard isLoggedIn={true} 
            estateAgencyData={{
                img: 'https://www.era.be/sites/all/themes/custom/dropsolid-base-7/images/og_default.png',
                name: 'Era immokantoor',
                street: 'Bauterstraat',
                number: 29,
                zipCode: 9870,
                city: 'Zulte'
            }}
            
            contactPersonData={{
                img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
                firstName: 'Iris',
                lastName: 'Maenhout',
                phoneNr: '123-456-7890'
            }}/>
                        
        
            </div>
        </div>
    );
}

export default RealEstateDetail;