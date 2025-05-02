import Department from "../../models/Department.js";

const addDepartment = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { department, description } = req.body;

    if (!department) {
      return res.status(400).json({
         success: false,
         error: "Department name is required" });
    }

    const newDep = new Department({
      department,
      description,
    });

    await newDep.save();

    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Error adding department" });
  }
};

export { addDepartment };
