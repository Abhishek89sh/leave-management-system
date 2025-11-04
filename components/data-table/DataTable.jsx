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
  if(data.length === 0) return <div className='midErr'><p>No Data Available</p></div>

  const headers = Object.keys(data[0]);

  return (
    <>
      <div className={styles.tableContainer}>
        <table>
            <thead>
                <tr>
                    {headers.map((item, index)=>(
                        <th key={index}>{item.toUpperCase()}</th>
                    ))}
                    {showButtons || showOneBtn && <th>ACTION</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index)=>(
                    <tr onClick={onRowClick} key={index}>
                        {headers.map((header, index)=>(
                            <td key={index}>{item[header]}</td>
                        ))}
                        {showButtons && (
                            <td className={styles.btns}>
                                <button className={styles.accept} onClick={onAccept}>{acceptText}</button>
                                <button className={styles.reject} onClick={onReject}>{rejectText}</button>
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