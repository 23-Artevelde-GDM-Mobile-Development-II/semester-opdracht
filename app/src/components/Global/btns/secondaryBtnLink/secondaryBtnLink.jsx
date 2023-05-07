import React from 'react';
import { Link } from 'react-router-dom';
import styles from './secondBtnLink.module.css';

function SecondaryBtnLink({text, location}) {
    return (
        <Link to={location} className={styles.secondaryBtn}>{text}</Link>
    );
}

export default SecondaryBtnLink;