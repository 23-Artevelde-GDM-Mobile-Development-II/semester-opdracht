import React, { useState } from 'react';
import DashboardAccountSidebar from '../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar';
import styles from './messages.module.css';
import ROUTES from '../../../consts/routes';
import AllMessagesList from '../../../components/Global/tables/message/allMessagesList';
import Message from '../../../components/Global/sidabars/message/message';

function Messages() {
    const [allMessages, setAllMessages] = useState([
        {
            sender: {
                firstName: 'Iris',
                lastName: 'Maenhout',
                email: 'irismaenhout@gmail.com',
                phoneNr: '193920'
            },
            message: {
                messageText: 'Dit is een 1ste bericht.',
                date: '',
                open: false,
                read: false
            },
            realEstate: {
                url: '',
                type: '',
                sellingMethod: '',
                price: '',
                rooms: '',
                acreage: '',
                street: '',
                number: '',
                zipCode: '',
                city: '',
                coverImg: ''
            }
            
        },
        {
            sender: {
                firstName: 'Lars',
                lastName: 'Debruyne',
                email: 'larsDb@email.com',
                phoneNr: '2I93290'
            },
            message: {
                messageText: '',
                date: '',
                open: false,
                read: false
            },
            realEstate: {
                url: '',
                type: '',
                sellingMethod: '',
                price: '',
                rooms: '',
                acreage: '',
                street: '',
                number: '',
                zipCode: '',
                city: '',
                coverImg: ''
            }
            
        }
    ]);

    const [activeMessage, setActiveMessage] = useState({});

    function updateActiveMessage(activeMessageData) {
        setActiveMessage(activeMessageData)
    }

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <DashboardAccountSidebar
                navItems={[['Persoonlijke gegevens', ROUTES.account.personalData], ['Favorieten', ROUTES.account.favorites], ['Berichten', ROUTES.account.messages], ['Uitloggen', ROUTES.account.logOut]]}
                
                activeItem={'Berichten'}/>

            </div>

            <main className={styles.messagesContainer}>
                <h1>Berichten</h1>
                
                <AllMessagesList>
                    {
                            // Array.isArray(messages) ? 
                            
                        allMessages.map((messageData) => (
                        
                            <tr onClick={()=>{
                                updateActiveMessage(messageData)
                                // setIsOpenMessage(true);
                                // setOpenMessageData(messageData);
                                // updateMessageRead(messageData[1].id);
                            }} key={''} className={`${messageData.message.read ? styles.read : styles.unread}`}>
    
                                <td className={styles.sender}>{messageData.sender.firstName} {messageData.sender.lastName}</td>

                                <td className={styles.message}>{messageData.message.messageText.slice(0, 100)} {messageData.message.messageText.length > 100 ? '...': ''}</td>
    
                            </tr>

                     
                        ))
                            
                            // : <></>
                           
                              
                    }
                </AllMessagesList>


                {/* Message popup */}


                {/* {openMessageData !== "" && isOpenMessage === true ?  */}

                {
                    Object.keys(activeMessage).length > 0 &&

                    <Message
                    messageData={{
                        message: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam accusantium adipisci aliquam, obcaecati debitis minima nobis consequuntur molestias ratione, aut voluptates nam excepturi. Nemo corrupti blanditiis voluptatem quis neque corporis quam, iusto voluptatum dolores dolore eaque, fuga laborum a, quaerat voluptatibus assumenda quas nulla nihil magni expedita placeat voluptas amet.',
                        date: '',
                        open: false,
                        read: false
                    }}

                    senderData= {{
                        firstName: 'Iris',
                        lastName: 'Maenhout',
                        email: 'irismaenhout@gmail.com',
                        phoneNr: '1245321'
                    }}

                    handleClose={()=> {
                        updateActiveMessage({});
                        // setIsOpenMessage(false);
                        // setCreateNewMessage(false);
                        // newMessageReceiverId("");
                        // newMessageSenderId("");
                        // setNewMessage("");
                    }} 
                    // handleReply={()=> reply(openMessageData[1].receiver_id, openMessageData[1].sender_id)} 
                    // handleSend={sendReply}
                    // handleInputChange={(target)=>setNewMessage(target.value)}
                    // open={isOpenMessage}
                    // message={openMessageData[1].message} 
                    // messageId={3} 
                    // senderName={`${openMessageData[0].first_name} ${openMessageData[0].last_name}`} 
                    // senderEmail={openMessageData[0].email} 
                    // senderPhoneNr={openMessageData[0].phone_nr}
                    // reply={createNewMessage}
                    />

                }
                    
                    
                
            </main>


        </div>



    );
}

export default Messages;