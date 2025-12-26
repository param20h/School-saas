import express from 'express';
import {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} from '../controllers/student.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes (for testing) or protected based on requirements
// In production, these should be protected

// Get all students - Accessible by Admin, Teacher
router.get('/', authenticate, authorize('ADMIN', 'TEACHER'), getAllStudents);

// Get single student - Accessible by Admin, Teacher, and the Student themselves (logic in controller/middleware usually)
router.get('/:id', authenticate, getStudentById);

// Create student - Only Admin
router.post('/', authenticate, authorize('ADMIN'), createStudent);

// Update student - Only Admin
router.put('/:id', authenticate, authorize('ADMIN'), updateStudent);

// Delete student - Only Admin
router.delete('/:id', authenticate, authorize('ADMIN'), deleteStudent);

export default router;
