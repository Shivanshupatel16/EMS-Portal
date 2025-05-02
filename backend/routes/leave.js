import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addLeave } from '../controllers/LeaveController.js/addleave.js';
import { getLeaves } from '../controllers/LeaveController.js/getLeave.js';
import { deleteLeave } from '../controllers/LeaveController.js/deleteLeave.js';
import { updateLeave } from '../controllers/LeaveController.js/updateLeave.js';

const leaveRouter = express.Router();

leaveRouter.get('/all', authMiddleware, getLeaves);
leaveRouter.post('/add', authMiddleware, addLeave); 
leaveRouter.put('/:id', authMiddleware,updateLeave ); 
leaveRouter.delete('/:id', authMiddleware,deleteLeave ); 

export default leaveRouter;
