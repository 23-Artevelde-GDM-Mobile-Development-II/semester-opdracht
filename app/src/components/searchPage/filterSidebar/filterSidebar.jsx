import React from 'react';
import styles from './filterSidebar.module.css';

function FilterSidebar({filterNameValue, filterNameDutch, toggleFunction, children}) {
    return (
        <div>
            <div className={styles.headingToggle}>
                <div>
                    <h3>{filterNameDutch}</h3>
                    <i onClick={toggleFunction} className="fa-solid fa-chevron-down"></i>
                </div>
                <hr />
            </div>

            <div className={`${styles.contentToggle} ${filterNameValue ? styles.toggleOpen : styles.toggleClosed}`}>
                {children}
            </div>
                    

        </div>

    );
}

export default FilterSidebar;