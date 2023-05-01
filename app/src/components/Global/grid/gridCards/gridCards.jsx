import React from 'react';
import styles from './gridCards.module.css';

function GridCards({children}) {
      return (
        <div className={styles.gridCards}>
          
          {children}
        </div>
      );
    }
    
    export default GridCards;