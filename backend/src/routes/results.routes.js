import express from 'express';
import {
    createResult,
    getResults,
    getResultById,
    updateResult,
    deleteResult,
    getStudentResults
} from '../controllers/result.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Routes
// Admin and Teachers can manage results
router.post('/', protect, authorize('admin', 'teacher'), createResult);
router.get('/', protect, authorize('admin', 'teacher', 'student', 'parent'), getResults); // Students/Parents might need restricted view, handled by controller filters or frontend logic, but simpler to allow read based on query params for now.Ideally should refine perms.
router.get('/:id', protect, authorize('admin', 'teacher', 'student', 'parent'), getResultById);
router.put('/:id', protect, authorize('admin', 'teacher'), updateResult);
router.delete('/:id', protect, authorize('admin'), deleteResult);

// Specific route for a student's results
router.get('/student/:studentId', protect, authorize('admin', 'teacher', 'student', 'parent'), getStudentResults);

export default router;
