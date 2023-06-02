
import { useState } from "react";
import style from "./home.module.css";
import PrimaryBtnLink from "../../components/Global/btns/primaryBtnLink/primaryBtnLink";
import ROUTES from "../../consts/routes";

const Home = () => {

    return (
       <div>
            <img className={style.coverImage} src="https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="Interieur" />
            <div className={style.position}>
                <PrimaryBtnLink location={ROUTES.searchRealEstate} text={"Vind het huis van je dromen"}/>
            </div>
            
       </div>
    );
};

export default Home;