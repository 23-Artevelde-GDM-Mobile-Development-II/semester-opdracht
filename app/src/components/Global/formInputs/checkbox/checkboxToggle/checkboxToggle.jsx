import React, { useState } from 'react';
import styles from './checkboxToggle.module.css';

function CheckboxToggle({labelName, inputName, children}) {
    const [toggleElement, setToggleElement] = useState(false);

    return (
        <div className={styles.checkboxMain}>
            <i  onClick={() => setToggleElement((prev) => !prev)} className={`fa-solid fa-chevron-${toggleElement ? 'up' : 'right'}`}></i>

            <input type="checkbox" name={`main-${inputName}`} id={`main-${inputName}`} />
            <label htmlFor={`main-${inputName}`}>{labelName}</label>

            {/* SUBCONTENT */}
            {toggleElement && 
                <div className={`${styles.subContent}`}>
                    {children}
                </div>
            }
        </div>
    );
}

export default CheckboxToggle;