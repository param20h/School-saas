import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        default: null
    }
}, {
    timestamps: true
});

// Compound unique index for class name and section
classSchema.index({ name: 1, section: 1 }, { unique: true });

export default mongoose.model('Class', classSchema);
