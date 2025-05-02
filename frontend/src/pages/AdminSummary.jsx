import React, { useState, useEffect } from "react";
import SummaryCard from "./SummaryCard";
import { 
  FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, 
  FaMoneyBillWave, FaTimesCircle, FaUsers 
} from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const AdminSummary = () => {
  const user = useSelector((state) => state.auth.user);

  const [employees, setEmployees] = useState(0);
  const [departments, setdepartments] = useState(0);
  const [leaveApplied, setLeaveApplied] = useState(0);
  const [leaveApproved, setLeaveApproved] = useState(0);
  const [leavePending, setLeavePending] = useState(0);
  const [leaveRejected, setLeaveRejected] = useState(0);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const departmentRes = await axios.get("http://localhost:5000/api/department/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const employeeRes = await axios.get("http://localhost:5000/api/employees/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const leaveRes = await axios.get("http://localhost:5000/api/leaves/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const leaves = leaveRes.data.leaves || [];
        const employees = employeeRes.data.employees || [];
        const departments = departmentRes.data.departments || [];

        setdepartments(departments.length);
        setEmployees(employees.length);
        setLeaveApplied(leaves.length);
        setLeaveApproved(leaves.filter((leave) => leave.status === "Accepted").length);
        setLeavePending(leaves.filter((leave) => leave.status === "Pending").length);
        setLeaveRejected(leaves.filter((leave) => leave.status === "Rejected").length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchSummaryData();
  }, []);

  return (
    <div>
      <div>
        <h1 className="flex font-bold text-2xl mt-6 ml-4">Dashboard Overview</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard icon={<FaUsers />} text={"Total Employees"} number={employees} color="bg-teal-600" />
        <SummaryCard icon={<FaBuilding />} text={"Total Departments"} number={departments} color="bg-yellow-600" />
        <SummaryCard icon={<FaMoneyBillWave />} text={"Monthly Salary"} number={"$654"} color="bg-red-600" />
      </div>

      <div>
        <div className="mt-12">
          <h1 className="text-2xl font-bold text-center">Leave Details</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard icon={<FaFileAlt />} text={"Leave Applied"} number={leaveApplied} color="bg-teal-600" />
          <SummaryCard icon={<FaCheckCircle />} text={"Leave Approved"} number={leaveApproved} color="bg-green-600" />
          <SummaryCard icon={<FaHourglassHalf />} text={"Leave Pending"} number={leavePending} color="bg-yellow-600" />
          <SummaryCard icon={<FaTimesCircle />} text={"Leave Rejected"} number={leaveRejected} color="bg-red-600" />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
