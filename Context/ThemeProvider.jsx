"use client"

import React, { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext();

function ThemeProvider({children}) {
  const [theme, setTheme] = useState(null);
  
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
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    console.log(systemTheme)
    setTheme(systemTheme);
    localStorage.setItem("Theme", systemTheme);
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

  if(!theme) return <div style={{ visibility: "hidden" }}>{children}</div>;;
  
  return (
    <>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
      </ThemeContext.Provider>
    </>
  )
}

export default ThemeProvider
