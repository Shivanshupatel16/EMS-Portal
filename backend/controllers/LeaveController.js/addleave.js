
import Leave from '../../models/Leave.js';


const addLeave = async (req, res) => {
  try {
    const { name, dob, department, leaves } = req.body;

    let employeeLeave = await Leave.findOne({ name });

    if (employeeLeave) {
      // Update existing leave count
      employeeLeave.leaves += parseInt(leaves, 10);
      employeeLeave.status = "Pending";
      await employeeLeave.save();
    } else {
      // Create a new leave request
      employeeLeave = new Leave({ name, dob, department, leaves, status: "Pending" });
      await employeeLeave.save();
    }

    res.status(201).json({ message: "Leave applied successfully", employeeLeave });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export { addLeave };
