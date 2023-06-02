import { useEffect, useState } from 'react';
import useFetch from '../../../../hooks/useFetch';
import styles from './likeBtn.module.css';
import useMutation from '../../../../hooks/useMutation';

function LikeBtn({realEstateId}) {

    const [isLiked, setIsLiked] = useState(false);

    const { isLoadingMutation, errorMutation, mutate } = useMutation();
    

    const {
        isLoading,
        error,
        invalidate,
        data: favoritesData
    } = useFetch(`/myFavorites`);


    useEffect(()=>{

        if (favoritesData) {
            setIsLiked(favoritesData.some((favorite) => favorite._id.toString() === realEstateId));
          }
    }, [favoritesData, realEstateId]);

    function handleAction(method){

        mutate(`${process.env.REACT_APP_API_URL}/myfavorites/${realEstateId}`, {
            method: method,
            onSuccess: (data) => {
                setIsLiked(!isLiked);
            },
          });
    }

    console.log(error, isLoading, favoritesData);


    if(isLoading){
        return <></>
    }else{
        if(error && error !== 'Not Found'){
            return <></> 
        }
    
        if(isLiked){
            return <button className={styles.likeBtn} onClick={() => handleAction('DELETE')}><i className="fa-solid fa-heart"></i></button>
        }else{
            return <button className={styles.likeBtn} onClick={() => handleAction('POST')}><i className="fa-regular fa-heart"></i></button>
        }
    }
   
        
}
  
export default LikeBtn;