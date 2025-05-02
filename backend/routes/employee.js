import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import getEmployee from "../controllers/EmployeeController/getEmployee.js";
import {addEmployee} from "../controllers/EmployeeController/addEmployee.js";
import { getDepartments } from "../controllers/DepartmentController/getDepartment.js";
import departmentRouter from "./department.js";

const employeeRouter = express.Router();

employeeRouter.post("/add", authMiddleware, addEmployee);
departmentRouter.get("/all", authMiddleware, getDepartments);
employeeRouter.get("/all", authMiddleware, getEmployee);


export default employeeRouter;
