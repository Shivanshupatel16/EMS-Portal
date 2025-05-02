import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUser } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="h-screen bg-black text-white w-64 flex flex-col">
      {/* Sidebar Header */}
      <div className="h-14 flex items-center justify-center bg-gray-900">
        <h3 className="font-bold text-2xl">Employee MS</h3>
      </div>

      {/* Sidebar Navigation */}
      <div className="px-4 mt-4">
        <NavLink 
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex space-x-4 items-center py-2.5 px-8 text-lg rounded-md transition duration-300 ${
              isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
            }`
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/employee-dashboard"
          className={({ isActive }) =>
            `flex space-x-4 items-center py-2.5 px-8 text-lg rounded-md transition duration-300 ${
              isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
            }`
          }
        >
          <FaUser />
          <span>Employee</span>
        </NavLink>

        <NavLink 
          to="/Department"
          className={({ isActive }) =>
            `flex space-x-4 items-center py-2.5 px-8 text-lg rounded-md transition duration-300 ${
              isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
            }`
          }
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>

        <NavLink 
          to="/Leaves"
          className={({ isActive }) =>
            `flex space-x-4 items-center py-2.5 px-8 text-lg rounded-md transition duration-300 ${
              isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
            }`
          }
        >
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>

        <NavLink 
          to="/Salary"
          className={({ isActive }) =>
            `flex space-x-4 items-center py-2.5 px-8 text-lg rounded-md transition duration-300 ${
              isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
            }`
          }
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        <NavLink 
          to="/Setting"
          className={({ isActive }) =>
            `flex space-x-4 items-center py-2.5 px-8 text-lg rounded-md transition duration-300 ${
              isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
            }`
          }
        >
          <FaCogs />
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
