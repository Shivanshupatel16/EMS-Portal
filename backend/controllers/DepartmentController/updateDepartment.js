import Department from "../../models/Department.js";

const updateDepartment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Invalid department ID" });
  }
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.status(200).json({ department: updatedDepartment });
  } catch (error) {
    console.error("Error updating department:", error);
    return res.status(500).json({ message: "Failed to update department" });
  }
};

export default updateDepartment;
