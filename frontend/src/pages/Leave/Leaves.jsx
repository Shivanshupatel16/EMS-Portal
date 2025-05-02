import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "../AdminSidebar";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.role) {
      setRole(userData.role);
    }
  }, []);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5000/api/leaves/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.leaves) {
          setLeaves(response.data.leaves);
        }
      } catch (error) {
        console.error("Failed to fetch leaves:", error);
      }
    };

    fetchLeaves();
  }, []);

  // Function to accept or reject leave
  const updateLeaveStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      if (status === "Accepted") {
      const response=  await axios.put(
          `http://localhost:5000/api/leaves/${id}`,
          { status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Accepted the leave", {position:"bottom-right" ,theme: "dark" });
        
        
        // ✅ Update UI for the admin
        setLeaves((prevLeaves) =>
          prevLeaves.map((leave) =>
            leave._id === id ? { ...leave, status: response.data.leave.status } : leave
          )
        );
      } else if (status === "Rejected") {
        await axios.delete(`http://localhost:5000/api/leaves/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Rejected the leave", {position:"bottom-right" ,theme: "dark" });
        // ✅ Remove from Admin UI
        setLeaves((prevLeaves) => prevLeaves.filter((leave) => leave._id !== id));
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };
  

  return (
    <div className="flex">
      <ToastContainer/>
      <AdminSidebar />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />
        <div className="text-2xl font-bold text-center mt-6">
          <h1>{user?.role === "admin" ? "Manage Leaves" : "Apply for Leave"}</h1>
        </div>
        <div className="flex mt-5 ml-16">
          <input
            type="text"
            placeholder="Search By Employee ID"
            className="outline outline-1 rounded outline-gray-300"
          />
          <div className="ml-auto mr-16">
            {user?.role !== "admin" && (
              <button
                className="bg-gray-900 text-white font-bold p-1 rounded-md text-md w-40 hover:bg-gray-800"
                onClick={() => navigate("ApplyLeave")}
              >
                Apply Leave
              </button>
            )}
          </div>
        </div>
        <div className="mt-6 overflow-x-auto mx-16">
          <table className="w-full table-auto border-collapse shadow-lg bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-b p-3 text-left">S. No.</th>
                <th className="border-b p-3 text-left">Name</th>
                <th className="border-b p-3 text-left">Total Leaves</th>
                <th className="border-b p-3 text-left">Leaves Taken</th>
                <th className="border-b p-3 text-left">Leaves Left</th>
                <th className="border-b p-3 text-center">{user?.role === "admin" ? "Actions" : "Status"}</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length > 0 ? (
                leaves.map((emp, index) => (
                  <tr key={emp._id} className="hover:bg-gray-100 transition">
                    <td className="border-b p-3">{index + 1}</td>
                    <td className="border-b p-3">{emp.name}</td>
                    <td className="border-b p-3">10</td>
                    <td className="border-b p-3">{emp.leaves}</td>
                    <td className="border-b p-3">{10 - emp.leaves}</td>
                    <td className="border-b p-3 flex justify-center space-x-5">
                      {user?.role === "admin" ? (
                        <>
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded-md font-semibold hover:bg-green-600 transition"
                            onClick={() => updateLeaveStatus(emp._id, "Accepted", emp.leaves, emp.name)}
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-md font-semibold hover:bg-red-600 transition"
                            onClick={() => updateLeaveStatus(emp._id, "Rejected", emp.leaves, emp.name)}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span>{emp.status || "Pending"}</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No Leaves found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
