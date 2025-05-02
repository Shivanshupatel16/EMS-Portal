import Department from "../../models/Department.js";
import Employee from "../../models/Employee.js";
import mongoose from "mongoose";

export const addEmployee = async (req, res) => {
  try {
    const { name, dob, department } = req.body;

    if (!name || !dob || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEmployee = new Employee({
      name,
      dob,
      department,
    });

    await newEmployee.save();

    res.status(201).json({ message: "Employee added successfully", newEmployee });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Error adding employee", error });
  }
};
