"use client"

import dynamic from 'next/dynamic'
import React from 'react'


function Icon({ name, lib , ...props }) {
  const DynamicIcon = dynamic(async () => {
    try {
      console.log("Entered....");
      const icons = await import(`react-icons/${lib}`);
      console.log(icons);
      return icons[name] || (() => <span>❓</span>); 
    } catch (error) {
      console.error("Icon not found:", name);
      return () => <span>❓</span>;
    }
  }, { ssr: false });

  return <DynamicIcon {...props} />;
}

export default Icon
