"use client"

import { useEffect, useState } from "react"
import DataTable from "../../../../../components/data-table/DataTable"
import FilterBar from "../../../../../components/filterbar/FilterBar"
import { getCookie } from "../../../../../functions/cookies";
import { useConfirm } from "../../../../../Context/ConfirmDialog/ConfirmDialogProvider";
import Loader from "../../../../../components/loader/Loader";
import { useRouter } from "next/navigation";
import details from "../../../../../functions/details";


function page() {
  const [data, setData] = useState(null);
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(false);
  const Confirm = useConfirm();
  const router = useRouter();

  const requests = async () => {
    try {
      const authToken = getCookie("auth");
      if (!authToken) {
        await Confirm("Token not found please login again", "Unauthorized", false);
        return;
      }
      setAuth(authToken);
      const res = await fetch(`/api/users/fetch-users?auth=${authToken}&status=pending`);
      const resData = await res.json();
      if(resData.data.length){
        const data = resData.data.map((value) => ({
          name: value.name,
          email: value.email,
        }));
        setData(data);
      }else{
        setData([]);
      }
    } catch (error) {
      await Confirm("Failed to fetch users", "Error", false);
      console.log(error);
    }
  };


  const approveBtnClick = async (recievedData) => {
    let userAction = await Confirm(`Want to approve ${recievedData.name}'s registration request.`, "Are You Sure ?");
    if (!userAction) return;
    setLoading(true);
    const res = await fetch(`/api/users/update-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: recievedData.email, status: "active" })
    });
    if (res.status !== 200) {
      await Confirm("Failed to approve user, Please try again later", "Error", false);
      setLoading(false);
      return
    }
    const resData = await res.json();
    if (!resData.isSuccess) {
      await Confirm(resData.message, "Error", false);
      return
    }
    let oldData = data;
    const newData = oldData.filter((value) => value.email !== recievedData.email);
    setData(newData);
    setLoading(false);
  }

  const rejectBtnClick = async (userData) => {
    const reallyWantToDelete = await Confirm(`Do you really want to reject ${userData.name}'s Registration request. User account will also be deleted.`);
    if(!reallyWantToDelete) return;
    setLoading(true);
    const authToken = getCookie("auth");
    if(!authToken){
      await Confirm("Token not found, Please login again", "Error", false);
      router.push("/login");
    }
    const res = await fetch(`/api/users/delete?auth=${authToken}&email=${userData.email}`, {method: "DELETE"});
    const resData = await res.json();
    if(!resData.isSuccess){
      await Confirm(resData.message, "Error", false);
    }else{
      let oldData = data;
      let newData = oldData.filter((value)=>value.email !== userData.email);
      setData(newData);
    }
    setLoading(false);
  }

  const onRowBtnClick = async (userData)=>{
    const {role} = await details();
    router.push(`/dashboard/${role}/profile/${userData.email}`);
  } 

  useEffect(() => {
    requests();
  }, [])
  return (
    <>
      {loading && <div className="loaderBox fullScreen"><Loader /></div>}
      <FilterBar />
      <DataTable showButtons={true} onRowClick={onRowBtnClick} onAccept={approveBtnClick} onReject={rejectBtnClick} data={data} acceptText="Approve" rejectText="Reject" />
    </>
  )
}

export default page