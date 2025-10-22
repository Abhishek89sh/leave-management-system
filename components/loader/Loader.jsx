import React from 'react'

import './loader.css'

function Loader({text = "Loading"}) {
  return (
    <>
    <div className="loader-con">
      <div style={{ "--i": 0 }} className="pfile"></div>
      <div style={{ "--i": 1 }} className="pfile"></div>
      <div style={{ "--i": 2 }} className="pfile"></div>
      <div style={{ "--i": 3 }} className="pfile"></div>
      <div style={{ "--i": 4 }} className="pfile"></div>
      <div style={{ "--i": 5 }} className="pfile"></div>
    </div>
    <h4>{text}...</h4>
    </>
  )
}

export default Loader