import express from 'express';
import {
    createHomework,
    getHomework,
    getHomeworkById,
    updateHomework,
    deleteHomework,
    submitHomework
} from '../controllers/homework.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes (authenticated)
router.get('/', protect, getHomework);
router.get('/:id', protect, getHomeworkById);

// Teacher/Admin routes
router.post('/', protect, authorize('admin', 'teacher'), createHomework);
router.put('/:id', protect, authorize('admin', 'teacher'), updateHomework);
router.delete('/:id', protect, authorize('admin', 'teacher'), deleteHomework);

// Student routes
router.post('/:id/submit', protect, authorize('student'), submitHomework);

export default router;
