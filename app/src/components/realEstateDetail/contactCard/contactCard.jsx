import { Link } from "react-router-dom";
import SecondaryBtnLink from "../../Global/btns/secondaryBtnLink/secondaryBtnLink";
import styles from './contactCard.module.css';
import { useState } from "react";
import SendMessage from "../../Global/popups/sendMessage/sendMessage";

function ContactCard({isLoggedIn, estateAgencyData, contactPersonData}) {


    function openPopup() {
        document.querySelector('dialog').showModal();
        
    }

    return(
        <>
            <SendMessage/>
            

            <div className={styles.contactCard}>
                <div className={styles.justifyBetween}>
                    <div className={styles.agnecyImgContainer}>
                        <img className="block mx-auto rounded-lg mb-8 max-h-[100px]" src={estateAgencyData.img} alt="Immokantoor" />
                    </div>

                    <div className={styles.cardEstateAgencyInfo}>
                        <h3>{estateAgencyData.name}</h3>
                        <p>{estateAgencyData.street} {estateAgencyData.number}</p>
                        <p>{estateAgencyData.zipCode} {estateAgencyData.city}</p>

                        <a className={styles.secondaryBtn} href="#estateAgencyInfo">Lees meer</a>
                    </div>
                </div>
        
                <hr />

                {isLoggedIn ?
                    <div>
                        <h4>Contactpersoon</h4>

                        <div className={`${styles.contactPerson} ${styles.justifyBetween}`}>
                            <img src={contactPersonData.img} alt="avatar" />
                            <div>
                                <p className={styles.name}>{contactPersonData.firstName} {contactPersonData.lastName}</p>
                                <p>Makelaar</p>
                            </div>

                            <div className={styles.contactBtns}>
                                <button className={styles.btn} onClick={openPopup}>
                                    <i className="fa-solid fa-envelope"></i>
                                </button>

                                <Link className={styles.btn} to={`tel:${contactPersonData.phoneNr}`}>
                                    <i className="fa-solid fa-phone"></i>
                                </Link>
                            </div>
                        </div>

                    </div>

                    :

                    <div className={styles.loggedOutMessage}>
                        <i className="fa-solid fa-circle-info"></i>
                        <p>Je moet ingelogd zijn als je een bericht wilt sturen.</p>
                    </div>
                }

                
            </div>
        </>
    )
}
export default ContactCard;