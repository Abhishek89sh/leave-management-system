"use client"

import React, { useEffect, useState } from "react";
import styles from "./newLeave.module.css";
import CasualLeave from "../../../../../components/leave-forms/CasualLeave";
import { useConfirm } from "../../../../../Context/ConfirmDialog/ConfirmDialogProvider";
import AdjustmentForm from "../../../../../components/leave-forms/AdjustmentForm";

function page({params}) {
  const {type} = React.use(params);
  const [leaveType, setLeaveType] = useState("Select");
  const [leaveForm, setLeaveForm] = useState(<></>);

  const handleLeaveTypeChange = async () => {
    if (leaveType === "cl") {
      setLeaveForm(<CasualLeave switchFormFun={switchToAdjustmentForm} type={type} />);
    } else {
      setLeaveForm(<></>);
    }
  };

  const switchToAdjustmentForm = ()=>{
    setLeaveForm(<AdjustmentForm  />);
  }

  

  useEffect(() => {
    handleLeaveTypeChange();
  }, [leaveType]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.selectContainer}>
        <p>Select Leave Type:</p>
        <select onChange={(e) => setLeaveType(e.target.value)} value={leaveType}>
          <option value="Select">Select</option>
          <option value="cl">Casual Leave</option>
        </select>
      </div>
      <div className={styles.formWrapper}>{leaveForm}</div>
    </div>
  );
}

export default page;
