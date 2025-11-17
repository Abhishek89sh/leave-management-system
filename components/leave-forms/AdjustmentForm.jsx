"use client"

import React, { useEffect, useRef, useState } from 'react'
import styles from './leave-forms.module.css'
import { FaSearch } from 'react-icons/fa';
import { useSelectUser } from '../../Context/selectUser/SelectUserProvider';
import { useConfirm } from '../../Context/ConfirmDialog/ConfirmDialogProvider';
import { getCookie } from '../../functions/cookies';
import Loader from '../loader/Loader';
import { useRouter } from 'next/navigation';
import details from '../../functions/details';

function AdjustmentForm() {
  const [adjustMentInputs, setAdjustmentInputs] = useState([{work: "", time: "", subject: "", assignedTo: ""}]);
  const [errs, setErrs] = useState([{workErr: "", timeErr: "", subjectErr: "", assignedToErr: ""}])
  const [loading, setLoading] = useState(true);
  const Confirm = useConfirm();
  const SelectUser = useSelectUser();
  const refs = useRef([]);
  const router = useRouter();
  const handleChange = (index, e)=>{
    const inputs = [...adjustMentInputs];
    const {name, value} = e.target;
    inputs[index][name] = value;
    setAdjustmentInputs(inputs);
  }

  const addNewAdjustmentInputs = ()=>{
    let inputs = [...adjustMentInputs];
    inputs = [...inputs, {work: "", time: "", subject: "", assignedTo: ""}];
    setAdjustmentInputs(inputs);
    let errors = [...errs];
    errors = [...errors, {workErr: "", timeErr: "", subjectErr: "", assignedToErr: ""}]
    setErrs(errors);
  }

  const readUserId = async (index)=>{
    const selectedUser = await SelectUser();
    let inputs = [...adjustMentInputs];
    inputs[index] = {...inputs[index], assignedTo: selectedUser};
    setAdjustmentInputs(inputs)
  }

  const clearForm = async ()=>{
    const reConfirm = await Confirm("Do you really want to clear form?");
    if(!reConfirm){
      return;
    }
    localStorage.removeItem("clAdjustments");
    setAdjustmentInputs([{work: "", time: "", subject: "", assignedTo: ""}]);
    window.scrollTo({top: 0, behavior: "smooth"});
  }

  const readData = ()=>{
    const draft = localStorage.getItem("clAdjustments");
    setLoading(false);
    if(!draft) return;
    const parsedData = JSON.parse(draft);
    setAdjustmentInputs(parsedData);

    let newErrs = [];

    parsedData.map(()=>{
      newErrs = [...newErrs, {workErr: "", timeErr: "", subjectErr: "", assignedToErr: ""}];
    })

    setErrs(newErrs);
    setLoading(false);
  }

  const saveDraft = async ()=>{
    const inputs = adjustMentInputs;
    localStorage.setItem("clAdjustments", JSON.stringify(inputs));
    await Confirm("Draft Saved", "Done", false);
  }

  const submitForm = async ()=>{
    const inputs = adjustMentInputs;
    let initialErrors = [...errs];
    let errors = [];
    initialErrors.map(()=>{
      errors = [...errors, {workErr: "", timeErr: "", subjectErr: "", assignedToErr: ""}];
    })
    let errIndex = null;
    inputs.map((item, index)=>{
      if(errIndex !== null) return;
      if(item.work.length === 0){
        errors[index] = {...errors[index], workErr: "This is required field"};
        errIndex = index;
        return;
      }else{
        errors[index] = {...errors[index], workErr: ""};
      }
      if(!item.time){
        errors[index] = {...errors[index], timeErr: "Time is required field"};
        errIndex = index;
        return;
      }else{
        errors[index] = {...errors[index], timeErr: ""};
      }
      if(item.subject.length === 0){
        errors[index] = {...errors[index], subjectErr: "Subject is required field"};
        errIndex = index;
        return;
      }else{
        errors[index] = {...errors[index], subjectErr: ""};
      }
      if(item.assignedTo.length === 0){
        errors[index] = {...errors[index], assignedToErr: "Assigned To is required field"};
        errIndex = index;
        return;
      }else{
        errors[index] = {...errors[index], assignedToErr: ""};
      }
    })
    if (errIndex !== null && refs.current[errIndex]) {
      refs.current[errIndex].scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if(errIndex !== null){
      return;
    }
    setErrs(errors);
    const clFormData1 = localStorage.getItem("casualLeave");
    if(!clFormData1){
      await Confirm("Unable to read form data. Please Fill form again", "Error", false);
      return;
    }
    setLoading(true);
    const clFormData = await JSON.parse(clFormData1);
    const adjustments = adjustMentInputs;
    
    const auth = getCookie("auth");
    localStorage.setItem("clAdjustments", JSON.stringify(adjustments));
    const finalData = {...clFormData, requestBy: auth, adjustments: adjustments};
    const res = await fetch("/api/leaves/new-leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalData)
    });
    const resData = await res.json();
    if(resData.isSuccess){
      localStorage.removeItem("casualLeave");
      localStorage.removeItem("clAdjustments");
      await Confirm("Leave request applied. You can check your leave status on 'My leaves' Page", "Success", false);
      const userDetails = await details();
      if(userDetails){
        router.push(`/dashboard/${userDetails.role}/my-leaves`)
      }
    }else{
      await Confirm(resData.message, "Error", false);
    }
    setLoading(false);
  }




  useEffect(()=>{
    window.scrollTo(({
      top: 0,
      behavior: 'smooth'
    }));
    readData();
  }, [])

  return (
    <>  
        <div className={styles.formContainer}>
            <h3>Adjustments</h3>
            {adjustMentInputs.map((item, index)=>(
                <div ref={(el)=>(refs.current[index] = el)} className={styles.formContainer} key={index}>
                    <h3>Sr No.{index+1}</h3>
                    <label>Branch & Semester/Office Work</label>
                    <input type="text" name='work' value={item.work} onChange={(e)=>handleChange(index, e)} />
                    <p className='errMsg'>{errs[index].workErr}</p>
                    <label>Time</label>
                    <input type="time" name='time' value={item.time} onChange={(e)=>handleChange(index, e)} />
                    <p className='errMsg'>{errs[index].timeErr}</p>
                    <label>Subject</label>
                    <input type="text" name='subject' value={item.subject} onChange={(e)=>handleChange(index, e)} />
                    <p className='errMsg'>{errs[index].subjectErr}</p>
                    <h4>Assigned To</h4>
                    <label>User Id</label>
                    <span className={styles.inputBtn}>
                        <input disabled type="text" name='assignedTo' value={item.assignedTo} onChange={(e)=>handleChange(index, e)} />
                        <button onClick={()=>readUserId(index)} style={{width: '25%'}}><FaSearch /></button>
                    </span>
                    <p className='errMsg'>{errs[index].assignedToErr}</p>
                </div>
            ))}
            <button onClick={addNewAdjustmentInputs}>New Adjustment</button>
            <span style={{flexDirection: 'row-reverse'}} className={styles.twoBtns}>
                <button onClick={saveDraft}>Save as Draft</button>
                <button onClick={clearForm}>Clear Form</button>
            </span>
            <button onClick={submitForm}>Submit Request</button>
        </div>
        {loading && (
          <div className='loaderBox fullTop'><Loader /></div>
        )}
    </>
  )
}

export default AdjustmentForm