import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getDepartments } from '../controllers/DepartmentController/getDepartment.js';
import { addDepartment } from '../controllers/DepartmentController/departmentControllers.js';
import deleteDepartment from '../controllers/DepartmentController/deleteDepartment.js';
import updateDepartment from '../controllers/DepartmentController/updateDepartment.js';


const departmentRouter = express.Router();

departmentRouter.get('/all', authMiddleware, getDepartments);
departmentRouter.post('/add', authMiddleware, addDepartment); 
departmentRouter.delete('/:id', authMiddleware, deleteDepartment); 
departmentRouter.put('/:id', authMiddleware, updateDepartment); 

export default departmentRouter;
