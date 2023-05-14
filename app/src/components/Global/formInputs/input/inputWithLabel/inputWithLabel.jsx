import React from 'react';
import Input from '../input';
import styles from './inputWithLabel.module.css';

function InputWithLabel({name, value, labelText, handleChange, inputType}) {
    return (
        <div>
            <label className={styles.label} htmlFor={name}>{labelText}</label>
            <Input value={value} name={name} handleChange={handleChange} inputType={inputType}/>
        </div>
    );
}

export default InputWithLabel;