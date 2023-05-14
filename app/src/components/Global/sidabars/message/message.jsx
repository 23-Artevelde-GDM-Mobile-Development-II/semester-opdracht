import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './message.module.css';

function Message({messageData, senderData, handleClose, handleReply, open, handleSend, handleInputChange}) {

    // const reply =  false;
    // const [toggleMessage, setToggleMessage] = useState(false); 
    const [toggle, setToggle] = useState({
        message: false,
        reply: false
    }); 

    const [replyData, setReplyData] = useState({
        message: '',
        repliedMessageId: '',
        date: '',
        senderId: '',
        recieverId: ''
    })
    // const [open, setOpen] = useState(true);
    
    // function handleClick(){
    //     setOpen(!open);
    // }

    function handleToggle(toggleItem) {
        setToggle(prevToggle => {
            return {
                ...prevToggle,
                [toggleItem]: !(prevToggle[toggleItem])
            }
        })
    }

    return (
        <div>
            <div className={styles.overlay}></div>
            <div className={styles.messagePopup}>
        
                <button onClick={handleClose} className={styles.closeBtn}>
                    <i className="fa-solid fa-xmark"></i>
                </button>

                {!toggle.reply && 
                <button onClick={()=> handleToggle('reply')} className={styles.replyBtn}>
                    <i className="fa-solid fa-reply"></i> <span>Antwoorden</span>
                </button>
                }
                

                <div className={styles.senderInfo}>
                    <h2 className={`my-4 font-bold text-xl `}>{senderData.firstName} {senderData.lastName}</h2>

                    <div>
                        <span className="font-bold">Email: </span>
                        <Link className="underline" to={`mailto:${senderData.email}`}>{senderData.email}</Link>
                    </div>

                    <div>
                        <span className="font-bold">Tel: </span>
                        <Link className="underline" to={`tel:${senderData.phoneNr}`}>{senderData.phoneNr}</Link>
                    </div>
                            
                </div>


                <div className={styles.messageTextContainer}>

                    <div className={styles.realEstateInfo}>
                        <img src="https://images.familyhomeplans.com/cdn-cgi/image/fit=contain,quality=100/plans/44207/44207-b1200.jpg" alt="cover real estate" />
                        <div>
                            <h3>Appartement te huur voor €649</h3>
                            <Link to={'/test'} target="_blank">Bekijk dit pand</Link>
                        </div>
                    </div>

                        {toggle.reply? 
                            <>
                                    <button className={styles.toggleBtn} onClick={()=> handleToggle('message')}>
                                        <i className={`fa-solid fa-angle-${toggle.message ? 'up' : 'down'}`}></i> 
                                        <span>Bericht</span>
                                    </button>
                                    
                                    {toggle.message &&
                                    <p>{messageData.message}</p>
                                    }

                                    <h3 className={styles.replyTitle}>Nieuw bericht</h3>
                                    <textarea className={styles.replyTextarea} onChange={(e) => handleInputChange(e.target)}/>
                                    <div className={styles.sendBtnPosition}>
                                        <button className={styles.primaryBtn} onClick={handleSend}>Versturen</button>
                                    </div>
                                
                            </>

                           
                        : 
                            
                        <p>{messageData.message}</p>
                            
                    }
                            
                </div>
                    
            </div>

        </div>
    );
    
}
export default Message;