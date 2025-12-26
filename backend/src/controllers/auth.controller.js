import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT tokens
const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '1d' }
    );

    const refreshToken = jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
    );

    return { accessToken, refreshToken };
};

// Register new user
export const register = async (req, res) => {
    try {
        const { email, password, name, role, phone } = req.body;

        // Validate required fields
        if (!email || !password || !name || !role) {
            return res.status(400).json({
                error: 'Validation error',
                message: 'Email, password, name, and role are required'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: 'Registration failed',
                message: 'User with this email already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            role,
            phone
        });

        // Remove password from response
        const userObject = user.toObject();
        delete userObject.password;

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id);

        res.status(201).json({
            message: 'User registered successfully',
            user: userObject,
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            error: 'Server error',
            message: error.message
        });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                error: 'Validation error',
                message: 'Email and password are required'
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'Invalid email or password'
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'Invalid email or password'
            });
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id);

        // Remove password from response
        const userObject = user.toObject();
        delete userObject.password;

        res.json({
            message: 'Login successful',
            user: userObject,
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Server error',
            message: error.message
        });
    }
};

// Get current user profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({
                error: 'Not found',
                message: 'User not found'
            });
        }

        res.json({ user });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            error: 'Server error',
            message: error.message
        });
    }
};

// Refresh access token
export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                error: 'Validation error',
                message: 'Refresh token is required'
            });
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // Generate new tokens
        const tokens = generateTokens(decoded.userId);

        res.json({
            message: 'Token refreshed successfully',
            ...tokens
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'Invalid or expired refresh token'
            });
        }
        res.status(500).json({
            error: 'Server error',
            message: error.message
        });
    }
};
