import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../AdminSidebar";
import Navbar from "../Navbar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Departments = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [role,setRole] = useState("");

  const user = useSelector((state) => state.auth.user);
   
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.role) {
      setRole(userData.role);
    }
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/department/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          setDepartments(response.data.departments); 
        }
      } catch (error) {
        console.error(
          "Error fetching departments:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchDepartments();
  }, []);

  const deleteDepartment = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/department/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Department deleted successfully", {
          position: "bottom-right",
          theme: "dark",
        });

        // Update state to remove deleted department
        setDepartments(
          departments.filter((department) => department._id !== id)
        );
      }
    } catch (error) {
      console.error(
        "Error deleting department:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to delete department", {
        position: "bottom-right",
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 bg-gray-100 h-screen">
        <Navbar />
        <div className="text-2xl font-bold flex items-center justify-center mt-6">
          <h1>Manage Departments</h1>
        </div>
        <div className="flex mt-8">
          <div className="ml-8">
          <input
              type="text"
              placeholder="Search By Department"
              className="outline outline-1 rounded outline-gray-300 "
            />
          </div>
          {user?.role==="admin"?
            <>
          <div className="mr-16 ml-auto">
              <button
              className="bg-black text-white font-bold p-1 rounded-md text-md w-52 hover:bg-opacity-80"
              onClick={() => navigate("AddNewDepartment")}
            >
              Add New Department
            </button>
          </div>
            </>:null
            }
           
        </div>
        <div className="mt-6 overflow-x-auto mx-16 ">
          {" "}
          
          <table className="w-full table-auto border-collapse shadow-lg bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-b p-3 text-left">S. No.</th>
                <th className="border-b p-3 text-left">Department Name</th>
                <th className="border-b p-3 text-left">Description</th>
                <th className="border-b p-3 text-center">{user?.role==="admin"?"Actions":null}</th>
              </tr>
            </thead>
            <tbody>
              {departments.length > 0 ? (
                departments.map((department, index) => (
                  <tr
                    key={department._id}
                    className="hover:bg-gray-100 transition"
                  >
                    <td className="border-b p-3">{index + 1}</td>
                    <td className="border-b p-3 ">{department.department}</td>
                    <td className="border-b p-3">{department.description}</td>
                      {user?.role==="admin"?
                    <td className="border-b p-3 flex justify-evenly">
                      <button
                        onClick={() => navigate(`/Department/edit/${department._id}`)}
                        
                        className="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteDepartment(department._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md font-semibold hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>:null
}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No departments found.
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

export default Departments;
