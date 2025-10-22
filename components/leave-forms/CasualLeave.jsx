import React from "react";
import styles from "./leave-forms.module.css";
import { FaSearch } from "react-icons/fa";

function CasualLeave({type, switchFormFun}) {
  return (
    <div className={styles.formContainer}>
      <label>Name:</label>
      <input type="text" />

      <label>Designation:</label>
      <input type="text" />

      <label>Department:</label>
      <select>
        <option value="Select">Select</option>
        <option value="Computer Engineering">Computer Engineering</option>
        <option value="Civil Engineering">Civil Engineering</option>
        <option value="Mechanical Engineering">Mechanical Engineering</option>
        <option value="Information Technology">Information Technology</option>
      </select>

      <label>No. of days leave applied for:</label>
      <input type="number" />

      <label>Purpose of leave:</label>
      <textarea></textarea>

      <label>Date of leave:</label>
      <input type="date" />

      {type === "hod"?<>
        <label>Leave Requests Managed By: </label>
        <span style={{display: 'flex', gap: 10, alignItems: 'center'}}>
          <input style={{width: '70%'}} type="text" placeholder="User Id" disabled />
          <button style={{width: '25%'}} className={styles.submitBtn}><FaSearch /></button>
        </span>
      </>:<></>}

      <button onClick={switchFormFun} className={styles.submitBtn}>Continue</button>
      <span className={styles.twoBtns}>
        <button className={styles.submitBtn}>Clear</button>
        <button className={styles.submitBtn}>Save As Draft</button>
      </span>
    </div>
  );
}

export default CasualLeave;
