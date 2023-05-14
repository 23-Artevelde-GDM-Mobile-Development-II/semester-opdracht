import React from 'react';
import styles from './allMessagesList.module.css';

function AllMessagesList({messages, handleClick, children}) {
    return (
        <div className={styles.tableContainer}>
            <table>
                <tbody>

                {
                    children
                    // Array.isArray(messages) ? 
                    // messages.map((messageData) => (
                        
                    //         <tr onClick={handleClick} data-message-id={messageData[0]} key={messageData[0]} className={`read ${messageData[3] ? 'bg-indigo-100' : 'bg-white'}`}>

                    //             <td className="sender px-4 py-2 border">{messageData[1]}</td>
                    //             <td className="message px-4 py-2 border">{messageData[2].slice(0, 100) + '...'}</td>

                    //         </tr>
                    //     ))

                    // : <></>
                }

                </tbody>
               
            </table>

        </div>
    );
}

export default AllMessagesList;


