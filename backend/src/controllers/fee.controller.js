import Fee from '../models/Fee.js';
import Student from '../models/Student.js';

// Create fee record (assign fee to student)
export const createFee = async (req, res) => {
    try {
        const { studentId, amount, dueDate, type, description } = req.body;

        const fee = new Fee({
            student: studentId,
            amount,
            dueDate: new Date(dueDate),
            type,
            description,
            status: 'PENDING'
        });

        await fee.save();
        res.status(201).json(fee);
    } catch (error) {
        res.status(500).json({ message: 'Error creating fee', error: error.message });
    }
};

// Get fees for a student
export const getStudentFees = async (req, res) => {
    try {
        const fees = await Fee.find({ student: req.params.studentId }).sort({ dueDate: -1 });
        res.json(fees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fees', error: error.message });
    }
};

// Mark fee as paid
export const payFee = async (req, res) => {
    try {
        const fee = await Fee.findById(req.params.id);
        if (!fee) {
            return res.status(404).json({ message: 'Fee record not found' });
        }

        fee.status = 'PAID';
        fee.paidDate = new Date();
        fee.paymentMethod = req.body.paymentMethod || 'CASH'; // Default to cash if not specified

        await fee.save();
        res.json({ message: 'Fee paid successfully', fee });
    } catch (error) {
        res.status(500).json({ message: 'Error updating payment', error: error.message });
    }
};
