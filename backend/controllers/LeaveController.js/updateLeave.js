import Leave from "../../models/Leave.js";

const updateLeave = async (req, res) => {
  try {
    const { status } = req.body;

    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      console.log("Leave not found for ID:", req.params.id);
      return res.status(404).json({ error: "Leave not found" });
    }

    leave.status = status;
    await leave.save();

    res.json({ message: `Leave ${status.toLowerCase()} successfully`, leave });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

export { updateLeave };
