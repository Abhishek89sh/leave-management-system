"use client"

import React, { createContext, useState } from 'react'

export const NavControlerContext = createContext();

function NavControlerProvider({children}) {
  const [show, setShow] = useState(false);
  return (
    <NavControlerContext.Provider value={{show, setShow}}>
        {children}
    </NavControlerContext.Provider>
  )
}

export default NavControlerProvider
