import { Link } from "react-router-dom";
import LikeBtn from "../../btns/likeBtn/likeBtn";
import EditRemoveBtn from "../../btns/editRemoveBtn/editRemoveBtn";

import styles from './realEstateCard.module.css';

function RealEstateCard({realEstateData, isLiked, handleClickDelete, handleClickEdit, isLoggedIn, userStatus}) {

  // Change color of the epc svg depending on the letter
  let epcLabelColor;

  switch (realEstateData.epcLabel) {
    case 'a':
      epcLabelColor = "#46993C";
      break;
    
    case 'b':
      epcLabelColor = "#BDCA25";
      break;
    case "c":
      epcLabelColor = "#E9CC15";
      break;
    case 'd':
      epcLabelColor = "#F9AD41";
      break;
    case 'e':
      epcLabelColor = "#EE742C";
      break;
    case 'f':
      epcLabelColor = "#D92B2D";
      break;
    default:
      epcLabelColor = "#555555"
      break;
  }
  
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.imgContainer} style={{backgroundImage: `url(${realEstateData.imgUrl})`}}>

        {

          userStatus === 'regular user' ?  
            <div className={styles.likeBtnPosition}>
              <LikeBtn liked={isLiked}/>
            </div>

            :

            <div className={styles.editRemoveBtnPosition}>
              <EditRemoveBtn handleClickDelete={handleClickDelete} handleClickEdit={handleClickEdit}/>
            </div>
          }
      </div>

      <Link to={`/gebouw/${realEstateData.propertyId}`}>
        <div className={styles.houseInfo}>

          <div className={styles.infoCardTop}>
            <p className={styles.typeRealEstate}>
              {
                userStatus !== 'regular user' && isLoggedIn && 

                <span title={realEstateData.isPublished ? 'Gepubliceerd': 'Nog niet gepubliceerd'} className={realEstateData.isPublished ? styles.published: styles.notPublished}></span>
              }
              {realEstateData.type} {realEstateData.sellingMethode}
              </p>

            <svg width={82} height={20} viewBox="0 0 82 20" xmlns="http://www.w3.org/2000/svg">
              <title> EPC-label {realEstateData.epcLabel}</title>
              <path d="M40.7925 0H0L4.77358 10L0 20H40.7925L46 10L40.7925 0Z" fill="#3C444E"></path>
              <path d="M76.5455 0H42L47 10L42 20H76.5455L82 10L76.5455 0Z" fill={epcLabelColor}></path>
              <text className={styles.epcIconLabel} x="11.457" y="14.948">EPC</text>
              <text className={styles.epcIconLabel} x="58.0352" y="13.948">{realEstateData.epcLabel}</text>
            </svg>
          </div>
          
          <h3 className={styles.price}>€ {realEstateData.price}</h3>

          {isLoggedIn ? 
            <div className={styles.location}>
              <p>{realEstateData.street} {realEstateData.houseNr}</p>

              <p>{realEstateData.zipCode} {realEstateData.city}</p>
            </div>
            :
            <></>
          }
          


          {/* <div className={styles.icons}>
            <div><i className="fa-solid fa-house mr-2"></i> {realEstateData.measurements}m²</div>

            <div><i className={`fa-solid fa-bed ${styles.icon}`}></i> {realEstateData.bedrooms}</div>

            <div><i className={`fa-solid fa-bath ${styles.icon}`}></i> {realEstateData.bathrooms}</div>  

            <div><i className={`fa-solid fa-trowel-bricks ${styles.icon}`}></i> {realEstateData.constructionYear}</div>

          </div> */}

          <div className={styles.icons}>
            <div>
              <span className="material-symbols-outlined">home</span>
              <p>{realEstateData.measurements} km²</p>
            </div>

            <div>
              <span className="material-symbols-outlined">bed</span>
              <p>{realEstateData.bedrooms}</p>
            </div>

            <div>
            <span className="material-symbols-outlined">bathtub</span>
              <p>{realEstateData.bathrooms}</p>
            </div>
            
          </div>

        </div>

        {userStatus !== 'regular user' && realEstateData.unavailable === true &&
          <div className="bg-red-400 p-4 rounded-b-lg">
            <p className="uppercase font-semibold text-white text-center">Verkocht</p>
          </div> 
        }
      </Link>
    </div>
  );
}

export default RealEstateCard;