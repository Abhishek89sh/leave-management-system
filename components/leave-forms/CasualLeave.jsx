import React, { useEffect, useState } from "react";
import styles from "./leave-forms.module.css";
import { FaSearch } from "react-icons/fa";
import Loader from "../loader/Loader";
import details from "../../functions/details";
import { useConfirm } from "../../Context/ConfirmDialog/ConfirmDialogProvider";
import { useSelectUser } from "../../Context/selectUser/SelectUserProvider";

function CasualLeave({switchFormFun}) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const Confirm = useConfirm();
  const SelectUser = useSelectUser();
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    department: "Select",
    days: "",
    purpose: "",
    date: "",
    managedBy: "",
    from: "",
    to: "",
  })
  const [errMsgs, setErrMsgs] = useState({
    nameErr: "",
    designationErr: "",
    departmentErr: "",
    daysErr: "",
    purposeErr: "",
    dateErr: "",
    managedByErr: "",
    fromErr: "",
    toErr: "",
  })

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const updateErr = (name, value)=>{
    setErrMsgs((prev)=>({
      ...prev,
      [name]: value
    }))
  }

  const readData = async () => {
    const data = await details();
    if(!data){
      await Confirm("Unknown Server Side Error", "Server Error", false);
      return;
    }
    setUserDetails(data);
    let savedDraft = localStorage.getItem("casualLeave");
    if(savedDraft) setFormData(JSON.parse(savedDraft));
    setLoading(false);
  }

  const saveDraft = async () => {
    let data = formData;
    localStorage.setItem("casualLeave", JSON.stringify(data));
    await Confirm("Draft Saved", "Done", false);
  }

  const clearForm = async ()=>{
    const reConfirm = await Confirm("Do you really want to clear form data?", "Confirm Action!", true, "Yes");
    if(!reConfirm) return;
    setFormData({
      name: "",
      designation: "",
      department: "Select",
      days: "",
      purpose: "",
      date: "",
      managedBy: "",
      from: "",
      to: "",
    })
    localStorage.removeItem("casualLeave");
  }

  const readManagedById = async ()=>{
    const selectedId = await SelectUser("Select Requests Manager");
    setFormData({...formData, managedBy: selectedId});
  }


  const continueBtnClick = ()=>{
    if(formData.name.length < 3){
      if(formData.name.length === 0){
        updateErr("nameErr", "Name is required.")
      }else{
        updateErr("nameErr", `${formData.name} is not a valid name.`);
      }
      
      window.scrollTo({top: 250, behavior: 'smooth'})
      return;
    }else{
      updateErr("nameErr", ``);
    }
    if(formData.designation.length === 0){
      updateErr("designationErr", "Designation is required.");
      window.scrollTo({top: 300, behavior: 'smooth'});
      return;
    }else{
      updateErr("designationErr", "");
    }
    if(formData.department == "Select"){
      updateErr("departmentErr", "Please Select Your Department");
      window.scrollTo({top: 400, behavior: 'smooth'});
      return;
    }else{
      updateErr("departmentErr", "");
    }
    if(parseFloat(formData.days.trim()) < 0.5 || formData.days.length === 0){
      updateErr("daysErr", "No. of days is a required field");
      window.scrollTo({top: 500, behavior: 'smooth'});
      return;
    }else{
      updateErr("daysErr", "");
    }
    if(parseFloat(formData.days.trim()) == 0.5){
      if(!formData.from){
        updateErr("fromErr", "This is a required field");
        window.scrollTo({top: 500, behavior: 'smooth'});
        return;
      }else{
        updateErr("fromErr", "");
      }
      if(!formData.to){
        updateErr("toErr", "This is a required field.");
        window.scrollTo({top: 500, behavior: 'smooth'});
        return;
      }else{
        updateErr("toErr", "");
      }
    }
    if(formData.purpose.length < 10){
      updateErr("purposeErr", "Purpose must contain at least 10 characters");
      return;
    }else{
      updateErr("purposeErr", "");
    }
    if(!formData.date){
      updateErr("dateErr", "This is a required field.");
      return;
    }else{
      updateErr("dateErr", "");
    }
    if(userDetails.manageRequests){
      if(!formData.managedBy){
        updateErr("managedByErr", "This is a required field");
        return; 
      }else{
        updateErr("managedByErr", "");
      }
    }
    localStorage.setItem("casualLeave", JSON.stringify(formData));
    switchFormFun();
  }

  useEffect(() => {
    readData();
  }, [])


  if (loading) return <div className="loaderBox"><Loader /></div>

  return (
    <div className={styles.formContainer}>
      <label>Name:</label>
      <input name="name" value={formData.name} onChange={handleFormDataChange} type="text" />
      <p className="errMsg">{errMsgs.nameErr}</p>
      <label>Designation:</label>
      <input name="designation" value={formData.designation} onChange={handleFormDataChange} type="text" />
      <p className="errMsg">{errMsgs.designationErr}</p>

      <label>Department:</label>
      <select name="department" value={formData.department} onChange={handleFormDataChange}>
        <option value="Select">Select</option>
        <option value="Computer Engineering">Computer Engineering</option>
        <option value="Civil Engineering">Civil Engineering</option>
        <option value="Mechanical Engineering">Mechanical Engineering</option>
        <option value="Information Technology">Information Technology</option>
      </select>
      <p className="errMsg">{errMsgs.departmentErr}</p>

      <label>No. of days leave applied for (0.5 for half day):</label>
      <input name="days" value={formData.days} onChange={handleFormDataChange} type="number" />
      <p className="errMsg">{errMsgs.daysErr}</p>

      {parseFloat(formData.days.trim()) === 0.5 && (
        <>
          <label>From</label>
          <input name="from" value={formData.from} onChange={handleFormDataChange} type="time" />
          <p className="errMsg">{errMsgs.fromErr}</p>
          <label>To</label>
          <input name="to" value={formData.to} onChange={handleFormDataChange} type="time" />
          <p className="errMsg">{errMsgs.toErr}</p>
        </>
      )}
      <label>Purpose of leave:</label>
      <textarea name="purpose" value={formData.purpose} onChange={handleFormDataChange}></textarea>
      <p className="errMsg">{errMsgs.purposeErr}</p>

      <label>Date of leave:</label>
      <input name="date" value={formData.date} onChange={handleFormDataChange} type="date" />
      <p className="errMsg">{errMsgs.dateErr}</p>

      {userDetails.manageRequests ? <>
        <label>Leave Requests Managed By: </label>
        <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input name="managedBy" value={formData.managedBy} onChange={handleFormDataChange} style={{ width: '70%' }} type="text" placeholder="User Id" disabled />
          <button onClick={readManagedById} style={{ width: '25%' }} className={styles.submitBtn}><FaSearch /></button>
        </span>
        <p className="errMsg">{errMsgs.managedByErr}</p>
      </> : <></>}

      <button onClick={continueBtnClick} className={styles.submitBtn}>Continue</button>
      <span className={styles.twoBtns}>
        <button onClick={clearForm} className={styles.submitBtn}>Clear</button>
        <button onClick={saveDraft} className={styles.submitBtn}>Save As Draft</button>
      </span>
    </div>
  );
}

export default CasualLeave;
