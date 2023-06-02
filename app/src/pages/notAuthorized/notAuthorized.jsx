import React from 'react';
import style from "./notAuthorized.module.css";

const NotAuthorized = ({errorMessage}) => {
    return (
        <div className={style.container}>
            <h1 className={style.title}>403</h1>
            <p className={style.description}>{errorMessage}</p>
        </div>
    );
};

export default NotAuthorized;