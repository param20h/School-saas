import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';

// Mark attendance (single or bulk)
export const markAttendance = async (req, res) => {
    try {
        const { date, classId, records } = req.body;
        // records: [{ studentId, status, remarks }]

        const results = [];
        for (const record of records) {
            const { studentId, status, remarks } = record;

            // Upsert attendance record
            const attendance = await Attendance.findOneAndUpdate(
                { student: studentId, date: new Date(date) },
                {
                    student: studentId,
                    date: new Date(date),
                    status,
                    remarks
                },
                { upsert: true, new: true }
            );
            results.push(attendance);
        }

        res.json({ message: 'Attendance marked successfully', results });
    } catch (error) {
        res.status(500).json({ message: 'Error marking attendance', error: error.message });
    }
};

// Get attendance for a class on a specific date
export const getClassAttendance = async (req, res) => {
    try {
        const { classId, date } = req.query;

        // Find all students in the class
        // Note: In a real app, we'd query students by classId. 
        // Since our Student model has 'class' as string (e.g. "10"), we filter by that.

        // This is a simplified implementation assuming we pass the class string
        const students = await Student.find({ class: classId }).populate('user', 'name');

        // Fetch attendance records for these students on the date
        const attendanceRecords = await Attendance.find({
            date: new Date(date),
            student: { $in: students.map(s => s._id) }
        });

        // Combine data
        const result = students.map(student => {
            const record = attendanceRecords.find(r => r.student.toString() === student._id.toString());
            return {
                student,
                status: record ? record.status : 'Not Marked',
                remarks: record ? record.remarks : ''
            };
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance', error: error.message });
    }
};

// Get monthly attendance for a student
export const getStudentAttendance = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { month, year } = req.query;

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const records = await Attendance.find({
            student: studentId,
            date: { $gte: startDate, $lte: endDate }
        });

        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student attendance', error: error.message });
    }
};
