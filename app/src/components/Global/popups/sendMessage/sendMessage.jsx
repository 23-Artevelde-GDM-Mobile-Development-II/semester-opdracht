// import Axios from 'axios';
import { useEffect, useState } from "react";
import messageSentImg from './message_sent.svg';
import Popup from '../popup/popup';
// import RegularBtn from "./RegularBtn";
// import useApiLike from "../../../core/hooks/useApiLike";
import styles from './sendMessage.module.css';
import useMutation from "../../../../hooks/useMutation";
import Loading from "../../loading/loading";

function SendMessage({receiverId, realEstateId}) {
    // Scroll to top of page
    window.scrollTo(0, 0);

    const { isLoading, error, mutate } = useMutation();

    const [message, setMessage] = useState({
        text: '',
        isSend: false
    })

    function handleSubmit(e) {
        e.preventDefault(); 
        mutate(`${process.env.REACT_APP_API_URL}/myMessages/sendMessage`, {
            method: "POST",
            data: {
                receiverId,
                realEstateId,
                messageText: message.text
            },
            onSuccess: (data) => {
                // setRealEstateData(data.realEstates);
                console.log(data);
                setMessage(prevMessage => ({...prevMessage, isSend: true}))
            },
            });
    }

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return (
            <Popup title={'Er is iets fout gelopen'}>
                <p>{error}</p>
            </Popup>
        )
    }
    return (
        <div>
            <Popup title={message.isSend ? "Bericht is verzonden" : "Bericht sturen"}>
                {message.isSend ?
                <div className={styles.messageIsSend}>
                    <img className="h-[200px] mx-auto block mt-12" src={messageSentImg} alt="message is sent"/>
                </div>

                :

                <div>
                    <textarea className={styles.message} onChange={(e)=> setMessage(prevMessage => ({...prevMessage , text: e.target.value}))} value={message.text}/>
                    {/* <SubmitBtn classNameBtn={"block ml-auto"} text={'versturen'} submitAction={handleSubmit}/> */}

                    <div className={styles.btnPosition}>
                        <button onClick={handleSubmit} className={styles.sendBtn}>Versturen</button>
                    </div>
                </div>
                }

                
                
                
            </Popup>
        </div>
    )
        
}
  
export default SendMessage;