import Student from '../models/Student.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Get all students
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find()
            .populate('user', 'name email role')
            .populate('parent', 'user');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
};

// Get single student
export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
            .populate('user', 'name email')
            .populate('parent', 'user');

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student', error: error.message });
    }
};

// Create new student
export const createStudent = async (req, res) => {
    try {
        const {
            email,
            password,
            name,
            rollNo,
            className,
            section,
            dateOfBirth,
            gender,
            address,
            phone
        } = req.body;

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // 2. Create User account
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: 'STUDENT',
            phone
        });
        await user.save();

        // 3. Create Student profile
        const student = new Student({
            user: user._id,
            rollNo,
            class: className,
            section,
            dateOfBirth,
            gender,
            address
        });
        await student.save();

        res.status(201).json({ message: 'Student created successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error: error.message });
    }
};

// Update student
export const updateStudent = async (req, res) => {
    try {
        const { name, email, ...studentData } = req.body;

        // Find student to get user ID
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update User data if provided
        if (name || email) {
            await User.findByIdAndUpdate(student.user, {
                ...(name && { name }),
                ...(email && { email })
            });
        }

        // Update Student data
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            studentData,
            { new: true }
        ).populate('user', 'name email');

        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error: error.message });
    }
};

// Delete student
export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Delete associated user account
        await User.findByIdAndDelete(student.user);

        // Delete student profile
        await Student.findByIdAndDelete(req.params.id);

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
};
