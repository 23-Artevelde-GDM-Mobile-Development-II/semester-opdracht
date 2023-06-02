import { useEffect, useState } from 'react';
import useMutation from '../../../../hooks/useMutation';
import styles from './editRemoveBtn.module.css';
import { useNavigate } from 'react-router-dom';

function EditRemoveBtn({removeOnly=false, handleClickEdit, id, handleDeleteAction, handleEditAction}) {

    const navigate = useNavigate();
    const [actionUrl, setActionUrl] = useState('');
    const { isLoadingMutation, errorMutation, mutate } = useMutation();

    console.log(isLoadingMutation, errorMutation);

    useEffect(()=>{
        if(handleDeleteAction){
            if(handleDeleteAction === "deleteUser"){
                setActionUrl(`/users/${id}`);

            }else if (handleDeleteAction === "deleteEmployee"){
                setActionUrl(`/realEstateAgencies/myAgency/employees/${id}`);
        
            }else if(handleDeleteAction === "deleteRealEstate"){
        
            }else if(handleDeleteAction === "deleteRealEstateAgency"){
        
            }else if(handleDeleteAction === "deleteType"){
                setActionUrl(`/realEstates/types/${id}`);

            }else if(handleDeleteAction === "deleteSubtype"){
                setActionUrl(`/realEstates/subTypes/${id}`);
            }else{
    
            }
        }
    }, [handleDeleteAction, id])
    
    

    function handleDelete(){
        if(actionUrl.length> 0){
            mutate(`${process.env.REACT_APP_API_URL}${actionUrl}`, {
                method: "DELETE",
                onSuccess: (data) => {
                    navigate(0);
                },
            });
        }
    }

    function handleEdit(){
    
    }

    
    


    // useEffect(()=>{

    //     if (favoritesData) {
    //         setIsLiked(favoritesData.some((favorite) => favorite._id.toString() === realEstateId));
    //       }
    // }, [id]);

    

    return (
        <div className={styles.container}>

            { !removeOnly ? 
                <>
                    <button className={`${styles.btn} ${styles.editBtn}`} onClick={handleClickEdit}>
                        <i className="fa-solid fa-pencil"></i>
                    </button>
                    <div className={styles.verticalLine}></div>
                </>
                : null 
            }
            

            <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={handleDelete}>
                <i className="fa-solid fa-trash-can"></i>
            </button>
        
        </div>
    );
}
  
export default EditRemoveBtn;