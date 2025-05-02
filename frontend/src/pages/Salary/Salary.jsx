import React from "react";
import AdminSidebar from "../AdminSidebar";
import Navbar from "../Navbar";
const Salary = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />
        <div className="bg-red-400 h-screen">
          <div>
            <h1>Add Salary</h1>
            <div>
              <h1>Department</h1>
              <div className="mt-5 ml-6 flex">
              <div className="">
                <label className="block font-semibold">Department</label>
                <select className="outline outline-1 rounded outline-gray-300 w-96 mt-1 p-2">
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="Database">Database</option>
                  <option value="Meal">Meal</option>
                  <option value="Logistic">Logistic</option>
                </select>
               </div>
               <div>
                <label className="block font-semibold">Employee</label>
                <select className="outline outline-1 rounded outline-gray-300 w-96 mt-1 p-2">
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="Database">Database</option>
                  <option value="Meal">Meal</option>
                  <option value="Logistic">Logistic</option>
                </select>
                </div>
              </div>
              <div className="mt-5 ml-6 flex">
              <div className="">
                <label className="block font-semibold">Basic Salary</label>
                <select className="outline outline-1 rounded outline-gray-300 w-96 mt-1 p-2">
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="Database">Database</option>
                  <option value="Meal">Meal</option>
                  <option value="Logistic">Logistic</option>
                </select>
               </div>
               <div>
                <label className="block font-semibold">Allowances</label>
                <input type=" text" placeholder="Allowances" className="w-96 p-2 rounded-md"/>
                </div>
              </div>
              <div className="mt-5 ml-6 flex">
              <div className="">
                <label className="block font-semibold">Deductions</label>
                <input type=" text" placeholder="Deductions" className="w-96 p-2 rounded-md"/>
               </div>
               <div>
                <label className="block font-semibold">Department</label>
                <input type="date"  className="w-96 p-2 rounded-md" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salary;
