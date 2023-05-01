import { Link } from "react-router-dom";
import LikeBtn from "../../btns/likeBtn/likeBtn";
import EditRemoveBtn from "../../btns/editRemoveBtn/editRemoveBtn";

import styles from './realEstateCard.module.css';

function RealEstateCard({realEstateData, isLiked, handleClickDelete, handleClickEdit, isLoggedIn, userStatus}) {
  
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.imgContainer} style={{backgroundImage: `url(${realEstateData.imgUrl})`}}>

        {
            (() => {
              if (userStatus)
                return (
                    <div className={styles.likeBtnPosition}>
                        <LikeBtn/>
                    </div>
                )
              else
                return (
                    <div className={styles.editRemoveBtnPosition}>
                        <EditRemoveBtn handleClickDelete={handleClickDelete} handleClickEdit={handleClickEdit}/>
                    </div>
                
              )
          })()
        }

        
        
        

        <p className={styles.price}>€ {realEstateData.price}</p>
      </div>

      <Link to={`/gebouw/${realEstateData.propertyId}`}>
        <div className={styles.houseInfo}>
          <h3 className="font-bold text-lg mb-4">{realEstateData.type} {realEstateData.sellingMethode}</h3>

          {isLoggedIn ? 
            <div className={styles.location}>
              <p>{realEstateData.street} {realEstateData.houseNr}</p>

              <p>{realEstateData.zipCode} {realEstateData.city}</p>
            </div>
            :
            <></>
          }
          


          <div className={styles.icons}>
            <div><i className="fa-solid fa-house mr-2"></i> {realEstateData.measurements}m²</div>

            <div><i className={`fa-solid fa-bed ${styles.icon}`}></i> {realEstateData.bedrooms}</div>

            <div><i className={`fa-solid fa-bath ${styles.icon}`}></i> {realEstateData.bathrooms}</div>  

            <div><i className={`fa-solid fa-trowel-bricks ${styles.icon}`}></i> {realEstateData.constructionYear}</div>

          </div>

        </div>
        {userStatus === false && realEstateData.unavailable === true ? 
          <div className="bg-red-400 p-4 rounded-b-lg">
            <p className="uppercase font-semibold text-white text-center">Verkocht</p>
          </div> 
          : 
          <></>
        }
      </Link>
    </div>
  );
}

export default RealEstateCard;