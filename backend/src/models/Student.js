import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    rollNo: {
        type: String,
        required: true,
        unique: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Student', studentSchema);
