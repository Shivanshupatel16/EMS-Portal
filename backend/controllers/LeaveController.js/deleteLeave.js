import Leave from "../../models/Leave.js";

const deleteLeave = async (req,res)=>{
    try {
        const leave = await Leave.findById(req.params.id);
        if (!leave) {
          return res.status(404).json({ error: "Leave not found" });
        }
    
        await Leave.findByIdAndDelete(req.params.id);
    
        res.status(200).json({ message: "Leave request deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: "Server error" });
      }
    };

    export {deleteLeave}