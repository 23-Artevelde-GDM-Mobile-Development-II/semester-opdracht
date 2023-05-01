import styles from './likeBtn.module.css';

function LikeBtn({liked, onLike, onDislike, disabled}) {
 

    if(liked){
        return <button className={styles.likeBtn} click={onLike} disabled={disabled}><i className="fa-solid fa-heart"></i></button>
    }else{
        return <button className={styles.likeBtn} click={onDislike} disabled={disabled}><i className="fa-regular fa-heart"></i></button>
    }
   
        
}
  
export default LikeBtn;