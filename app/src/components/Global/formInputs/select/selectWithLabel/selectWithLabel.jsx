import React from 'react';
import styles from './selectWithLabel.module.css';
import Select from '../select';

function SelectWithLabel({options, activeOption, name, handleChange, labelText}) {
    return (
        <div>
            <label className={styles.label} htmlFor={name}>{labelText}</label>
            <Select options={options} activeOption={activeOption} selectName={name} handleChange={handleChange
            }/>
        </div>
    );
}

export default SelectWithLabel;