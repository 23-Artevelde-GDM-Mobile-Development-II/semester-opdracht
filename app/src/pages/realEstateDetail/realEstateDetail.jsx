import React, { useState } from 'react';
import LikeBtn from '../../components/Global/btns/likeBtn/likeBtn';
import styles from './realEstateDetail.module.css';
import GalleryMap from '../../components/realEstateDetail/galleryMap/galleryMap';
import ContactCard from '../../components/realEstateDetail/contactCard/contactCard';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Global/loading/loading';
import { useAuthContext } from '../../contexts/AuthContainer';

function RealEstateDetail(props) {

    const {user} = useAuthContext();
    const { realEstateId } = useParams();
    const {
        isLoading,
        error,
        invalidate,
        data: realEstateData
    } = useFetch(`/realEstates/realEstateId/${realEstateId}`);

    if(isLoading){
        return <Loading/>
    }else{

        
        if(error){
            return (
                <div className={styles.mainContainer}>
                    <p>Pand niet gevonden. Controleer de url nog eens op fouten.</p>
                </div>
            )
        }else{
            return (
                <div>
                    {/* Header real estate information */}
                    <div className={styles.realEstateHeader}>
                        <div>
                            <h2>Appartement te huur voor € {realEstateData.realEstate.price}</h2>
        
                            {user &&
                                <div className={styles.flexJustify}>
                                    <i className="fa-solid fa-location-dot"></i>
                                    <p>{realEstateData.location.street} {realEstateData.location.number}, {realEstateData.location.zipCode} {realEstateData.location.city}</p>
                                </div>
                            }
                        </div>
        
                        {
                            user &&
                            <LikeBtn realEstateId={realEstateData._id}/>
        
                        }
                    </div>
        
                    {/* Left container */}
                    <div className={styles.mainContainer}>
                        <div className={styles.leftContainer}>
        
                            {/* Gallery */}
                            <GalleryMap imgPath={realEstateData.images} address={'Bauterstraat Zulte'}/>
        
                            {/* Specificaions - short list */}
        
                            <div className={styles.specsShortlist}>
        
                                <div>
                                    <span className="material-symbols-outlined">home</span>
                                    <p>{realEstateData.realEstate.livingArea} km² woonoppervlakte</p>
                                </div>
        
                                <div>
                                    <span className="material-symbols-outlined">bed</span>
                                    <p>{realEstateData.layout.numberOfBedrooms} kamers</p>
                                </div>
        
                                <div>
                                    <span className="material-symbols-outlined">bathtub</span>
                                    <p>{realEstateData.layout.numberOfBathrooms} bakamers</p>
                                </div>
        
                            </div>
        
        
                            {/* Description */}
                            <h2>Omschrijving</h2>
                            <p className={styles.description}>{realEstateData.description}</p>
        
                            {/* Specifications - specific */}
                            <div className={styles.specifications}>
                                <h2>Gebouw</h2>
                                <div className={styles.specificationsContainer}>
                                    <div className={styles.titles}>
                                        <p>Type pand</p> 
                                        <p>Subtype</p> 
                                        <p>Bewoonbare oppervlakte</p> 
                                        <p>Bouwjaar</p> 
                                    </div>
        
                                    <div>
                                        <p>Appartement</p>
                                        <p>Gelijkvloers</p>
                                        <p>{realEstateData.realEstate.livingArea} m²</p>
                                        <p>{realEstateData.constructionYear}</p>
                                    </div>
        
                                </div>
        
                                <h2>Terrein/ buiten</h2>
                                <div className={styles.specificationsContainer}>
                                    <div className={styles.titles}>
                                        <p>Tuin aanwezig</p> 
                                        <p>Terras aanwezig</p> 
                                        <p>Balkon aanwezig</p> 
                                        <p>Parking aanwezig</p> 
                                        <p>Perceeloppervlakte</p> 
                                    </div>
        
                                    <div>
                                        <p>{realEstateData.outside.gardenAvailable ? 'Ja' : 'Nee'}</p>
                                        <p>{realEstateData.outside.terraceAvailable ? 'Ja' : 'Nee'}</p>
                                        <p>{realEstateData.outside.balconyAvailable ? 'Ja': 'Nee'}</p>
                                        <p>{realEstateData.outside.parkingAvailable ? 'Ja': 'Nee'}</p>
                                        <p>{realEstateData.outside.landAcreage} m²</p>
                                    </div>
        
                                </div>
        
        
                                <h2>Indeling</h2>
                                <div className={styles.specificationsContainer}>
                                    <div className={styles.titles}>
                                        <p>Aantal slaapkamers</p> 
                                        <p>Aantal badkamers</p> 
                                    </div>
        
                                    <div>
                                        <p>{realEstateData.layout.numberOfBedrooms}</p>
                                        <p>{realEstateData.layout.numberOfBathrooms}</p>
                                    </div>
        
                                </div>
        
                                <h2>Energie</h2>
                                <div className={styles.specificationsContainer}>
                                    <div className={styles.titles}>
                                        <p>Type beglazing</p> 
                                        <p>Verwarmingsbron</p> 
                                        <p>Heeft zonnepanelen</p> 
                                        <p>EPC-waarde</p> 
                                    </div>
        
                                    <div>
                                        <p>{realEstateData.energy.glassType === 'single'? 'Enkel glas' : 'Dubbel glas'}</p>
                                        <p>{realEstateData.energy.heatingSource}</p>
                                        <p>{realEstateData.energy.hasSolarPanels ? 'Ja': 'Nee'}</p>
                                        <p>{realEstateData.energy.epc}</p>
                                    </div>
        
                                </div>
                            </div>
        
        
                            <h2>Gepubliceerd door </h2>
                            <div className={styles.estateAgencyInfo} id='estateAgencyInfo'>
                                
                                <img src={realEstateData.agency.image} alt="immokantoor" />
                                <div>
                                    <h3>{realEstateData.agency.name}</h3>
                                    <p><i className='fa-solid fa-location-dot'></i> {realEstateData.agency.street} {realEstateData.agency.number}, {realEstateData.agency.zipCode} {realEstateData.agency.city}</p>
        
                                    <p>{realEstateData.agency.description}</p>
                                </div>
                             
                            </div>
        
        
                        </div>
        
                        {/* Right container */}
        
                        <div className={styles.rightContainer}>
                            
                            <ContactCard isLoggedIn={user ? true : false} 
                            realEstateAgencyData={{
                                img: realEstateData.agency.image,
                                name: realEstateData.agency.name,
                                street: realEstateData.agency.street,
                                number: realEstateData.agency.number,
                                zipCode: realEstateData.agency.zipCode,
                                city: realEstateData.agency.city
                            }}
                            
                            contactPersonData={{
                                firstName: realEstateData.agent.firstname,
                                lastName: realEstateData.agent.lastname,
                                phoneNr: realEstateData.agent.phoneNr,
                                contactPersonId: realEstateData.agent._id 
                            }}

                            realEstateId={realEstateData._id}
                            />
                                        
                        </div>
        
                    </div>
        
        
                </div>
            );
        }
    }

}

export default RealEstateDetail;