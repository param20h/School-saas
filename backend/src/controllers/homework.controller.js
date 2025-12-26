import Homework from '../models/Homework.js';

// Create homework
export const createHomework = async (req, res) => {
    try {
        const homework = new Homework({
            ...req.body,
            assignedBy: req.user._id // Assuming auth middleware sets this
        });
        await homework.save();

        await homework.populate('classId', 'name section');

        res.status(201).json(homework);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all homework (with filters)
export const getHomework = async (req, res) => {
    try {
        const { classId, subject, status } = req.query;
        const query = {};

        if (classId) query.classId = classId;
        if (subject) query.subject = subject;
        if (status) query.status = status;

        const homeworks = await Homework.find(query)
            .populate('classId', 'name section gradeLevel')
            .populate('assignedBy', 'firstName lastName')
            .sort({ dueDate: 1 }); // Soonest due date first

        res.json(homeworks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single homework
export const getHomeworkById = async (req, res) => {
    try {
        const homework = await Homework.findById(req.params.id)
            .populate('classId', 'name section gradeLevel')
            .populate('assignedBy', 'firstName lastName')
            .populate('submissions.studentId', 'firstName lastName rollNo');

        if (!homework) {
            return res.status(404).json({ message: 'Homework not found' });
        }
        res.json(homework);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update homework
export const updateHomework = async (req, res) => {
    try {
        // Only allow updating if creator or admin
        const homework = await Homework.findById(req.params.id);
        if (!homework) {
            return res.status(404).json({ message: 'Homework not found' });
        }

        // Check permissions (Admin or the teacher who created it)
        if (req.user.role !== 'admin' && homework.assignedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this homework' });
        }

        Object.assign(homework, req.body);
        await homework.save();
        res.json(homework);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete homework
export const deleteHomework = async (req, res) => {
    try {
        const homework = await Homework.findById(req.params.id);
        if (!homework) {
            return res.status(404).json({ message: 'Homework not found' });
        }

        if (req.user.role !== 'admin' && homework.assignedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this homework' });
        }

        await Homework.findByIdAndDelete(req.params.id);
        res.json({ message: 'Homework deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Submit homework (Student)
export const submitHomework = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const studentId = req.user.studentId; // Assuming we attach studentId to req.user for student users

        if (!studentId) {
            return res.status(400).json({ message: 'Student ID not found in token' });
        }

        const homework = await Homework.findById(id);
        if (!homework) {
            return res.status(404).json({ message: 'Homework not found' });
        }

        // logic to update submission if already exists or push new
        const existingSubmission = homework.submissions.find(sub => sub.studentId.toString() === studentId.toString());

        if (existingSubmission) {
            existingSubmission.content = content;
            existingSubmission.submissionDate = Date.now();
            existingSubmission.status = 'Submitted';
        } else {
            homework.submissions.push({
                studentId,
                content,
                status: 'Submitted',
                submissionDate: Date.now()
            });
        }

        await homework.save();
        res.json(homework);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
