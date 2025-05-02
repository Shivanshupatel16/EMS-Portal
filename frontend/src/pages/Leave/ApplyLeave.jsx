import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import AdminSidebar from "../AdminSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ApplyLeave = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [department, setDepartment] = useState("");
  const [leaves, setLeaves] = useState("");
  const [prevLeaves, setPrevLeaves] = useState(0);
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5000/api/employees/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.employees) {
          setEmployees(response.data.employees);
        }
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleNameChange = async (e) => {
    const selectedName = e.target.value;
    setName(selectedName);

    const selectedEmployee = employees.find((emp) => emp.name === selectedName);
    if (selectedEmployee) {
      setDob(selectedEmployee.dob);
      setDepartment(selectedEmployee.department);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:5000/api/leaves/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const employeeLeave = response.data.leaves.find(emp => emp.name === selectedName);
      setPrevLeaves(employeeLeave ? employeeLeave.leaves : 0);
    } catch (error) {
      console.error("Failed to fetch previous leaves:", error);
      setPrevLeaves(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    const updatedLeaves = parseInt(leaves);

    try {
      await axios.post(
        "http://localhost:5000/api/leaves/add",
        { name, dob, department, leaves: updatedLeaves },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setName("");
      setDob("");
      setDepartment("");
      setLeaves("");
      setPrevLeaves(0);

      navigate("/Leaves");
    } catch (error) {
      console.error("Error applying for leave:", error.response?.data || error);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 bg-gray-500 text-white min-h-screen">
        <Navbar />

        <div className="flex justify-center items-center py-5">
          <div className="bg-gray-900 shadow-lg rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-semibold text-white mb-3 text-center">
              Apply Leave
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-white">Select Employee:</label>
              <select
                value={name}
                onChange={handleNameChange}
                required
                className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp.name}>
                    {emp.name}
                  </option>
                ))}
              </select>

              <label className="block text-white">Date of Birth:</label>
              <input
                type="date"
                value={dob}
                readOnly
                className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded"
              />

              <label className="block text-white">Department:</label>
              <input
                type="text"
                value={department}
                readOnly
                className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded"
              />

              <label className="block text-white">Previous Leaves Taken:</label>
              <input
                type="text"
                value={prevLeaves}
                readOnly
                className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded"
              />

              <label className="block text-white">No of Leaves:</label>
              <input
                type="number"
                value={leaves}
                onChange={(e) => setLeaves(e.target.value)}
                required
                className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded"
              />

              <button
                type="submit"
                className="bg-white text-black p-2 rounded w-full hover:bg-gray-300 transition duration-200 mt-2"
              >
                Apply Leave
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeave;
