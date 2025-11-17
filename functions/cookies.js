"use client"

export function setCookie({name, value, days, path}){
    const maxAge = days*24*60*60
    document.cookie = `${name}=${value}; max-age=${maxAge}; path=${path};`
}

export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name){
      return value;
    }
  }
  
  return null;
}

export function deleteCookie(name){
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

