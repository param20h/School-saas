'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { BookOpen, Users, Plus, Edit, Trash2, GraduationCap, X, Calendar } from 'lucide-react';

export default function ClassManagement() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        section: '',
        classTeacher: '',
        capacity: '',
        room: '',
        subjects: ''
    });

    const classes = [
        {
            id: 1,
            name: 'Class 10',
            section: 'A',
            classTeacher: 'John Doe',
            totalStudents: 35,
            capacity: 40,
            room: 'Room 101',
            subjects: ['Mathematics', 'Science', 'English', 'History', 'Geography']
        },
        {
            id: 2,
            name: 'Class 10',
            section: 'B',
            classTeacher: 'Sarah Smith',
            totalStudents: 38,
            capacity: 40,
            room: 'Room 102',
            subjects: ['Mathematics', 'Science', 'English', 'History', 'Geography']
        },
        {
            id: 3,
            name: 'Class 9',
            section: 'A',
            classTeacher: 'Michael Johnson',
            totalStudents: 32,
            capacity: 40,
            room: 'Room 201',
            subjects: ['Mathematics', 'Science', 'English', 'Social Studies']
        },
        {
            id: 4,
            name: 'Class 9',
            section: 'B',
            classTeacher: 'Emily Davis',
            totalStudents: 30,
            capacity: 40,
            room: 'Room 202',
            subjects: ['Mathematics', 'Science', 'English', 'Social Studies']
        },
        {
            id: 5,
            name: 'Class 8',
            section: 'A',
            classTeacher: 'David Wilson',
            totalStudents: 28,
            capacity: 35,
            room: 'Room 301',
            subjects: ['Mathematics', 'Science', 'English', 'Hindi']
        },
        {
            id: 6,
            name: 'Class 8',
            section: 'B',
            classTeacher: 'Lisa Anderson',
            totalStudents: 26,
            capacity: 35,
            room: 'Room 302',
            subjects: ['Mathematics', 'Science', 'English', 'Hindi']
        }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Class added successfully!');
        setShowAddModal(false);
        setFormData({ name: '', section: '', classTeacher: '', capacity: '', room: '', subjects: '' });
    };

    return (
        <DashboardLayout role="admin">
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Class Management</h1>
                        <p className="text-gray-600 mt-1">Manage classes, sections, and assignments</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Class
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Classes</p>
                                <h3 className="text-3xl font-bold mt-1 text-gray-900">{classes.length}</h3>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Students</p>
                                <h3 className="text-3xl font-bold mt-1 text-gray-900">
                                    {classes.reduce((sum, c) => sum + c.totalStudents, 0)}
                                </h3>
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <Users className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Avg Capacity</p>
                                <h3 className="text-3xl font-bold mt-1 text-gray-900">
                                    {Math.round(classes.reduce((sum, c) => sum + c.capacity, 0) / classes.length)}
                                </h3>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <Calendar className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Occupancy Rate</p>
                                <h3 className="text-3xl font-bold mt-1 text-gray-900">
                                    {Math.round((classes.reduce((sum, c) => sum + c.totalStudents, 0) /
                                        classes.reduce((sum, c) => sum + c.capacity, 0)) * 100)}%
                                </h3>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-xl">
                                <GraduationCap className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Classes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((classItem) => (
                        <div key={classItem.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{classItem.name} - {classItem.section}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{classItem.room}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Edit className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <GraduationCap className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">Class Teacher:</span>
                                    <span className="font-medium text-gray-900">{classItem.classTeacher}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Users className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">Students:</span>
                                    <span className="font-medium text-gray-900">{classItem.totalStudents} / {classItem.capacity}</span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Capacity</span>
                                    <span>{Math.round((classItem.totalStudents / classItem.capacity) * 100)}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                                        style={{ width: `${(classItem.totalStudents / classItem.capacity) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Subjects */}
                            <div>
                                <p className="text-xs font-medium text-gray-500 mb-2">Subjects ({classItem.subjects.length})</p>
                                <div className="flex flex-wrap gap-2">
                                    {classItem.subjects.slice(0, 3).map((subject, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg">
                                            {subject}
                                        </span>
                                    ))}
                                    {classItem.subjects.length > 3 && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                                            +{classItem.subjects.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* View Details Button */}
                            <button className="w-full mt-4 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add Class Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Add New Class</h2>
                                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Class Name *</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            placeholder="e.g., Class 10"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Section *</label>
                                        <input
                                            type="text"
                                            value={formData.section}
                                            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            placeholder="A, B, C..."
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Class Teacher *</label>
                                        <input
                                            type="text"
                                            value={formData.classTeacher}
                                            onChange={(e) => setFormData({ ...formData, classTeacher: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
                                        <input
                                            type="text"
                                            value={formData.room}
                                            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Capacity *</label>
                                        <input
                                            type="number"
                                            value={formData.capacity}
                                            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                                    >
                                        Add Class
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
