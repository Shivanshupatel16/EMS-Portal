import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Navbar from "./Navbar";
import AdminSummary from "./AdminSummary";

const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // Redirect if the user is not an admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/employee-dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />
        {/* <Outlet /> */}
        <AdminSummary/>
      </div>
    </div>
  );
};

export default AdminDashboard;
