import express from "express";
import cors from "cors";
import router from "./routes/auth.js";
import connectionToDb from "./db/db.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import leaveRouter from "./routes/leave.js";
import forgotPassword from "./routes/forgotPassword.js";
import verifyPassword from "./routes/verifyPassword.js";
import resetPassword from "./routes/resetPassword.js";


const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', router);
app.use('/api/department', departmentRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/leaves', leaveRouter);
app.use('/api/password', forgotPassword);
app.use('/api', verifyPassword);
app.use('/api', resetPassword);


connectionToDb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
