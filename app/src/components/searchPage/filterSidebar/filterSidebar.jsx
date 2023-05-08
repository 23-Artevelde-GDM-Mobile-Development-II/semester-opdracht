import React, { useState } from 'react';
import styles from './filterSidebar.module.css';

function FilterSidebar({filterNameDutch, children}) {
    const [toggleElement, setToggleElement] = useState(false);
    return (
        <div>
            <div className={styles.headingToggle}>
                <div>
                    <h3>{filterNameDutch}</h3>
                    <i  onClick={() => setToggleElement((prev) => !prev)} className={`fa-solid fa-chevron-${toggleElement ? 'up' : 'down'}`}></i>
                </div>
                <hr />
            </div>

            {
                toggleElement && 
                    <div className={`${styles.contentToggle}`}>
                    {children}
                </div>
            }     

        </div>

    );
}

export default FilterSidebar;