import React from 'react';
import styles from './input.module.css';

function Input({inputType, value, name, handleChange}) {
    return (
        
        <input type={inputType} value={value} id={name} name={name} className={styles.input} onChange={handleChange}/>
    
    );
}

export default Input;