import React from 'react'
import FilterBar2 from '../filter-bar2/FIlterBar2'

import styles from './selectUser.module.css'
import DataTable from '../data-table/DataTable'

function SelectUser({
    heading = "Select User",
    onSelect = ()=>{},
}) {
  let data = [
    {name: "Abhishek", trade: "CSE"},
    {name: "Abhishek", trade: "CSE"},
    {name: "Abhishek", trade: "CSE"},
    {name: "Abhishek", trade: "CSE"},
    {name: "Abhishek", trade: "CSE"},
  ]
  return (
    <div className={styles.selectUser}>
        <div>
          <button className={styles.crossBtn}>✕</button>
            <h2>{heading}</h2>
            <section style={{marginTop: 20, width: '100%', overflow: 'visible'}}>
                <FilterBar2 />
            </section>
            <section>
              <DataTable showOneBtn={true} acceptText='Add' data={data} />
            </section>
        </div>
    </div>
  )
}

export default SelectUser