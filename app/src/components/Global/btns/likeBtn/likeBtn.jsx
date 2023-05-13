import styles from './likeBtn.module.css';

function LikeBtn({liked, actionFunc}) {
 

    if(liked){
        return <button className={styles.likeBtn} onClick={actionFunc}><i className="fa-solid fa-heart"></i></button>
    }else{
        return <button className={styles.likeBtn} onClick={actionFunc}><i className="fa-regular fa-heart"></i></button>
    }
   
        
}
  
export default LikeBtn;