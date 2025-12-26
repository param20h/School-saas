import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    examType: {
        type: String,
        required: true,
        enum: ['Midterm', 'Final', 'Unit Test', 'Quiz', 'Assignment', 'Other']
    },
    academicYear: {
        type: String,
        required: true
    },
    subjects: [{
        subjectName: {
            type: String,
            required: true
        },
        marksObtained: {
            type: Number,
            required: true
        },
        totalMarks: {
            type: Number,
            required: true
        },
        grade: {
            type: String
        }
    }],
    totalMarksObtained: {
        type: Number,
        default: 0
    },
    maxMarks: {
        type: Number,
        default: 0
    },
    percentage: {
        type: Number,
        default: 0
    },
    overallGrade: {
        type: String
    },
    remarks: {
        type: String
    }
}, {
    timestamps: true
});

// Calculate totals before saving
resultSchema.pre('save', function (next) {
    if (this.subjects && this.subjects.length > 0) {
        this.totalMarksObtained = this.subjects.reduce((sum, sub) => sum + sub.marksObtained, 0);
        this.maxMarks = this.subjects.reduce((sum, sub) => sum + sub.totalMarks, 0);

        if (this.maxMarks > 0) {
            this.percentage = Math.round((this.totalMarksObtained / this.maxMarks) * 100 * 100) / 100; // 2 decimal places
        }

        // Simple grading logic example, can be customized
        if (this.percentage >= 90) this.overallGrade = 'A+';
        else if (this.percentage >= 80) this.overallGrade = 'A';
        else if (this.percentage >= 70) this.overallGrade = 'B';
        else if (this.percentage >= 60) this.overallGrade = 'C';
        else if (this.percentage >= 50) this.overallGrade = 'D';
        else this.overallGrade = 'F';
    }
    next();
});

export default mongoose.model('Result', resultSchema);
