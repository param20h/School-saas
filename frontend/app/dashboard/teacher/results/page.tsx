'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
    Award,
    TrendingUp,
    Search,
    Plus,
    Edit,
    Trash2,
    X,
    BarChart3,
    Users,
    BookOpen,
    Filter
} from 'lucide-react';

export default function TeacherResults() {
    const [results, setResults] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterClass, setFilterClass] = useState('ALL');
    const [filterExam, setFilterExam] = useState('ALL');
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        examType: 'MIDTERM',
        marksObtained: '',
        totalMarks: '100',
        classId: ''
    });

    const myClasses = [
        { id: '10-A', name: 'Class 10 - A' },
        { id: '10-B', name: 'Class 10 - B' },
        { id: '9-A', name: 'Class 9 - A' },
        { id: '9-B', name: 'Class 9 - B' },
        { id: '8-A', name: 'Class 8 - A' },
    ];

    const examTypes = ['MIDTERM', 'FINAL', 'QUARTERLY', 'HALF_YEARLY', 'ANNUAL', 'UNIT_TEST'];

    const mockResults = [
        {
            _id: '1',
            student: { name: 'John Doe', class: '10-A', rollNo: '001' },
            examType: 'MIDTERM',
            marksObtained: 85,
            totalMarks: 100,
            percentage: 85,
            grade: 'A',
            date: '2024-12-20'
        },
        {
            _id: '2',
            student: { name: 'Jane Smith', class: '10-A', rollNo: '002' },
            examType: 'MIDTERM',
            marksObtained: 92,
            totalMarks: 100,
            percentage: 92,
            grade: 'A+',
            date: '2024-12-20'
        },
        {
            _id: '3',
            student: { name: 'Mike Johnson', class: '10-B', rollNo: '003' },
            examType: 'MIDTERM',
            marksObtained: 78,
            totalMarks: 100,
            percentage: 78,
            grade: 'B',
            date: '2024-12-20'
        },
    ];

    useEffect(() => {
        setResults(mockResults);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Result added successfully!');
        setShowAddModal(false);
        setFormData({
            studentName: '',
            examType: 'MIDTERM',
            marksObtained: '',
            totalMarks: '100',
            classId: ''
        });
    };

    const filteredResults = results.filter(result => {
        const matchesSearch = result.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.student.rollNo.includes(searchTerm);
        const matchesClass = filterClass === 'ALL' || result.student.class === filterClass;
        const matchesExam = filterExam === 'ALL' || result.examType === filterExam;
        return matchesSearch && matchesClass && matchesExam;
    });

    const stats = {
        totalResults: results.length,
        avgPercentage: results.length > 0
            ? (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(2)
            : '0',
        passCount: results.filter(r => r.percentage >= 50).length,
        failCount: results.filter(r => r.percentage < 50).length,
    };

    return (
        <DashboardLayout role="teacher">
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Results Management</h1>
                        <p className="text-slate-600 mt-1">Manage student exam results</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add Result
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Results</p>
                                <h3 className="text-3xl font-bold mt-1 text-gray-900">{stats.totalResults}</h3>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <BarChart3 className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Average Score</p>
                                <h3 className="text-3xl font-bold mt-1 text-purple-600">{stats.avgPercentage}%</h3>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <Award className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Passed</p>
                                <h3 className="text-3xl font-bold mt-1 text-green-600">{stats.passCount}</h3>
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Failed</p>
                                <h3 className="text-3xl font-bold mt-1 text-red-600">{stats.failCount}</h3>
                            </div>
                            <div className="p-3 bg-red-100 rounded-xl">
                                <Users className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or roll no..."
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
                        <select
                            value={filterExam}
                            onChange={(e) => setFilterExam(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        >
                            <option value="ALL">All Exams</option>
                            {examTypes.map((exam) => (
                                <option key={exam} value={exam}>{exam.replace('_', ' ')}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Exam Type</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Marks</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Percentage</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Grade</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredResults.map((result) => (
                                    <tr key={result._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                    {result.student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{result.student.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {result.student.class} | Roll: {result.student.rollNo}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">
                                                {result.examType.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-semibold text-gray-900">
                                                {result.marksObtained}/{result.totalMarks}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-bold text-lg text-gray-900">{result.percentage}%</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-4 py-2 rounded-lg text-sm font-bold ${
                                                result.grade === 'A+' || result.grade === 'A' 
                                                    ? 'bg-green-100 text-green-700'
                                                    : result.grade === 'B' || result.grade === 'C'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : result.grade === 'D'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}>
                                                {result.grade}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4 text-gray-600" />
                                                </button>
                                                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Result Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Add Exam Result</h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Student Name *</label>
                                        <input
                                            type="text"
                                            value={formData.studentName}
                                            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                            required
                                        />
                                    </div>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type *</label>
                                        <select
                                            value={formData.examType}
                                            onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                            required
                                        >
                                            {examTypes.map((exam) => (
                                                <option key={exam} value={exam}>{exam.replace('_', ' ')}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Marks Obtained *</label>
                                        <input
                                            type="number"
                                            value={formData.marksObtained}
                                            onChange={(e) => setFormData({ ...formData, marksObtained: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks *</label>
                                        <input
                                            type="number"
                                            value={formData.totalMarks}
                                            onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
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
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                                    >
                                        Add Result
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
