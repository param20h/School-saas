import Result from '../models/Result.js';

// Create a new result
export const createResult = async (req, res) => {
    try {
        const result = new Result(req.body);
        await result.save();

        // Populate specific fields in the response if needed
        const populatedResult = await result.populate([
            { path: 'studentId', select: 'firstName lastName rollNo' },
            { path: 'classId', select: 'name section gradeLevel' }
        ]);

        res.status(201).json(populatedResult);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all results with filters
export const getResults = async (req, res) => {
    try {
        const { studentId, classId, examType, academicYear } = req.query;
        const query = {};

        if (studentId) query.studentId = studentId;
        if (classId) query.classId = classId;
        if (examType) query.examType = examType;
        if (academicYear) query.academicYear = academicYear;

        const results = await Result.find(query)
            .populate('studentId', 'firstName lastName rollNo')
            .populate('classId', 'name section gradeLevel')
            .sort({ createdAt: -1 });

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single result by ID
export const getResultById = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id)
            .populate('studentId', 'firstName lastName rollNo')
            .populate('classId', 'name section gradeLevel');

        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a result
export const updateResult = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }

        // Update fields
        Object.assign(result, req.body);

        // Retrieve and save to trigger pre-save calculation hooks
        await result.save();

        const updatedResult = await result.populate([
            { path: 'studentId', select: 'firstName lastName rollNo' },
            { path: 'classId', select: 'name section gradeLevel' }
        ]);

        res.json(updatedResult);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a result
export const deleteResult = async (req, res) => {
    try {
        const result = await Result.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.json({ message: 'Result deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get results specific to a student (convenience method)
export const getStudentResults = async (req, res) => {
    try {
        const results = await Result.find({ studentId: req.params.studentId })
            .populate('classId', 'name section gradeLevel')
            .sort({ academicYear: -1, createdAt: -1 });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
