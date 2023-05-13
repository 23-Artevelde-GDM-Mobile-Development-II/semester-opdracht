import React from 'react';
import LikeBtn from '../../components/Global/btns/likeBtn/likeBtn';
import styles from './realEstateDetail.module.css';
import GalleryMap from '../../components/realEstateDetail/galleryMap/galleryMap';
import ContactCard from '../../components/realEstateDetail/contactCard/contactCard';

function RealEstateDetail(props) {
    const isLoggedIn = true;
    return (
        <div>
            {/* Header real estate information */}
            <div className={styles.realEstateHeader}>
                <div>
                    <h2>Appartement te huur voor € 650,98</h2>

                    {isLoggedIn &&
                        <div className={styles.flexJustify}>
                            <i className="fa-solid fa-location-dot"></i>
                            <p>Kapelstraat 32, 3600 Genk</p>
                        </div>
                    }
                </div>

                {
                    isLoggedIn &&
                    <LikeBtn liked={false} actionFunc={()=> console.log('liked')}/>

                }
            </div>

            {/* Left container */}
            <div className={styles.mainContainer}>
                <div className={styles.leftContainer}>

                    {/* Gallery */}
                    <GalleryMap imgPath={['https://namastehallyu.com/wp-content/uploads/2021/08/IMG-20210819-WA0003.jpg', 'https://image.kpopmap.com/2021/04/Ateez-mbti-cover.jpg', 'https://img.kpopmap.com/780x0/2021/04/ATEEZ-members-mbti-5.jpg', 'https://img.kpopmap.com/780x0/2021/04/ATEEZ-members-mbti-4.jpg', 'https://img.kpopmap.com/780x0/2021/04/ATEEZ-members-mbti-7.jpg']} address={'Bauterstraat Zulte'}/>

                    {/* Specificaions - short list */}

                    <div className={styles.specsShortlist}>

                        <div>
                            <span className="material-symbols-outlined">home</span>
                            <p>24248 km² woonoppervlakte</p>
                        </div>

                        <div>
                            <span className="material-symbols-outlined">bed</span>
                            <p>3 kamers</p>
                        </div>

                        <div>
                            <span className="material-symbols-outlined">bathtub</span>
                            <p>2 bakamers</p>
                        </div>

                    </div>


                    {/* Description */}
                    <h2>Omschrijving</h2>
                    <p className={styles.description}>CONGRES - Bathim&CO presenteert een prachtig gerenoveerd huis gelegen op het gelijkvloers van een prachtig herenhuis gelegen in het centrum van Brussel vlakbij winkels, restaurants en openbaar vervoer. De woning bestaat uit een</p>

                    {/* Specifications - specific */}
                    <div className={styles.specifications}>
                        <h2>Gebouw</h2>
                        <div className={styles.specificationsContainer}>
                            <div className={styles.titles}>
                                <p>Type pand</p> 
                                <p>Subtype</p> 
                                <p>Bewoonbare oppervlakte (m²)</p> 
                                <p>Bouwjaar</p> 
                            </div>

                            <div>
                                <p>Appartement</p>
                                <p>Gelijkvloers</p>
                                <p>2432</p>
                                <p>2016</p>
                            </div>

                        </div>

                        <h2>Terrein/ buiten</h2>
                        <div className={styles.specificationsContainer}>
                            <div className={styles.titles}>
                                <p>Type pand</p> 
                                <p>Subtype</p> 
                                <p>Bewoonbare oppervlakte (m²)</p> 
                                <p>Bouwjaar</p> 
                            </div>

                            <div>
                                <p>Appartement</p>
                                <p>Gelijkvloers</p>
                                <p>2432</p>
                                <p>2016</p>
                            </div>

                        </div>


                        <h2>Indeling</h2>
                        <div className={styles.specificationsContainer}>
                            <div className={styles.titles}>
                                <p>Type pand</p> 
                                <p>Subtype</p> 
                                <p>Bewoonbare oppervlakte (m²)</p> 
                                <p>Bouwjaar</p> 
                            </div>

                            <div>
                                <p>Appartement</p>
                                <p>Gelijkvloers</p>
                                <p>2432</p>
                                <p>2016</p>
                            </div>

                        </div>

                        <h2>Energie</h2>
                        <div className={styles.specificationsContainer}>
                            <div className={styles.titles}>
                                <p>Type pand</p> 
                                <p>Subtype</p> 
                                <p>Bewoonbare oppervlakte (m²)</p> 
                                <p>Bouwjaar</p> 
                            </div>

                            <div>
                                <p>Appartement</p>
                                <p>Gelijkvloers</p>
                                <p>2432</p>
                                <p>2016</p>
                            </div>

                        </div>
                    </div>


                    <h2>Gepubliceerd door </h2>
                    <div className={styles.estateAgencyInfo} id='estateAgencyInfo'>
                        
                        <img src="https://www.era.be/sites/all/themes/custom/dropsolid-base-7/images/og_default.png" alt="immokantoor" />
                        <div>
                            <h3>Immokantoor</h3>
                            <p><i className='fa-solid fa-location-dot'></i> Kerkstraat 13, 9870 Zulte</p>

                            <p>Era is ontstaan uit onze gezamenlijke passie voor woon- en nieuwbouwvastgoed. Wij brengen deze passies samen in een uniek en verfrissend verhaal op de residentiële vastgoedmarkt. Altro wil het anders en beter doen met een kwalitatieve dienstverlening op maat van de klant. </p>
                        </div>
                     
                    </div>


                </div>

                {/* Right container */}

                <div className={styles.rightContainer}>
                    
                    <ContactCard isLoggedIn={true} 
                    estateAgencyData={{
                        img: 'https://www.era.be/sites/all/themes/custom/dropsolid-base-7/images/og_default.png',
                        name: 'Era immokantoor',
                        street: 'Kerkstraat',
                        number: 13,
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


        </div>
    );
}

export default RealEstateDetail;