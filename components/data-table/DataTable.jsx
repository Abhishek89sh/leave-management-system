"use client"

import React from 'react'
import styles from './data-table.module.css'

function DataTable({
    data=[],
    showButtons = false,
    acceptText = "Accept",
    rejectText = "Reject",
    showOneBtn = false,
    onAccept = () => {},
    onReject = () => {},
    onRowClick = () => {},
}) {
  if(!data) return <div className='midErr'><p>Loading...</p></div>
  if(data.length === 0) return <div className='midErr'><p>No Data Available</p></div>

  const headers = Object.keys(data[0]);

  return (
    <>
      <div className={styles.tableContainer}>
        <table>
            <thead>
                <tr>
                    {headers.map((item, index)=>(
                        <React.Fragment key={index}>
                            {item === "id" || item === "_id" ? <></> : <th key={index}>{item.toUpperCase()}</th>}
                        </React.Fragment>
                    ))}
                    {showButtons && <th>ACTION</th>}
                    {showOneBtn && <th>ACTION</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index)=>(
                    <tr key={index}>
                        {headers.map((header, index)=>(
                            <React.Fragment key={index}>
                                {header === "id" || header === "_id" ? <></> : <td onClick={()=>onRowClick(item)} key={index}>{item[header]}</td>}
                            </React.Fragment>
                            
                        ))}
                        {showButtons && (
                            <td className={styles.btns}>
                                <button className={styles.accept} onClick={()=>onAccept(item)}>{acceptText}</button>
                                <button className={styles.reject} onClick={()=>onReject(item)}>{rejectText}</button>
                            </td>
                        )}
                        {showOneBtn && (
                            <td className={styles.btns}>
                                <button className={styles.accept} onClick={()=>onAccept(item.id)}>{acceptText}</button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </>
  )
}

export default DataTable