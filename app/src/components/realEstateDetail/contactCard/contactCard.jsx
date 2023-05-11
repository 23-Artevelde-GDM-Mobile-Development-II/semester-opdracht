import { Link } from "react-router-dom";
import SecondaryBtnLink from "../../Global/btns/secondaryBtnLink/secondaryBtnLink";
import styles from './contactCard.module.css';

function ContactCard({isLoggedIn, estateAgencyData, contactPersonData}) {

    return(
        <div className="bg-sky-100 w-[30%] rounded-xl p-6 hidden md:block">
            <div className={styles.justifyBetween}>
                <img className="block mx-auto rounded-lg mb-8 max-h-[100px]" src={estateAgencyData.img} alt="Immokantoor" />

                <div>
                    <h3 className="mb-1 font-bold text-lg text-center">{estateAgencyData.name}</h3>
                    <p className="mb-8">{estateAgencyData.street} {estateAgencyData.number}</p>
                    <p>{estateAgencyData.zipCode} {estateAgencyData.city}</p>
                    <SecondaryBtnLink text={'Lees meer'} location={'#estateAgencyInfo'}/>
                </div>
            </div>
    
            <hr />

            {isLoggedIn &&
                <div>
                    <h4>Contactpersoon</h4>

                    <div className={styles.contactPerson}>
                        <img src={contactPersonData.img} alt="avatar" />
                        <div>
                            <p>{contactPersonData.firstName} {contactPersonData.lastName}</p>
                            <p>Makelaar</p>
                        </div>

                        <div className={styles.contactBtns}>
                            <button>
                                <i className="fa-solid fa-envelope"></i>
                            </button>

                            <Link to={`tel:${contactPersonData.phoneNr}`}>
                                <i className="fa-solid fa-phone"></i>
                            </Link>
                        </div>
                    </div>

                </div>
            }

            
        </div>
    )
}
export default ContactCard;