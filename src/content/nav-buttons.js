import { IoSettings } from "react-icons/io5";
import { FaHome, FaPlus, FaHouseUser, FaBell } from "react-icons/fa";
import {RiPagesLine} from 'react-icons/ri'
import { FaMessage, FaObjectGroup, FaUserGroup } from "react-icons/fa6";

export const facultyNavBtns = [
    {name: "Dashboard", onClick: "/dashboard/faculty", icon: <FaHome size={25} />},
    {name: "Adjustments", onClick: "/dashboard/faculty/adjustement-requests", icon: <RiPagesLine size={25} />},
    {name: "New Leave", onClick: "/dashboard/faculty/new-leave", icon: <FaPlus size={25} />},
    {name: "My Leaves", onClick: "/dashboard/faculty/my-leaves", icon: <FaHouseUser size={25} />},
    {name: "Settings", onClick: "/dashboard/faculty/settings", icon: <IoSettings size={25} />},
]

export const principalNavBtns = [
    {name: "Dashboard", onClick: "/dashboard/principal", icon: <FaHome size={25} />},
    // {name: "Requests", onClick: "/dashboard/principal/leave-requests", icon: <RiPagesLine size={25} />},
    // {name: "New Leave", onClick: "/dashboard/principal/new-leave", icon: <FaPlus size={25} />},
    {name: "My Leaves", onClick: "/dashboard/principal/my-leaves", icon: <FaHouseUser size={25} />},
    {name: "Contact Admin", onClick: "/dashboard/principal/contact-admin", icon: <FaMessage size={25} />},
    {name: "Settings", onClick: "/dashboard/principal/settings", icon: <IoSettings size={25} />},
]

export const hodNavBtns = [
    {name: "Dashboard", onClick: "/dashboard/hod", icon: <FaHome size={25} />},
    {name: "Adjustments", onClick: "/dashboard/hod/adjustement-requests", icon: <RiPagesLine size={25} />},
    {name: "New Leave", onClick: "/dashboard/hod/new-leave", icon: <FaPlus size={25} />},
    {name: "My Leaves", onClick: "/dashboard/hod/my-leaves", icon: <FaHouseUser size={25} />},
    {name: "Contact Admin", onClick: "/dashboard/principal/contact-admin", icon: <FaMessage size={25} />},
    {name: "Settings", onClick: "/dashboard/hod/settings", icon: <IoSettings size={25} />},
]

export const adminNavBtns = [
    {name: "Dashboard", onClick: "/dashboard/admin", icon: <FaHome size={25} />},
    {name: "Pending", onClick: "/dashboard/admin/leave-requests", icon: <RiPagesLine size={25} />},
    {name: "Users", onClick: "/dashboard/admin/users", icon: <FaUserGroup size={25} />},
    {name: "All Leaves", onClick: "/dashboard/admin/all-leaves", icon: <FaObjectGroup size={25} />},
    {name: "Contacts", onClick: "/dashboard/admin/contacts", icon: <FaMessage size={25} />},
    {name: "Settings", onClick: "/dashboard/admin/settings", icon: <IoSettings size={25} />},
]