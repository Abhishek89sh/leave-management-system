"use client"

import React, { useEffect, useState } from 'react'
import styles from './leave-forms.module.css'
import { FaSearch } from 'react-icons/fa';

function AdjustmentForm() {
  const [adjustMentInputs, setAdjustmentInputs] = useState([{work: "", time: "", subject: "", assignedTo: "", accepted: false}]);

  const handleChange = (index, e)=>{
    const inputs = [...adjustMentInputs];
    const {name, value} = e.target;
    inputs[index][name] = value;
    setAdjustmentInputs(inputs);
    console.log(value);
  }

  const addNewAdjustmentInputs = ()=>{
    let inputs = [...adjustMentInputs];
    inputs = [...inputs, {work: "", time: "", subject: "", assignedTo: "", accepted: false}];
    setAdjustmentInputs(inputs)
  }

  useEffect(()=>{
    window.scrollTo(({
      top: 0,
      behavior: 'smooth'
    }));
  }, [])

  return (
    <>
        <div className={styles.formContainer}>
            <h3>Adjustments</h3>
            {adjustMentInputs.map((item, index)=>(
                <div className={styles.formContainer} key={index}>
                    <h3>Sr No.{index+1}</h3>
                    <label>Branch & Semester/Office Work</label>
                    <input type="text" name='work' value={item.work} onChange={(e)=>handleChange(index, e)} />
                    <label>Time</label>
                    <input type="time" name='time' value={item.time} onChange={(e)=>handleChange(index, e)} />
                    <label>Subject</label>
                    <input type="text" name='subject' value={item.subject} onChange={(e)=>handleChange(index, e)} />
                    <h4>Assigned To</h4>
                    <label>User Id</label>
                    <span className={styles.inputBtn}>
                        <input disabled type="text" name='work' value={item.assignedTo} onChange={(e)=>handleChange(index, e)} />
                        <button style={{width: '25%'}}><FaSearch /></button>
                    </span>
                    
                </div>
            ))}
            <button onClick={addNewAdjustmentInputs}>New Adjustment</button>
            <span style={{flexDirection: 'row-reverse'}} className={styles.twoBtns}>
                <button>Submit Request</button>
                <button>Save as Draft</button>
            </span>
        </div>
    </>
  )
}

export default AdjustmentForm