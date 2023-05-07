import styles from './editRemoveBtn.module.css';

function EditRemoveBtn({removeOnly=false, handleClickEdit, handleClickDelete}) {
    return (
        <div className={styles.container}>

            { !removeOnly ? 
                <>
                    <button className={`${styles.btn} ${styles.editBtn}`} click={handleClickEdit}>
                        <i className="fa-solid fa-pencil"></i>
                    </button>
                    <div className={styles.verticalLine}></div>
                </>
                : null 
            }
            

            <button className={`${styles.btn} ${styles.deleteBtn}`} click={handleClickDelete}>
                <i className="fa-solid fa-trash-can"></i>
            </button>
        
        </div>
    );
}
  
export default EditRemoveBtn;