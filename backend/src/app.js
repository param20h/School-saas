import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database.js';

// Import models to register them with Mongoose
import './models/User.js';
import './models/Student.js';
import './models/Class.js';
import './models/Attendance.js';
import './models/Fee.js';
import './models/Homework.js';
import './models/Result.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'School Management System API is running',
        timestamp: new Date().toISOString()
    });
});

// API Routes (will be added)
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to School Management System API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            students: '/api/students',
            teachers: '/api/teachers',
            parents: '/api/parents',
            classes: '/api/classes',
            attendance: '/api/attendance',
            fees: '/api/fees',
            results: '/api/results',
            homework: '/api/homework'
        }
    });
});

// Import routes
import authRoutes from './routes/auth.routes.js';

// Use routes
app.use('/api/auth', authRoutes);
// TODO: Add more routes as they are created
import studentRoutes from './routes/student.routes.js';
app.use('/api/students', studentRoutes);

import attendanceRoutes from './routes/attendance.routes.js';
app.use('/api/attendance', attendanceRoutes);

import feeRoutes from './routes/fee.routes.js';
app.use('/api/fees', feeRoutes);

import resultRoutes from './routes/results.routes.js';
app.use('/api/results', resultRoutes);

import homeworkRoutes from './routes/homework.routes.js';
app.use('/api/homework', homeworkRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.originalUrl} not found`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);

    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API URL: http://localhost:${PORT}/api`);
});

export default app;
