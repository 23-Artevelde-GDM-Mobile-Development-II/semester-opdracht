import React, { useState } from 'react';
import Input from '../input';
import styles from './passwordWithLabel.module.css';

function PasswordWithLabel({name, value, labelText, handleChange}) {
    const [passwordShown , setPasswordShown ] = useState(false);

    function toggleVisibility() {
        setPasswordShown(prevState => !prevState);
    }
    
    return (
        <div>
            <label className={styles.label} htmlFor={name}>{labelText}</label>
            <div className={styles.passwordContainer}>
                <Input value={value} name={name} handleChange={handleChange} inputType={passwordShown? "text": "password"}/>
                <button className={styles.toggleVisibilityBtn} onClick={toggleVisibility}>{passwordShown? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}</button>
            </div>
            
        </div>
    );
}

export default PasswordWithLabel;