import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'],
        required: true
    },
    remarks: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

// Compound index to ensure one attendance record per student per day
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);
