"use client"

import Aside from "../../../components/aside/Aside"
import Nav from "../../../components/nav/Nav"

export default function AdminLayout({children}){
    return(
        <>
            <Nav />
            <div style={{display: "flex", overflow: "visible"}}>
                <Aside />
                {children}
            </div>
        </>
    )
}