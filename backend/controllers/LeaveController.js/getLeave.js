import Leave from "../../models/Leave.js";

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json({ leaves });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export { getLeaves};
