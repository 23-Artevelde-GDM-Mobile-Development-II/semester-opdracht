import React from 'react';
import styles from "./primaryBtnLink.module.css";
import { Link } from 'react-router-dom';

function PrimaryBtnLink({location, text}) {
    return (
        <Link to={location} className={styles.primaryBtn}>{text}</Link>
    );

}

export default PrimaryBtnLink;