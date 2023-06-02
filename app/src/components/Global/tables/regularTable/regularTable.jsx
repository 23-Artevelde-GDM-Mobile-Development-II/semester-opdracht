// import deleteData from "../../../core/helpers/deleteData";
// import EditRemoveBtn from "../Btns/EditRemoveBtn";
import styles from "./regularTable.module.css";

import EditRemoveBtn from "../../btns/editRemoveBtn/editRemoveBtn";

function RegularTable({columnNames, data, removeOnly, onEdit, deleteAction, usersTable, handleClickSearch}) {

    return (
        <div className={styles.tableContainer}>
            <table>
                <thead>
                    <tr className={styles.headRow}>

                    {
                        columnNames.map(name => (
                            <th key={name}>{name}</th>  
                        ))
                    } 

                    {
                        usersTable && <th>Immokantoor</th>
                    }
                        <th>Actie</th>

                    </tr>
                </thead>
                
                <tbody>
                {
                    data.map((row, i) => {
                        const [id, ...rowValue] = row;
                        console.log(rowValue);
                            return (<tr key={`row-${i}-${rowValue[0]}-${rowValue[1]}`}>
                               {rowValue.map((info, i) =>(
                                // Check if it's an url of an image or not
                                <td key={`row-${i}-${rowValue[0]}-${rowValue[1]}-cel-${i}`}>
                                    {info && info.toString().includes('https://ucarecdn.com/') ? <img src={info} alt="immokantoor" /> 
                                    : info}
                                </td>
                                ))} 

                               {usersTable &&
                                <td>

                                    {/* If user belongs to a real esteate agency but if it's not specified which one: */}
                                    {row[0][6] === 'Ja' && row[1] === null ? 
                                    <button className="text-blue-600 border border-blue-600 rounded-lg py-2 px-4" onClick={() => handleClickSearch(row[0][0])}>Kies immokantoor</button>
                                    : <></>
                                    }

                                    {/* If user belongs to a real esteate agency and if it's secified which one it is: */}
                                    {row[0][6] === 'Ja' && row[1] !== null ? 
                                    <div className="flex justify-between">
                                        <span>{row[1][0]}</span> 
                                        <button onClick={()=> {
                                            console.log(row[1][1]);
                                            // deleteData( row[1][1], 'real_estate_agent');
                                            }} className="text-red-400 hover:text-red-600">
                                                <i className="fa-solid fa-square-minus"></i>
                                        </button>
                                    </div>
                                    : <></>
                                    }
                                </td>

                               }

                               <td><EditRemoveBtn removeOnly={removeOnly} className={"mx-auto"} handleDeleteAction={deleteAction} handleClickEdit={() => onEdit(row[0])} id={id}/></td>
                            </tr>)
                    })
                }
                </tbody>
                

                
                
            </table>

        </div>
    )
    
}
export default RegularTable;