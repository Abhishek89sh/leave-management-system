"use client";

import React, { useEffect, useState } from "react";
import styles from "../../login/login.module.css";
import { departments, imgs } from "@/content/main";
import Image from "next/image";
import { useSelectUser } from "../../../../Context/selectUser/SelectUserProvider";
import Loader from "../../../../components/loader/Loader";
import { useConfirm } from "../../../../Context/ConfirmDialog/ConfirmDialogProvider";
import { useRouter } from "next/navigation";
import details from "../../../../functions/details";

function Page() {
  const [headId, setHeadId] = useState("");
  const [department, setDepartment] = useState("select");
  const [role, setRole] = useState("select");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsgs, setErrMsgs] = useState({
    roleErr: "",
    departmentErr: "",
    headErr: "",
  });
  const [email, setEmail] = useState("");
  const [timesCalled, setTimesCalled] = useState(-1);

  const selectUser = useSelectUser();
  const Confirm = useConfirm();
  const router = useRouter();

  const selectBtnClick = async () => {
    let selectedUser = await selectUser("Select Your Head");
    setHeadId(selectedUser);
  };

  const readData = async () => {
    setLoading(true);
    let data = await details();
    if (!data) {
      await Confirm("Data Not Found Please Login Again.", "NOT FOUND", false);
      router.push("/login");
    }
    setEmail(data.email);
    if (data.role !== "unset") setRole(data.role);
    if (data.department !== "unset") setDepartment(data.department);
    if (data.head !== "unset") {
      setHeadId(data.head);
      setValidated(true);
    }
    setLoading(false);
  };

  const validateId = async () => {
    if (headId.length !== 24) {
      setErrMsgs({ ...errMsgs, headErr: "Invalid ID" });
      return;
    }
    setLoading(true);
    const res = await fetch("/api/validate-id", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: headId }),
    });
    const resData = await res.json();
    if (resData.isSuccess) {
      setErrMsgs({ ...errMsgs, headErr: `Validated: ${resData.data.name}` });
      setValidated(true);
    } else {
      setErrMsgs({ ...errMsgs, headErr: resData.message });
    }
    setLoading(false);
  };

  const updateData = async () => {
    setErrMsgs({ roleErr: "", departmentErr: "", headErr: "" });
    if (role === "select") {
      setErrMsgs({ ...errMsgs, roleErr: "Select Your Role" });
      return;
    }
    if (department === "select") {
      setErrMsgs({ ...errMsgs, departmentErr: "Select Your Department" });
      return;
    }
    if (!validated) {
      if (!headId || headId.length !== 12) {
        setErrMsgs({ ...errMsgs, headErr: "Enter a valid Head ID" });
      } else {
        setErrMsgs({ ...errMsgs, headErr: "Validate Head ID First" });
      }
      return;
    }

    setLoading(true);
    const res = await fetch("/api/users/update-details", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        role,
        department,
        head: headId,
      }),
    });

    const resData = await res.json();
    if (resData.isSuccess && res.status === 200) {
      router.push("/pending");
    } else {
      await Confirm(resData.message, "Error", false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (timesCalled > 0) setValidated(false);
    setTimesCalled((prev) => prev + 1);
  }, [headId]);

  useEffect(() => {
    readData();
  }, []);

  return (
    <div className={styles.container}>
      {loading && (
        <div className="loaderBox fullTop">
          <Loader />
        </div>
      )}

      <div className={styles.left}>
        <Image
          src={imgs.loginPageImg}
          alt="Register Illustration"
          fill
          className={styles.bgImage}
        />
      </div>

      <div className={styles.right}>
        <div className={styles.formBox}>
          <h1>Details</h1>
          <p className={styles.subtitle}>Enter Your Details To Continue</p>

          <div>
            <span>
              <label>Role</label>
            </span>
            <div className={styles.inputGroup}>
              <select onChange={(e) => setRole(e.target.value)} value={role} required>
                <option value="select">Select Role</option>
                <option value="Faculty">Faculty</option>
                <option value="HOD">HOD</option>
                <option value="Principal">Principal</option>
              </select>
              <p className="errMsg">{errMsgs.roleErr}</p>
            </div>

            <span>
              <label>Department</label>
            </span>
            <div className={styles.inputGroup}>
              <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
                <option value="select">Select Department</option>
                {departments.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <p className="errMsg">{errMsgs.departmentErr}</p>
            </div>

            <span>
              <label>Your Head</label>
            </span>
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={headId}
                onChange={(e) => setHeadId(e.target.value)}
                placeholder="Enter ID Manually"
                required
              />
              <p className="errMsg">{errMsgs.headErr}</p>
            </div>

            {validated ? (
              <button onClick={updateData} className={styles.loginBtn}>
                Submit Request
              </button>
            ) : (
              <>
                {headId.length === 0 ? (
                  <button onClick={selectBtnClick} className={styles.loginBtn}>
                    Search For Head ID
                  </button>
                ) : (
                  <button onClick={validateId} className={styles.loginBtn}>
                    Validate ID
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
