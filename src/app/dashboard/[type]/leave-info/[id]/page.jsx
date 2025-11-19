"use client";

import React, { useEffect, useState } from "react";
import styles from "./info.module.css";
import { useConfirm } from "../../../../../../Context/ConfirmDialog/ConfirmDialogProvider";
import Loader from "../../../../../../components/loader/Loader";
import { useRouter } from "next/navigation";
import details from "../../../../../../functions/details";
import { getCookie } from "../../../../../../functions/cookies";

function LeaveRequestDetails({ params }) {
  const { id } = React.use(params);
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [auth, setAuth] = useState(null);
  const Confirm = useConfirm();
  const router = useRouter();

  const fetchLeaveDetails = async () => {
    const user = await details();
    setUserDetails(user);
    const authToken = getCookie("auth");
    if (!authToken) {
      await Confirm("Token Expired, Please login again", "Token Expired", false);
      return;
    }
    setAuth(authToken);
    const res = await fetch(`/api/leaves/details?auth=${authToken}&leaveId=${id}`);
    const resData = await res.json();
    setLeave(resData.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaveDetails();
  }, []);

  const handleApprove = async () => {
    const ok = await Confirm("Approve this leave?");
    if (!ok) return;

    await fetch(`/api/leaves/updateStatus?id=${leaveId}`, {
      method: "PUT",
      body: JSON.stringify({ status: "Approved" }),
    });

    fetchLeaveDetails();
  };

  const handleReject = async () => {
    const ok = await Confirm("Reject this leave?");
    if (!ok) return;

    await fetch(`/api/leaves/updateStatus?id=${leaveId}`, {
      method: "PUT",
      body: JSON.stringify({ status: "Rejected" }),
    });

    fetchLeaveDetails();
  };

  function parseTime(timeStr) {
    if (!timeStr) return null;

    if (typeof timeStr === "string" && timeStr.includes(":")) {
      return new Date(`1970-01-01T${timeStr}`);
    }

    if (/^\d{4}$/.test(timeStr)) {
      const hh = timeStr.slice(0, 2);
      const mm = timeStr.slice(2, 4);
      return new Date(`1970-01-01T${hh}:${mm}`);
    }

    if (typeof timeStr === "number") {
      return new Date(timeStr);
    }

    return null;
  }


  if (loading) return <Loader />;
  if (!leave) return <p className={styles.notFound}>Leave details not found.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Leave Request Details</h2>

      {/* Leave Details Box */}
      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.label}>Name:</span>
          <span className={styles.value}>{leave.name}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Department:</span>
          <span className={styles.value}>{leave.department}</span>
        </div>

        {/* <div className={styles.row}>
          <span className={styles.label}>Leave Type:</span>
          <span className={styles.value}>{leave.leaveType}</span>
        </div> */}

        <div className={styles.row}>
          <span className={styles.label}>Email:</span>
          <span style={{ cursor: 'pointer' }} onClick={() => router.push(`/dashboard/${userDetails.role}/profile/${leave.email}`)} className={styles.value}>{leave.email}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Designation:</span>
          <span className={styles.value}>{leave.designation}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Purpose:</span>
          <span className={styles.value}>{leave.purpose}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Days:</span>
          <span className={styles.value}>{leave.days}</span>
        </div>


        {parseFloat(leave.days) === 0.5 && (
          <>
            <div className={styles.row}>
              <span className={styles.label}>From:</span>
              <span className={styles.value}>{leave.from}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>To:</span>
              <span className={styles.value}>{leave.to}</span>
            </div>
          </>
        )}

        <div className={styles.row}>
          <span className={styles.label}>Applied on:</span>
          <span className={styles.value}>{new Date(leave.createdAt).toLocaleDateString("en-GB")}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Applied For:</span>
          <span className={styles.value}>{new Date(leave.date).toLocaleDateString("en-GB")}</span>
        </div>

        {leave.managedByEmail.length && (
          <div className={styles.row}>
            <span className={styles.label}>Leave Request Managed By:</span>
            <span style={{ cursor: 'pointer' }} onClick={() => router.push(`/dashboard/${userDetails.role}/profile/${leave.managedByEmail}`)} className={styles.value}>{leave.managedByEmail}</span>
          </div>
        )}

        <div className={styles.row}>
          <span className={styles.label}>Status:</span>
          <span
            style={{ textTransform: 'capitalize' }}
            className={`${styles.status} ${leave.status === "approved"
              ? styles.approved
              : leave.status === "rejected"
                ? styles.rejected
                : styles.pending
              }`}
          >
            {leave.status == "pending" || leave.status == "approved" ? leave.status : "pending"}
          </span>
        </div>
      </div>

      {/* Adjustments Box */}
      <h3 className={styles.subHeading}>Adjustments</h3>

      <div className={styles.adjustContainer}>
        {leave.adjustments?.length > 0 ? (
          leave.adjustments.map((adj, index) => (
            <div key={index} className={styles.adjustCard}>
              <div className={styles.adjustRow}>
                <span className={styles.adjustLabel}>Work/Class:</span>
                <span className={styles.adjustValue}>{adj.work}</span>
              </div>

              <div className={styles.adjustRow}>
                <span className={styles.adjustLabel}>Assigned To:</span>
                <span style={{ cursor: 'pointer' }} onClick={() => router.push(`/dashboard/${userDetails.role}/profile/${leave.managedByEmail}`)} className={styles.adjustValue}>{adj.email}</span>
              </div>

              <div className={styles.adjustRow}>
                <span className={styles.adjustLabel}>Subject:</span>
                <span className={styles.adjustValue}>{adj.subject}</span>
              </div>

              <div className={styles.adjustRow}>
                <span className={styles.adjustLabel}>Time:</span>
                <span className={styles.adjustValue}>
                  {parseTime(adj.time)
                    ? parseTime(adj.time).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                    : "N/A"}
                </span>
              </div>

              <div className={styles.row}>
                <span className={styles.label}>Status:</span>
                <span
                  style={{ textTransform: 'capitalize' }}
                  className={`${styles.status} ${adj.status === "approved"
                    ? styles.approved
                    : adj.status === "rejected"
                      ? styles.rejected
                      : styles.pending
                    }`}
                >
                  {adj.status == "pending" || adj.status == "approved" ? adj.status : "pending"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noAdjust}>No adjustments applied.</p>
        )}
      </div>

      {(leave.status != "approved" && leave.headId === auth) && (
        <div className={styles.actions}>
          <button className={styles.approveBtn} onClick={handleApprove}>
            Approve
          </button>
          <button className={styles.rejectBtn} onClick={handleReject}>
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default LeaveRequestDetails;
