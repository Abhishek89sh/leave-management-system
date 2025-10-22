import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <>
      <div className='links'>
        <Link href={"/dashboard/admin"}>Admin Dashboard</Link>
        <Link href={"/dashboard/faculty"}>Faculty Dashboard</Link>
        <Link href={"/dashboard/hod"}>HOD Dashboard</Link>
        <Link href={"/dashboard/principal"}>Principal Dashboard</Link>
        <Link href={"/login"}>Login Page</Link>
      </div>
    </>
  )
}

export default page
