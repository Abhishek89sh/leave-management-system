import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <>
      <div className='links'>
        <Link href={"/login"}>Admin Dashboard</Link>
        <Link href={"/login"}>Faculty Dashboard</Link>
        <Link href={"/dashboard/hod"}>HOD Dashboard</Link>
        <Link href={"/dashboard/principal"}>Principal Dashboard</Link>
      </div>
    </>
  )
}

export default page
