'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
    BookOpen,
    Plus,
    Edit,
    Trash2,
    Eye,
    Search,
    Calendar,
    Clock,
    Users,
    CheckCircle,
    X,
    FileText
} from 'lucide-react';

export default function TeacherHomework() {
    const [homework, setHomework] = useState<any[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterClass, setFilterClass] = useState('ALL');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        classId: '',
        dueDate: '',
        totalMarks: ''
    });

    const myClasses = [
        { id: '10-A', name: 'Class 10 - A' },
        { id: '10-B', name: 'Class 10 - B' },
        { id: '9-A', name: 'Class 9 - A' },
        { id: '9-B', name: 'Class 9 - B' },
        { id: '8-A', name: 'Class 8 - A' },
    ];

    const mockHomework = [
        {
            _id: '1',
            title: 'Algebra Chapter 5 - Exercises',
            description: 'Complete all exercises from pages 45-50',
            class: '10-A',
            dueDate: '2025-01-05',
            assignedDate: '2024-12-25',
            totalMarks: 20,
            submittedCount: 28,
            totalStudents: 35,
            status: 'ACTIVE'
        },
        {
            _id: '2',
            title: 'Quadratic Equations Practice',
            description: 'Solve all quadratic equation problems',
            class: '10-B',
            dueDate: '2025-01-08',
            assignedDate: '2024-12-26',
            totalMarks: 25,
            submittedCount: 22,
            totalStudents: 38,
            status: 'ACTIVE'
        },
        {
            _id: '3',
            title: 'Geometry Theorems',
            description: 'Prove the listed geometry theorems',
            class: '9-A',
            dueDate: '2024-12-30',
            assignedDate: '2024-12-20',
            totalMarks: 15,
            submittedCount: 32,
            totalStudents: 32,
            status: 'COMPLETED'
        },
    ];

    useEffect(() => {
        setHomework(mockHomework);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Homework assigned successfully!');
        setShowAddModal(false);
        setFormData({ title: '', description: '', classId: '', dueDate: '', totalMarks: '' });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this homework?')) {
            alert('Homework deleted!');
        }
    };

    const filteredHomework = homework.filter(hw => {
        const matchesSearch = hw.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hw.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterClass === 'ALL' || hw.class === filterClass;
        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: homework.length,
        active: homework.filter(h => h.status === 'ACTIVE').length,
        completed: homework.filter(h => h.status === 'COMPLETED').length,
        avgSubmission: homework.length > 0
            ? ((homework.reduce((sum, h) => sum + (h.submittedCount / h.totalStudents * 100), 0) / homework.length)).toFixed(1)
            : '0'
    };

    return (
        <DashboardLayout role="teacher">
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Homework Management</h1>
                        <p className="text-slate-600 mt-1">Assign and track homework assignments</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Assign Homework
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Assignments</p>
                                <h3 className="text-3xl font-bold mt-1 text-gray-900">{stats.total}</h3>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Active</p>
                                <h3 className="text-3xl font-bold mt-1 text-purple-600">{stats.active}</h3>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <Clock className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Completed</p>
                                <h3 className="text-3xl font-bold mt-1 text-green-600">{stats.completed}</h3>
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Avg Submission</p>
                                <h3 className="text-3xl font-bold mt-1 text-yellow-600">{stats.avgSubmission}%</h3>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-xl">
                                <FileText className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search homework..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <select
                            value={filterClass}
                            onChange={(e) => setFilterClass(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        >
                            <option value="ALL">All Classes</option>
                            {myClasses.map((cls) => (
                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Homework List */}
                <div className="grid grid-cols-1 gap-6">
                    {filteredHomework.map((hw) => (
                        <div key={hw._id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-start gap-3 mb-2">
                                        <div className="p-3 bg-purple-100 rounded-xl">
                                            <BookOpen className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{hw.title}</h3>
                                            <p className="text-gray-600 mb-3">{hw.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                                                    {hw.class}
                                                </span>
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                                                    {hw.totalMarks} Marks
                                                </span>
                                                {hw.status === 'ACTIVE' ? (
                                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                                        Completed
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Eye className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Edit className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(hw._id)}
                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5 text-red-600" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>Assigned: {new Date(hw.assignedDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>Due: {new Date(hw.dueDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Users className="w-4 h-4 text-gray-600" />
                                    <span className="text-gray-900 font-medium">
                                        {hw.submittedCount}/{hw.totalStudents} submitted
                                    </span>
                                    <span className="text-gray-500">
                                        ({Math.round((hw.submittedCount / hw.totalStudents) * 100)}%)
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-4">
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all"
                                        style={{ width: `${(hw.submittedCount / hw.totalStudents) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Homework Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Assign Homework</h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                        rows={4}
                                        required
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                                        <select
                                            value={formData.classId}
                                            onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                            required
                                        >
                                            <option value="">Select class...</option>
                                            {myClasses.map((cls) => (
                                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                                        <input
                                            type="date"
                                            value={formData.dueDate}
                                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
                                        <input
                                            type="number"
                                            value={formData.totalMarks}
                                            onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
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
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                                    >
                                        Assign Homework
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
