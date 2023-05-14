// import Axios from 'axios';
import { useEffect, useState } from "react";
import messageSentImg from './message_sent.svg';
import Popup from '../popup/popup';
// import RegularBtn from "./RegularBtn";
// import useApiLike from "../../../core/hooks/useApiLike";
import styles from './sendMessage.module.css';

function SendMessage({sender_id, receiver_id}) {
    // Scroll to top of page
    window.scrollTo(0, 0);

    const [message, setMessage] = useState({
        text: '',
        isSend: false
    })

    function handleSubmit() {
        // Axios({
        //     method: 'post',
        //     data: {
        //         sender_id: sender_id,
        //         receiver_id: receiver_id,
        //         message: message,
        //         read: false
        //     },
        //     withCredentials: true,
        //     url: `${process.env.REACT_APP_API_URL}/message/add`,
        // }).then((res) => {
        //     console.log(res);
        //     if(res.data.status === 200){
        //         setStep2(true);
        //     }
        // });
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
                    <textarea className={styles.message} onChange={(e)=> setMessage(e.target.value)}></textarea>
                    {/* <SubmitBtn classNameBtn={"block ml-auto"} text={'versturen'} submitAction={handleSubmit}/> */}

                    <div className={styles.btnPosition}>
                        <button type='submit' onSubmit={handleSubmit} className={styles.sendBtn}>Versturen</button>
                    </div>
                </div>
                }

                
                
                
            </Popup>
        </div>
    )
        
}
  
export default SendMessage;