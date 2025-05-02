import Employee from "../../models/Employee.js";

const getEmployee = async (req, res) => {
    try {
        const employees = await Employee.find();

        const formattedEmployees = employees.map(emp => ({
            ...emp._doc,
            dob: emp.dob ? emp.dob.toISOString().split("T")[0] : "N/A",
            createdAt: emp.createdAt ? emp.createdAt.toISOString().split("T")[0] : "N/A"
        }));

        res.status(200).json({ employees: formattedEmployees });
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error });
    }
};

export default getEmployee;
