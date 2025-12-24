import express from 'express';
import { register, login, getProfile, refreshToken } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);

// Protected routes
router.get('/profile', authenticate, getProfile);

export default router;
