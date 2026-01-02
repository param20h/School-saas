'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
    BookOpen,
    Users,
    TrendingUp,
    Calendar,
    Edit,
    Eye,
    Plus,
    Filter,
    Search,
    Clock,
    CheckCircle
} from 'lucide-react';

export default function TeacherClasses() {
    const [classes, setClasses] = useState<any[]>([]);
    const [selectedClass, setSelectedClass] = useState<string>('all');

    const myClasses = [
        {
            id: 1,
            name: 'Class 10',
            section: 'A',
            subject: 'Mathematics',
            students: 35,
            schedule: 'Mon, Wed, Fri - 9:00 AM',
            nextClass: '2025-12-29 09:00',
            avgAttendance: 94,
            avgPerformance: 78,
            room: 'Room 101'
        },
        {
            id: 2,
            name: 'Class 10',
            section: 'B',
            subject: 'Mathematics',
            students: 38,
            schedule: 'Mon, Wed, Fri - 2:00 PM',
            nextClass: '2025-12-29 14:00',
            avgAttendance: 92,
            avgPerformance: 75,
            room: 'Room 102'
        },
        {
            id: 3,
            name: 'Class 9',
            section: 'A',
            subject: 'Mathematics',
            students: 32,
            schedule: 'Tue, Thu - 10:00 AM',
            nextClass: '2025-12-30 10:00',
            avgAttendance: 96,
            avgPerformance: 82,
            room: 'Room 201'
        },
        {
            id: 4,
            name: 'Class 9',
            section: 'B',
            subject: 'Mathematics',
            students: 30,
            schedule: 'Tue, Thu - 11:00 AM',
            nextClass: '2025-12-30 11:00',
            avgAttendance: 91,
            avgPerformance: 76,
            room: 'Room 202'
        },
        {
            id: 5,
            name: 'Class 8',
            section: 'A',
            subject: 'Mathematics',
            students: 28,
            schedule: 'Mon, Wed, Fri - 11:00 AM',
            nextClass: '2025-12-29 11:00',
            avgAttendance: 93,
            avgPerformance: 79,
            room: 'Room 301'
        },
    ];

    useEffect(() => {
        setClasses(myClasses);
    }, []);

    const stats = {
        totalClasses: classes.length,
        totalStudents: classes.reduce((sum, c) => sum + c.students, 0),
        avgAttendance: classes.length > 0 
            ? (classes.reduce((sum, c) => sum + c.avgAttendance, 0) / classes.length).toFixed(1)
            : '0',
        avgPerformance: classes.length > 0
            ? (classes.reduce((sum, c) => sum + c.avgPerformance, 0) / classes.length).toFixed(1)
            : '0'
    };

    return (
        <DashboardLayout role="teacher">
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">My Classes</h1>
                        <p className="text-slate-600 mt-1">Manage your assigned classes</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Classes</p>
                                <h3 className="text-3xl font-bold mt-1 text-gray-900">{stats.totalClasses}</h3>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <BookOpen className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Students</p>
                                <h3 className="text-3xl font-bold mt-1 text-gray-900">{stats.totalStudents}</h3>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Avg Attendance</p>
                                <h3 className="text-3xl font-bold mt-1 text-green-600">{stats.avgAttendance}%</h3>
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Avg Performance</p>
                                <h3 className="text-3xl font-bold mt-1 text-purple-600">{stats.avgPerformance}%</h3>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Classes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((classItem) => (
                        <div key={classItem.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {classItem.name} - {classItem.section}
                                    </h3>
                                    <p className="text-purple-600 font-medium mt-1">{classItem.subject}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Eye className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Edit className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span className="font-medium text-gray-900">{classItem.students} Students</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>{classItem.schedule}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <BookOpen className="w-4 h-4" />
                                    <span>{classItem.room}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Attendance</p>
                                    <p className="text-lg font-bold text-green-600">{classItem.avgAttendance}%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Performance</p>
                                    <p className="text-lg font-bold text-purple-600">{classItem.avgPerformance}%</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <p className="text-xs text-gray-500 mb-1">Next Class</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {new Date(classItem.nextClass).toLocaleDateString('en-US', { 
                                        weekday: 'short', 
                                        month: 'short', 
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors text-sm font-medium">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Weekly Schedule */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">This Week's Schedule</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Monday</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tuesday</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Wednesday</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thursday</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Friday</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">9:00 AM</td>
                                    <td className="px-6 py-4">
                                        <div className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                                            Class 10-A
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">-</td>
                                    <td className="px-6 py-4">
                                        <div className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                                            Class 10-A
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">-</td>
                                    <td className="px-6 py-4">
                                        <div className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                                            Class 10-A
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">10:00 AM</td>
                                    <td className="px-6 py-4">-</td>
                                    <td className="px-6 py-4">
                                        <div className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                                            Class 9-A
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">-</td>
                                    <td className="px-6 py-4">
                                        <div className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                                            Class 9-A
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">-</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">11:00 AM</td>
                                    <td className="px-6 py-4">
                                        <div className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                                            Class 8-A
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">
                                            Class 9-B
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                                            Class 8-A
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">
                                            Class 9-B
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                                            Class 8-A
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">2:00 PM</td>
                                    <td className="px-6 py-4">
                                        <div className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                                            Class 10-B
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">-</td>
                                    <td className="px-6 py-4">
                                        <div className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                                            Class 10-B
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">-</td>
                                    <td className="px-6 py-4">
                                        <div className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                                            Class 10-B
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
