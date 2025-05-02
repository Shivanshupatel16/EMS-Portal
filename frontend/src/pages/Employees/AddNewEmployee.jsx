import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../AdminSidebar";
import Navbar from "../Navbar";

function AddNewEmployee() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/department/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched Departments:", response.data); // Debugging

        if (response.data.departments) {
          setDepartments([...response.data.departments]); // Force state update
        }
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees/add",
        { name, dob, department },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Employee added successfully:", response.data);

      setName("");
      setDob("");
      setDepartment("");
      navigate("/employee-dashboard");
    } catch (error) {
      console.error("Error adding employee:", error.response?.data || error);
      setError(error.response?.data?.message || "Failed to add employee.");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-700 text-white min-h-screen">
        <Navbar />

        <div className="flex justify-center items-center h-full py-10">
          <div className="bg-gray-900 shadow-lg rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              Add New Employee
            </h2>

            {error && <p className="text-red-400 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-white">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"
                placeholder="Your name"
              />

              <label className="block text-white">Date of Birth:</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"
              />

              <label className="block text-white">Department:</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"
              >
                <option value="">
                  {departments.length > 0
                    ? `Select a department (${departments.length} available)`
                    : "No departments available"}
                </option>

                {departments.map((dept) => (
                  <option key={dept._id} value={dept.department}>
                    {dept.department}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="bg-white text-black font-bold p-2 rounded w-full hover:bg-gray-300 transition duration-200"
              >
                Add Employee
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewEmployee;
