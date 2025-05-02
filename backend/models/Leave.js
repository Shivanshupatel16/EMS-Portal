import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  department: { type: String, required: true },
  leaves: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

const Leave = mongoose.model("Leave", LeaveSchema);
export default Leave;
