import Department from "../../models/Department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    if (departments.length === 0) {
      return res.status(404).json({
         success: false, 
         message: "No departments found" });
    }

    return res.status(200).json({ success: true, departments });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return res.status(500).json({
        success: false,
        error: "Server error while fetching departments",
      });
  }
};

export { getDepartments };
