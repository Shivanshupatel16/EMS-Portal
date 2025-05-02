import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../Navbar";
import AdminSidebar from "../AdminSidebar";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    department: "",
    description: "",
  });

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/Department/${id}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            "Content-Type": "application/json",
          }
        );

        if (response.status === 200) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        console.error(
          "Error fetching department:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchDepartment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/Department/${id}`,
        department,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          "Content-Type": "application/json",
        }
      );

      if (response.status === 200) {
        toast.success("Department updated successfully", {
          position: "bottom-right",
          theme: "dark",
        });
        navigate("/Department");
      }
    } catch (error) {
      console.error(
        "Error updating department:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to update department", {
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

        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Edit Department
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-semibold text-white">
                  Department Name:
                </label>
                <input
                  type="text"
                  value={department.department}
                  onChange={(e) =>
                    setDepartment({ ...department, department: e.target.value })
                  }
                  className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded mt-2"
                  placeholder="Enter Department Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold text-white">
                  Description:
                </label>
                <textarea
                  value={department.description}
                  onChange={(e) =>
                    setDepartment({
                      ...department,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded h-32 resize-none mt-2"
                  placeholder="Write about department.."
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/Department")}
                  className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDepartment;
