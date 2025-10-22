"use client"

import React, { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext();

function ThemeProvider({children}) {
  const [theme, setTheme] = useState("light");
  
  const toggleTheme = async ()=>{
    if(theme === "light"){
      setTheme("dark");
      localStorage.setItem("Theme", "dark");
    }else{
      setTheme("light");
      localStorage.setItem("Theme", "light");
    }
  }

  const checkTheme = ()=>{
    let customTheme = localStorage.getItem("Theme");
    if(customTheme){
      setTheme(customTheme);
      return;
    }
    let currentTheme = window.getComputedStyle(document.body).backgroundColor;
    if(currentTheme === "rgb(255, 255, 255)"){
      setTheme("light");
    }else{
      setTheme("dark");
    }
  }

  useEffect(()=>{
    if(theme === "light"){
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }else{
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  }, [theme])

  useEffect(()=>{
    checkTheme();
  }, [])
  
  return (
    <>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
      </ThemeContext.Provider>
    </>
  )
}

export default ThemeProvider
