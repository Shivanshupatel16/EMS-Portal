import React from "react";
import Navbar from "../Navbar"
import AdminSidebar from "../AdminSidebar";
import { Sparkles } from "lucide-react";

const Salary = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-[85vh] bg-gradient-to-r from-white to-gray-100 p-4">
          <div className="bg-white shadow-2xl p-10 rounded-2xl text-center max-w-xl w-full border border-gray-200">
            <div className="flex justify-center mb-4">
              <Sparkles className="text-yellow-500 w-12 h-12 animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Salary Management</h1>
            <p className="text-gray-600 text-lg mb-6">
              We’re working on something amazing!
            </p>
            <p className="text-gray-500 text-base">
              The <strong>Salary Management</strong> feature will allow you to assign salaries, manage allowances, and deductions with complete transparency and accuracy.
            </p>
            <div className="mt-6">
              <span className="text-sm text-gray-400 italic">
                Feature Coming Soon...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salary;
