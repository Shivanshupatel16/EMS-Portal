import React, { useState } from "react";
import AdminSidebar from "../AdminSidebar";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const AddNewDepartment = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/department/add",
        { department, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Department added successfully!", {
          position: "bottom-right",
          theme: "dark",
        });
        navigate("/Department");
      }
    } catch (error) {
      console.error("Error adding department:", error);
      toast.error("Error adding department", {
        position: "bottom-right",
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-800 text-white min-h-screen">
        <Navbar />

        <div className="flex items-center justify-center h-screen">
          <form
            className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-md w-full"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-bold text-white text-center mb-6">
              Add New Department
            </h1>

            <div className="mb-4">
              <label className="block font-semibold text-white">
                Department Name
              </label>
              <input
                type="text"
                placeholder="Department Name"
                className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded mt-2"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-white">Description</label>
              <textarea
                placeholder="Description"
                className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded h-32 resize-none mt-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-white text-black p-2 rounded w-full hover:bg-gray-300 transition duration-200"
            >
              Add Department
            </button>
          </form>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default AddNewDepartment;
