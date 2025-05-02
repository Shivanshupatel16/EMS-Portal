import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import Department from "../../models/Department.js";

const deleteDepartment = express.Router();

deleteDepartment.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findByIdAndDelete(id);

    if (!department) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);
    return res
      .status(500)
      .json({ success: false, error: "Error deleting department" });
  }
});

export default deleteDepartment;
