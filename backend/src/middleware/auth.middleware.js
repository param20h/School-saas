import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
    try {
        // Get token from header or cookie
        const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

        if (!token) {
            return res.status(401).json({
                error: 'Authentication required',
                message: 'No token provided'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from database
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'User not found'
            });
        }

        // Attach user to request (convert to plain object and add id field)
        req.user = {
            id: user._id.toString(),
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            phone: user.phone
        };

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'Invalid token'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'Token expired'
            });
        }
        return res.status(500).json({
            error: 'Server error',
            message: error.message
        });
    }
};

// Role-based authorization middleware
export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: 'Authentication required',
                message: 'Please login first'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Access denied',
                message: `This action requires one of these roles: ${allowedRoles.join(', ')}`
            });
        }

        next();
    };
};
