'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
    User, Calendar, TrendingUp, DollarSign, BookOpen, Award, 
    Clock, CheckCircle2, AlertCircle, Search, Filter, Eye, Mail, Phone, MapPin
} from 'lucide-react';

export default function ParentChildrenPage() {
    const [children, setChildren] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedChild, setSelectedChild] = useState<any>(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        fetchChildren();
    }, []);

    const fetchChildren = async () => {
        // Mock data - replace with actual API call
        setTimeout(() => {
            setChildren([
                {
                    id: 1,
                    name: 'Sarah Johnson',
                    class: 'Class 10-A',
                    section: 'A',
                    rollNo: '101',
                    admissionNo: 'SCH/2021/101',
                    dob: '2010-05-15',
                    gender: 'Female',
                    bloodGroup: 'O+',
                    attendance: 94.2,
                    avgGrade: 'A',
                    avgPercentage: 85.4,
                    pendingFees: 0,
                    totalFees: 50000,
                    paidFees: 50000,
                    pendingHomework: 2,
                    completedHomework: 45,
                    totalHomework: 47,
                    recentExams: [
                        { subject: 'Mathematics', marks: 92, grade: 'A+' },
                        { subject: 'Science', marks: 88, grade: 'A' },
                        { subject: 'English', marks: 85, grade: 'A' },
                    ],
                    recentAttendance: [
                        { date: '2024-12-23', status: 'Present' },
                        { date: '2024-12-24', status: 'Absent' },
                        { date: '2024-12-25', status: 'Holiday' },
                        { date: '2024-12-26', status: 'Present' },
                        { date: '2024-12-27', status: 'Present' },
                    ],
                    activities: [
                        { name: 'Science Club', role: 'Member' },
                        { name: 'Basketball Team', role: 'Captain' },
                    ],
                    status: 'excellent'
                },
                {
                    id: 2,
                    name: 'Michael Johnson',
                    class: 'Class 8-B',
                    section: 'B',
                    rollNo: '205',
                    admissionNo: 'SCH/2022/205',
                    dob: '2012-08-22',
                    gender: 'Male',
                    bloodGroup: 'A+',
                    attendance: 89.5,
                    avgGrade: 'B+',
                    avgPercentage: 78.2,
                    pendingFees: 5000,
                    totalFees: 45000,
                    paidFees: 40000,
                    pendingHomework: 4,
                    completedHomework: 38,
                    totalHomework: 42,
                    recentExams: [
                        { subject: 'Mathematics', marks: 75, grade: 'B' },
                        { subject: 'Science', marks: 82, grade: 'A-' },
                        { subject: 'English', marks: 78, grade: 'B+' },
                    ],
                    recentAttendance: [
                        { date: '2024-12-23', status: 'Present' },
                        { date: '2024-12-24', status: 'Present' },
                        { date: '2024-12-25', status: 'Holiday' },
                        { date: '2024-12-26', status: 'Late' },
                        { date: '2024-12-27', status: 'Present' },
                    ],
                    activities: [
                        { name: 'Drama Club', role: 'Member' },
                    ],
                    status: 'good'
                },
            ]);
            setLoading(false);
        }, 500);
    };

    const filteredChildren = children.filter(child =>
        child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        child.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        child.rollNo.includes(searchTerm)
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
            case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'average': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'poor': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getGradeColor = (grade: string) => {
        if (grade.startsWith('A')) return 'text-green-600 bg-green-50';
        if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
        if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50';
        if (grade.startsWith('D')) return 'text-orange-600 bg-orange-50';
        return 'text-red-600 bg-red-50';
    };

    const getAttendanceColor = (status: string) => {
        switch (status) {
            case 'Present': return 'text-green-600 bg-green-50';
            case 'Absent': return 'text-red-600 bg-red-50';
            case 'Late': return 'text-yellow-600 bg-yellow-50';
            case 'Holiday': return 'text-gray-600 bg-gray-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <DashboardLayout role="parent">
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="page-header flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Children</h1>
                        <p className="text-slate-600">View and manage your children's information</p>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name, class, or roll number..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Children Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredChildren.map((child) => (
                        <div key={child.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                                            {child.name.split(' ').map((n: string) => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                                            <p className="text-green-600 font-medium">{child.class}</p>
                                            <p className="text-sm text-gray-500">Roll No: {child.rollNo}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(child.status)}`}>
                                        {child.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 space-y-6">
                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Calendar className="w-4 h-4 text-blue-600" />
                                            <span className="text-xs font-medium text-blue-600">Attendance</span>
                                        </div>
                                        <p className="text-2xl font-bold text-blue-900">{child.attendance}%</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Award className="w-4 h-4 text-purple-600" />
                                            <span className="text-xs font-medium text-purple-600">Avg Grade</span>
                                        </div>
                                        <p className="text-2xl font-bold text-purple-900">{child.avgGrade}</p>
                                    </div>
                                </div>

                                {/* Academic Performance */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" />
                                        Recent Performance
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Average Percentage:</span>
                                            <span className="font-semibold text-gray-900">{child.avgPercentage}%</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Homework Completion:</span>
                                            <span className="font-semibold text-gray-900">
                                                {child.completedHomework}/{child.totalHomework}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Fee Status */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" />
                                        Fee Status
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Total Fees:</span>
                                            <span className="font-semibold text-gray-900">₹{child.totalFees.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Paid:</span>
                                            <span className="font-semibold text-green-600">₹{child.paidFees.toLocaleString()}</span>
                                        </div>
                                        {child.pendingFees > 0 && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Pending:</span>
                                                <span className="font-semibold text-red-600">₹{child.pendingFees.toLocaleString()}</span>
                                            </div>
                                        )}
                                    </div>
                                    {child.pendingFees > 0 && (
                                        <button className="mt-3 w-full px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium">
                                            Pay Pending Fees
                                        </button>
                                    )}
                                </div>

                                {/* Recent Attendance */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        Last 5 Days Attendance
                                    </h4>
                                    <div className="flex gap-2">
                                        {child.recentAttendance.map((att: any, idx: number) => (
                                            <div key={idx} className="flex-1 text-center">
                                                <div className={`text-xs font-medium px-2 py-1 rounded-lg ${getAttendanceColor(att.status)}`}>
                                                    {att.status.charAt(0)}
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(att.date).getDate()}/{new Date(att.date).getMonth() + 1}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedChild(child);
                                            setShowDetails(true);
                                        }}
                                        className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Details
                                    </button>
                                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium">
                                        Attendance
                                    </button>
                                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium">
                                        Results
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Child Details Modal */}
                {showDetails && selectedChild && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 border-b border-green-400">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-white">Student Details</h2>
                                    <button
                                        onClick={() => setShowDetails(false)}
                                        className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                {/* Personal Information */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <User className="w-5 h-5 text-green-600" />
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Full Name</p>
                                            <p className="font-semibold text-gray-900">{selectedChild.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Admission No</p>
                                            <p className="font-semibold text-gray-900">{selectedChild.admissionNo}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Class & Section</p>
                                            <p className="font-semibold text-gray-900">{selectedChild.class}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Roll Number</p>
                                            <p className="font-semibold text-gray-900">{selectedChild.rollNo}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
                                            <p className="font-semibold text-gray-900">{selectedChild.dob}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Gender</p>
                                            <p className="font-semibold text-gray-900">{selectedChild.gender}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Blood Group</p>
                                            <p className="font-semibold text-gray-900">{selectedChild.bloodGroup}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Status</p>
                                            <p className={`font-semibold capitalize ${
                                                selectedChild.status === 'excellent' ? 'text-green-600' : 
                                                selectedChild.status === 'good' ? 'text-blue-600' : 'text-gray-600'
                                            }`}>{selectedChild.status}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Academic Performance */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Award className="w-5 h-5 text-green-600" />
                                        Recent Exam Results
                                    </h3>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="text-left py-2 text-sm font-semibold text-gray-700">Subject</th>
                                                    <th className="text-center py-2 text-sm font-semibold text-gray-700">Marks</th>
                                                    <th className="text-center py-2 text-sm font-semibold text-gray-700">Grade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedChild.recentExams.map((exam: any, idx: number) => (
                                                    <tr key={idx} className="border-b border-gray-100 last:border-0">
                                                        <td className="py-3 text-gray-900">{exam.subject}</td>
                                                        <td className="py-3 text-center font-semibold text-gray-900">{exam.marks}/100</td>
                                                        <td className="py-3 text-center">
                                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(exam.grade)}`}>
                                                                {exam.grade}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Extracurricular Activities */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-green-600" />
                                        Extracurricular Activities
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {selectedChild.activities.map((activity: any, idx: number) => (
                                            <div key={idx} className="bg-green-50 border border-green-200 rounded-xl p-4">
                                                <p className="font-semibold text-gray-900">{activity.name}</p>
                                                <p className="text-sm text-green-600">{activity.role}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
