'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
    Calendar,
    Users,
    CheckCircle,
    XCircle,
    Clock,
    Search,
    Filter,
    Download,
    TrendingUp,
    AlertCircle
} from 'lucide-react';
import { attendanceAPI, studentAPI } from '@/lib/api';

export default function AttendanceManagement() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedClass, setSelectedClass] = useState('10-A');
    const [students, setStudents] = useState<any[]>([]);
    const [attendance, setAttendance] = useState<{ [key: string]: 'PRESENT' | 'ABSENT' | 'LATE' }>({});
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const classes = [
        { id: '10-A', name: 'Class 10 - A' },
        { id: '10-B', name: 'Class 10 - B' },
        { id: '9-A', name: 'Class 9 - A' },
        { id: '9-B', name: 'Class 9 - B' },
        { id: '8-A', name: 'Class 8 - A' },
        { id: '8-B', name: 'Class 8 - B' },
    ];

    useEffect(() => {
        fetchStudents();
    }, [selectedClass]);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await studentAPI.getAll();
            const [className, section] = selectedClass.split('-');
            const filteredStudents = response.data.filter(
                (s: any) => s.class === className && s.section === section
            );
            setStudents(filteredStudents);
            
            // Initialize attendance state
            const initialAttendance: { [key: string]: 'PRESENT' | 'ABSENT' | 'LATE' } = {};
            filteredStudents.forEach((student: any) => {
                initialAttendance[student._id] = 'PRESENT';
            });
            setAttendance(initialAttendance);
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleAttendance = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
        setAttendance(prev => ({ ...prev, [studentId]: status }));
    };

    const handleSubmit = async () => {
        try {
            const attendanceRecords = Object.entries(attendance).map(([studentId, status]) => ({
                student: studentId,
                date: selectedDate,
                status,
                class: selectedClass
            }));

            await attendanceAPI.mark({ records: attendanceRecords });
            alert('Attendance marked successfully!');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Error marking attendance');
        }
    };

    const stats = {
        present: Object.values(attendance).filter(s => s === 'PRESENT').length,
        absent: Object.values(attendance).filter(s => s === 'ABSENT').length,
        late: Object.values(attendance).filter(s => s === 'LATE').length,
    };

    const attendanceRate = students.length > 0 
        ? ((stats.present + stats.late) / students.length * 100).toFixed(1)
        : '0';

    const filteredStudents = students.filter(student =>
        student.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.includes(searchTerm)
    );

    return (
        <DashboardLayout role="admin">
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Attendance Management</h1>
                        <p className="text-slate-600 mt-1">Mark and track student attendance</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="btn-secondary flex items-center gap-2 hover:-translate-y-0.5 active:scale-[0.98]">
                            <Download className="w-5 h-5" />
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="stat-card hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium">Total Students</p>
                                <h3 className="text-3xl font-bold mt-1 text-slate-900">{students.length}</h3>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="stat-card hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium">Present</p>
                                <h3 className="text-3xl font-bold mt-1 text-green-600">{stats.present}</h3>
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Absent</p>
                                <h3 className="text-3xl font-bold mt-1 text-red-600">{stats.absent}</h3>
                            </div>
                            <div className="p-3 bg-red-100 rounded-xl">
                                <XCircle className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Attendance Rate</p>
                                <h3 className="text-3xl font-bold mt-1 text-blue-600">{attendanceRate}%</h3>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="card shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="label">Select Date</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="input transition-all duration-200"
                            />
                        </div>
                        <div>
                            <label className="label">Select Class</label>
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="input transition-all duration-200"
                            >
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="label">Search Student</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name or roll no..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="input pl-10 transition-all duration-200"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attendance Table */}
                <div className="card shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Roll No</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student Name</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Status</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-4"><div className="skeleton h-6 w-16"></div></td>
                                            <td className="px-6 py-4"><div className="skeleton h-10 rounded-full w-48"></div></td>
                                            <td className="px-6 py-4"><div className="skeleton h-8 w-32 mx-auto"></div></td>
                                            <td className="px-6 py-4"><div className="skeleton h-10 w-64 mx-auto"></div></td>
                                        </tr>
                                    ))
                                ) : filteredStudents.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                            No students found for this class.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map((student) => (
                                        <tr key={student._id} className="hover:bg-slate-50 transition-all duration-200">
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-slate-900">{student.rollNo}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                                        {student.user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900">{student.user.name}</p>
                                                        <p className="text-xs text-slate-500">{student.user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {attendance[student._id] === 'PRESENT' && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                        <CheckCircle className="w-4 h-4" />
                                                        Present
                                                    </span>
                                                )}
                                                {attendance[student._id] === 'ABSENT' && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                                        <XCircle className="w-4 h-4" />
                                                        Absent
                                                    </span>
                                                )}
                                                {attendance[student._id] === 'LATE' && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                                        <Clock className="w-4 h-4" />
                                                        Late
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => toggleAttendance(student._id, 'PRESENT')}
                                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-[0.98] ${
                                                            attendance[student._id] === 'PRESENT'
                                                                ? 'bg-green-600 text-white shadow-sm'
                                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                        }`}
                                                    >
                                                        Present
                                                    </button>
                                                    <button
                                                        onClick={() => toggleAttendance(student._id, 'LATE')}
                                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-[0.98] ${
                                                            attendance[student._id] === 'LATE'
                                                                ? 'bg-yellow-600 text-white shadow-sm'
                                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                        }`}
                                                    >
                                                        Late
                                                    </button>
                                                    <button
                                                        onClick={() => toggleAttendance(student._id, 'ABSENT')}
                                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-[0.98] ${
                                                            attendance[student._id] === 'ABSENT'
                                                                ? 'bg-red-600 text-white shadow-sm'
                                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                        }`}
                                                    >
                                                        Absent
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Submit Button */}
                    {students.length > 0 && (
                        <div className="p-6 bg-slate-50 border-t border-slate-100">
                            <button
                                onClick={handleSubmit}
                                className="btn-primary w-full text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg"
                            >
                                Submit Attendance for {selectedDate}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
