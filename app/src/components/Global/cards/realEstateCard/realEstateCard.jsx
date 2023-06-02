import { Link } from "react-router-dom";
import LikeBtn from "../../btns/likeBtn/likeBtn";
import EditRemoveBtn from "../../btns/editRemoveBtn/editRemoveBtn";

import styles from './realEstateCard.module.css';
import { useEffect, useState } from "react";
import useMutation from "../../../../hooks/useMutation";
import { useAuthContext } from "../../../../contexts/AuthContainer";

function RealEstateCard({realEstateData, handleClickEdit, userStatus}) {


  // Change color of the epc svg depending on the letter
  let epcLabelColor;

  switch (realEstateData.energy.epc) {
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

  const  {user} = useAuthContext();
  console.log(user,  'user');

  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.imgContainer} style={{backgroundImage: `url(${realEstateData.images[0]})`}}>

        {

          userStatus === 'regular user' ?  
            <div className={styles.likeBtnPosition}>
              <LikeBtn realEstateId={realEstateData._id}/>
            </div>

            :

            <div className={styles.editRemoveBtnPosition}>
              <EditRemoveBtn handleClickEdit={handleClickEdit}/>
            </div>
          }
      </div>

      <Link to={`/panden/${realEstateData._id}`}>
        <div className={styles.houseInfo}>

          <div className={styles.infoCardTop}>
            <p className={styles.typeRealEstate}>
              {
                userStatus !== 'regular user' && user && 

                <span title={realEstateData.published ? 'Gepubliceerd': 'Nog niet gepubliceerd'} className={realEstateData.published ? styles.published: styles.notPublished}></span>
              }
              {realEstateData.type} {realEstateData.realEstate.sellingMethod === 'renting' ? 'te huur' : 'te koop'}
              </p>

            <svg width={82} height={20} viewBox="0 0 82 20" xmlns="http://www.w3.org/2000/svg">
              <title> EPC-label {realEstateData.energy.epc}</title>
              <path d="M40.7925 0H0L4.77358 10L0 20H40.7925L46 10L40.7925 0Z" fill="#3C444E"></path>
              <path d="M76.5455 0H42L47 10L42 20H76.5455L82 10L76.5455 0Z" fill={epcLabelColor}></path>
              <text className={styles.epcIconLabel} x="11.457" y="14.948">EPC</text>
              <text className={styles.epcIconLabel} x="58.0352" y="13.948">{realEstateData.energy.epc}</text>
            </svg>
          </div>
          
          <h3 className={styles.price}>€ {realEstateData.realEstate.price}</h3>

          {user && 
            <div className={styles.location}>
              <p>{realEstateData.location.street} {realEstateData.location.houseNr}</p>

              <p>{realEstateData.location.zipCode} {realEstateData.location.city}</p>
            </div>
          }
          

          <div className={styles.icons}>
            <div>
              <span className="material-symbols-outlined">home</span>
              <p>{realEstateData.realEstate.livingArea} km²</p>
            </div>

            <div>
              <span className="material-symbols-outlined">bed</span>
              <p>{realEstateData.layout.numberOfBedrooms}</p>
            </div>

            <div>
            <span className="material-symbols-outlined">bathtub</span>
              <p>{realEstateData.layout.numberOfBathrooms}</p>
            </div>
            
          </div>

        </div>

        {userStatus !== 'regular user' && realEstateData.isAvailable === false &&
          <div className="bg-red-400 p-4 rounded-b-lg">
            <p className="uppercase font-semibold text-white text-center">Verkocht</p>
          </div> 
        }
      </Link>
    </div>
  );
}

export default RealEstateCard;