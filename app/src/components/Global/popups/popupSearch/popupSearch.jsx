// import { Children } from "react";
// import CardSearchPopup from "../Card/CardSearchPopup/CardSearchPopup";
import { useState } from "react";
import Input from "../../formInputs/input/input";
import Popup from "../popup/popup";
import styles from "./popupSearch.module.css";

function PopupSearch({searchUsers, onSearchValueChange, onSearch, children}) {
    // Scroll to top of page
    window.scrollTo(0, 0);

    const [inputValue, setInputValue] = useState("");


  return(
    <>
        <Popup title={`${searchUsers? 'Werknemer' : 'Immokantoor'} toevoegen`}>
            {/* Searchbar */}
            <div className={styles.searchbar}>
                <Input inputType={"search"} value={inputValue} name={"search"} handleChange={(e)=> setInputValue(e.currentTarget.value)}/>

                <button onClick={onSearch} className="bg-primair-blue block py-2 px-4 rounded-r-md text-white text-lg"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>

            <div className={styles.cardsChildren}>
                {
                    children
                }
            </div>
            
        </Popup>
    </>
  )  
}

export default PopupSearch;