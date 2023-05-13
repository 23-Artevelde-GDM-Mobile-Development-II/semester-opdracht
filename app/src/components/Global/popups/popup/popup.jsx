import React from 'react';
import styles from './popup.module.css';

function Popup({title, children}) {
    
    function closeBtn() {
        document.querySelector('dialog').close();
    }

    return (
        <dialog className={styles.popup}>
        
            <button onClick={closeBtn} className={styles.closeBtn}>
                <i className="fa-solid fa-xmark"></i>
            </button>

            <h2 className={styles.title}>{title}</h2>

            {children}
        </dialog>
    )
    
    
}
export default Popup;