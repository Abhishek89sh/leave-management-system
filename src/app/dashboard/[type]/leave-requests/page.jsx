"use client"

import React from 'react'
import DataTable from '../../../../../components/data-table/DataTable'
import FilterBar from '../../../../../components/filterbar/FilterBar'

function page() {
  const data = [
    {name: "Abhishek", class: "10th", date: "10/08/2025"},
    {name: "Abhishek", class: "10th", date: "10/08/2025"},
  ]
  return (
    <div className='mainBox'>
      <FilterBar />
      <DataTable data={data} />
    </div>
  )
}

export default page