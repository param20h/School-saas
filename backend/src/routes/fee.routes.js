import express from 'express';
import { createFee, getStudentFees, payFee } from '../controllers/fee.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create fee - Admin
router.post('/', authenticate, authorize('ADMIN'), createFee);

// Get student fees - Admin, Parent, Student
router.get('/student/:studentId', authenticate, getStudentFees);

// Pay fee - Admin, Parent (Integrated Payment Gateway usually, here simulated)
router.put('/:id/pay', authenticate, authorize('ADMIN', 'PARENT'), payFee);

export default router;
