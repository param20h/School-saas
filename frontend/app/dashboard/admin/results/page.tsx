'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
    Award,
    TrendingUp,
    TrendingDown,
    Search,
    Filter,
    Plus,
    Download,
    Edit,
    Trash2,
    X,
    BarChart3,
    Users,
    BookOpen
} from 'lucide-react';
import { studentAPI } from '@/lib/api';

export default function ResultsManagement() {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterClass, setFilterClass] = useState('ALL');
    const [filterExam, setFilterExam] = useState('ALL');
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        studentId: '',
        examType: 'MIDTERM',
        subject: '',
        marksObtained: '',
        totalMarks: '',
        grade: '',
        remarks: ''
    });

    const classes = [
        { id: '10-A', name: 'Class 10 - A' },
        { id: '10-B', name: 'Class 10 - B' },
        { id: '9-A', name: 'Class 9 - A' },
        { id: '9-B', name: 'Class 9 - B' },
        { id: '8-A', name: 'Class 8 - A' },
        { id: '8-B', name: 'Class 8 - B' },
    ];

    const examTypes = ['MIDTERM', 'FINAL', 'QUARTERLY', 'HALF_YEARLY', 'ANNUAL', 'UNIT_TEST'];
    const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Hindi', 'Computer Science'];

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            setLoading(true);
            const studentsRes = await studentAPI.getAll();
            
            // Mock results data - replace with actual API call
            const mockResults = studentsRes.data.flatMap((student: any) => {
                return subjects.slice(0, 3).map((subject, idx) => ({
                    _id: `${student._id}-${idx}`,
                    student: student,
                    examType: examTypes[Math.floor(Math.random() * examTypes.length)],
                    subject: subject,
                    marksObtained: 60 + Math.floor(Math.random() * 40),
                    totalMarks: 100,
                    percentage: 0,
                    grade: '',
                    remarks: ''
                }));
            });

            // Calculate percentage and grade
            mockResults.forEach(result => {
                result.percentage = ((result.marksObtained / result.totalMarks) * 100).toFixed(2);
                if (result.percentage >= 90) result.grade = 'A+';
                else if (result.percentage >= 80) result.grade = 'A';
                else if (result.percentage >= 70) result.grade = 'B';
                else if (result.percentage >= 60) result.grade = 'C';
                else if (result.percentage >= 50) result.grade = 'D';
                else result.grade = 'F';
            });

            setResults(mockResults);
        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // API call to create result
            alert('Result added successfully!');
            setShowAddModal(false);
            fetchResults();
            setFormData({
                studentId: '', examType: 'MIDTERM', subject: '',
                marksObtained: '', totalMarks: '', grade: '', remarks: ''
            });
        } catch (error: any) {
            alert(error.response?.data?.message || 'Error adding result');
        }
    };

    const filteredResults = results.filter(result => {
        const matchesSearch =
            result.student.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.student.rollNo.includes(searchTerm) ||
            result.subject.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesClass =
            filterClass === 'ALL' || `${result.student.class}-${result.student.section}` === filterClass;

        const matchesExam =
            filterExam === 'ALL' || result.examType === filterExam;

        return matchesSearch && matchesClass && matchesExam;
    });

    const stats = {
        totalResults: results.length,
        avgPercentage: results.length > 0
            ? (results.reduce((sum, r) => sum + parseFloat(r.percentage), 0) / results.length).toFixed(2)
            : '0',
        passCount: results.filter(r => parseFloat(r.percentage) >= 50).length,
        failCount: results.filter(r => parseFloat(r.percentage) < 50).length,
    };

    const passRate = results.length > 0 ? ((stats.passCount / results.length) * 100).toFixed(1) : '0';

    return (
        <DashboardLayout role="admin">
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Results Management</h1>
                        <p className="text-gray-600 mt-1">Manage student exam results and grades</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all">
                            <Download className="w-5 h-5" />
                            Export Report
                        </button>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:shadow-lg transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Add Result
                        </button>
                    </div>
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
                                <p className="text-gray-600 text-sm">Pass Rate</p>
                                <h3 className="text-3xl font-bold mt-1 text-green-600">{passRate}%</h3>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className="text-xs text-green-600">+2.5%</span>
                                </div>
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Below 50%</p>
                                <h3 className="text-3xl font-bold mt-1 text-red-600">{stats.failCount}</h3>
                                <p className="text-xs text-gray-500 mt-1">Need attention</p>
                            </div>
                            <div className="p-3 bg-red-100 rounded-xl">
                                <TrendingDown className="w-6 h-6 text-red-600" />
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
                                placeholder="Search by name, roll no, or subject..."
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
                            {classes.map((cls) => (
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
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student Info</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Exam Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subject</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Marks</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Percentage</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Grade</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-6 py-4"><div className="h-10 bg-gray-100 rounded-full w-48"></div></td>
                                            <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-24"></div></td>
                                            <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-32"></div></td>
                                            <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-16 mx-auto"></div></td>
                                            <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-16 mx-auto"></div></td>
                                            <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-12 mx-auto"></div></td>
                                            <td className="px-6 py-4"><div className="h-8 bg-gray-100 rounded w-20 mx-auto"></div></td>
                                        </tr>
                                    ))
                                ) : filteredResults.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                            No results found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredResults.map((result) => (
                                        <tr key={result._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                        {result.student.user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{result.student.user.name}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {result.student.class} - {result.student.section} | Roll: {result.student.rollNo}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">
                                                    {result.examType.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-gray-900">{result.subject}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="font-semibold text-gray-900">
                                                    {result.marksObtained}/{result.totalMarks}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span className="font-bold text-lg text-gray-900">{result.percentage}%</span>
                                                    {parseFloat(result.percentage) >= 75 ? (
                                                        <TrendingUp className="w-4 h-4 text-green-600" />
                                                    ) : parseFloat(result.percentage) < 50 ? (
                                                        <TrendingDown className="w-4 h-4 text-red-600" />
                                                    ) : null}
                                                </div>
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
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Result Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Student *</label>
                                    <select
                                        value={formData.studentId}
                                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                        required
                                    >
                                        <option value="">Choose a student...</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                                        <select
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                            required
                                        >
                                            <option value="">Select subject...</option>
                                            {subjects.map((subject) => (
                                                <option key={subject} value={subject}>{subject}</option>
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
                                            placeholder="85"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks *</label>
                                        <input
                                            type="number"
                                            value={formData.totalMarks}
                                            onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                            placeholder="100"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                                    <textarea
                                        value={formData.remarks}
                                        onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                        rows={3}
                                        placeholder="Teacher's remarks..."
                                    ></textarea>
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
