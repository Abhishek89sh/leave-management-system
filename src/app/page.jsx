import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <>
      <div className='links'>
        <Link href={"/dashboard/admin"}>Admin Dashboard</Link>
        <Link href={"/dashboard/faculty"}>Faculty Dashboard</Link>
        <Link href={"/dashboard/hod"}>HOD Dashboard</Link>
        <Link href={"/dashboard/principle"}>Principle Dashboard</Link>
      </div>
    </>
  )
}

export default page
