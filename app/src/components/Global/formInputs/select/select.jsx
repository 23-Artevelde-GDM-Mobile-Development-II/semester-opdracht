import React from 'react';
import styles from './select.module.css';

function Select({options, selectName, activeOption, handleChange}) {
    return (
        <select className={styles.select} name={selectName} id={selectName} value={activeOption} onChange={handleChange}>
            {
                options.map( option =>(
                    <option value={option.value}>{option.label}</option>
                ))
            }
        </select>


    );
}

export default Select;