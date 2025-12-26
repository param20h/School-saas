import express from 'express';
import {
    markAttendance,
    getClassAttendance,
    getStudentAttendance
} from '../controllers/attendance.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Mark attendance - Admin, Teacher
router.post('/', authenticate, authorize('ADMIN', 'TEACHER'), markAttendance);

// Get class attendance - Admin, Teacher
router.get('/class/:classId', authenticate, authorize('ADMIN', 'TEACHER'), getClassAttendance);

// Get student attendance - Admin, Teacher, Student, Parent
router.get('/student/:studentId', authenticate, getStudentAttendance);

export default router;
