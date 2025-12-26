import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    paidDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['PAID', 'PENDING', 'OVERDUE'],
        default: 'PENDING'
    },
    description: {
        type: String,
        default: null
    },
    fineAmount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model('Fee', feeSchema);
