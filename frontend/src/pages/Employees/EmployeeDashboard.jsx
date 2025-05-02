import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../AdminSidebar";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [newEmployee, setNewEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const user = useSelector((state) => state.auth.user);
   
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.role) {
      setRole(userData.role);
    }
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/employees/all", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status === 200 && response.data) {
                setNewEmployee(response.data.employees || []); 
            }
        } catch (error) {
            console.error("Error fetching employees:", error.response ? error.response.data : error.message);
            setNewEmployee([]); 
        }
    };

    fetchEmployee();
}, []);

const handleViewEmployee = (emp) => {
  setSelectedEmployee(emp);
};

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 bg-gray-100 h-screen">
        <Navbar />
        <div className="text-2xl font-bold flex items-center justify-center mt-6">
          <h1>Manage Employees</h1>
        </div>
        <div className="flex mt-8">
          <div className="ml-16">
            <input
              type="text"
              placeholder="Search By Employee ID"
              className="outline outline-1 rounded outline-gray-300 "
            />
          </div>
          <div className="mr-16 ml-auto">
          {user?.role==="admin"?
          <><button 
              className="bg-black text-white font-bold p-1 rounded-md text-md w-52 hover:opacity-80"
              onClick={() => navigate("AddNewEmployee")}
            >
              Add New Employee
            </button>
            </>
            :null}
            
          </div>
        </div>
        <div className="mt-6 overflow-x-auto mx-16">
          <table className="w-full table-auto border-collapse shadow-lg bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-b p-3 text-left">S. No.</th>
                <th className="border-b p-3 text-left">Name</th>
                <th className="border-b p-3 text-left">DOB</th>
                <th className="border-b p-3 text-left">Department</th>
                <th className="border-b p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
  {Array.isArray(newEmployee) && newEmployee.length > 0 ? (
    newEmployee.map((emp, index) => (
      <tr key={emp._id} className="hover:bg-gray-100 transition">
        <td className="border-b p-3">{index + 1}</td>
        <td className="border-b p-3">{emp.name}</td>
        <td className="border-b p-3">{emp.dob}</td>
        <td className="border-b p-3">{emp.department}</td>
        <td className="border-b p-3 flex justify-center space-x-5">
          {user?.role==="admin"?
          <>
          <button className="bg-green-500 text-white px-3 py-1 rounded-md font-semibold hover:bg-green-600 transition"
           onClick={() => handleViewEmployee(emp)}>
            View
          </button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold hover:bg-blue-600 transition">
            Edit
          </button>
          </>:<button className="bg-green-500 text-white px-3 py-1 rounded-md font-semibold hover:bg-green-600 transition"
           onClick={() => handleViewEmployee(emp)}>
            View
          </button>
}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center p-4 text-gray-500">
        No Employees found.
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>
        {selectedEmployee && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-3">Employee Details</h2>
              <p><strong>ID:</strong> {selectedEmployee._id}</p>
              <p><strong>Name:</strong> {selectedEmployee.name}</p>
              <p><strong>DOB:</strong> {selectedEmployee.dob}</p>
              <p><strong>Department:</strong> {selectedEmployee.department}</p>
              <p><strong>Joining Date:</strong> {selectedEmployee.createdAt}</p>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => setSelectedEmployee(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
