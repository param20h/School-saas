import mongoose from 'mongoose';

const homeworkSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    assignedDate: {
        type: Date,
        default: Date.now
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Teacher
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Expired'],
        default: 'Active'
    },
    // Optional: if we want to track submissions per student
    submissions: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        submissionDate: {
            type: Date,
            default: Date.now
        },
        content: {
            type: String // Link or text
        },
        status: {
            type: String,
            enum: ['Submitted', 'Late', 'Graded'],
            default: 'Submitted'
        },
        grade: String,
        remarks: String
    }]
}, {
    timestamps: true
});

export default mongoose.model('Homework', homeworkSchema);
