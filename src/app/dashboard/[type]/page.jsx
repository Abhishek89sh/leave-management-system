import React from 'react'

async function page({params}) {
  const data = await params;
  return (
    <>
      <h1>{data.type} Dashboard</h1>
    </>
  )
}

export default page
