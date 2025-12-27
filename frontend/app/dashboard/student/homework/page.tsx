'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
    BookOpen, Clock, CheckCircle2, AlertCircle, Upload, 
    Download, Filter, Search, Calendar, FileText, Link as LinkIcon
} from 'lucide-react';

export default function StudentHomeworkPage() {
    const [homework, setHomework] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [selectedHomework, setSelectedHomework] = useState<any>(null);

    useEffect(() => {
        fetchHomework();
    }, []);

    const fetchHomework = async () => {
        // Mock data - replace with actual API call
        setTimeout(() => {
            const mockData = [
                {
                    id: 1,
                    subject: 'Mathematics',
                    title: 'Chapter 5: Quadratic Equations - Exercise 5.1 to 5.3',
                    description: 'Solve all questions from Exercise 5.1, 5.2, and 5.3. Show all working steps.',
                    assignedBy: 'Mr. John Smith',
                    assignedDate: '2025-12-20',
                    dueDate: '2025-12-29',
                    status: 'Pending',
                    priority: 'high',
                    attachments: ['chapter5_notes.pdf'],
                    submittedDate: null,
                    grade: null,
                    feedback: null
                },
                {
                    id: 2,
                    subject: 'Science',
                    title: 'Lab Report: Chemical Reactions',
                    description: 'Write a detailed lab report on the acids and bases experiment conducted last week. Include observations, results, and conclusions.',
                    assignedBy: 'Ms. Sarah Johnson',
                    assignedDate: '2025-12-22',
                    dueDate: '2025-12-30',
                    status: 'Pending',
                    priority: 'medium',
                    attachments: ['lab_template.docx'],
                    submittedDate: null,
                    grade: null,
                    feedback: null
                },
                {
                    id: 3,
                    subject: 'English',
                    title: 'Essay: Impact of Technology on Society',
                    description: 'Write a 500-word essay on how technology has impacted modern society. Include both positive and negative aspects.',
                    assignedBy: 'Mrs. Emily Brown',
                    assignedDate: '2025-12-18',
                    dueDate: '2025-12-31',
                    status: 'In Progress',
                    priority: 'low',
                    attachments: [],
                    submittedDate: null,
                    grade: null,
                    feedback: null,
                    progress: 45
                },
                {
                    id: 4,
                    subject: 'Mathematics',
                    title: 'Chapter 4: Linear Equations - Practice Problems',
                    description: 'Complete all practice problems from the textbook.',
                    assignedBy: 'Mr. John Smith',
                    assignedDate: '2025-12-10',
                    dueDate: '2025-12-20',
                    status: 'Submitted',
                    priority: 'medium',
                    attachments: [],
                    submittedDate: '2025-12-19',
                    submittedFiles: ['homework_solution.pdf'],
                    grade: null,
                    feedback: null
                },
                {
                    id: 5,
                    subject: 'History',
                    title: 'Research Assignment: World War II',
                    description: 'Research and prepare a presentation on the causes and effects of World War II.',
                    assignedBy: 'Mr. David Wilson',
                    assignedDate: '2025-11-25',
                    dueDate: '2025-12-15',
                    status: 'Graded',
                    priority: 'high',
                    attachments: ['research_guide.pdf'],
                    submittedDate: '2025-12-14',
                    submittedFiles: ['wwii_presentation.pptx'],
                    grade: 'A',
                    marks: 92,
                    totalMarks: 100,
                    feedback: 'Excellent research and presentation. Well organized and informative.'
                },
                {
                    id: 6,
                    subject: 'Science',
                    title: 'Physics: Motion and Force Problems',
                    description: 'Solve problems 1-15 from Chapter 8.',
                    assignedBy: 'Ms. Sarah Johnson',
                    assignedDate: '2025-12-05',
                    dueDate: '2025-12-12',
                    status: 'Graded',
                    priority: 'medium',
                    attachments: [],
                    submittedDate: '2025-12-11',
                    submittedFiles: ['physics_solutions.pdf'],
                    grade: 'B+',
                    marks: 82,
                    totalMarks: 100,
                    feedback: 'Good work. Review question 8 - incorrect approach.'
                },
            ];
            setHomework(mockData);
            setLoading(false);
        }, 500);
    };

    const getFilteredHomework = () => {
        return homework.filter(hw => {
            const matchesStatus = filterStatus === 'all' || hw.status.toLowerCase() === filterStatus.toLowerCase();
            const matchesSearch = hw.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                hw.subject.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'text-red-600 bg-red-50 border-red-200';
            case 'In Progress': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'Submitted': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'Graded': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Pending': return <AlertCircle className="w-4 h-4" />;
            case 'In Progress': return <Clock className="w-4 h-4" />;
            case 'Submitted': return <CheckCircle2 className="w-4 h-4" />;
            case 'Graded': return <CheckCircle2 className="w-4 h-4" />;
            default: return null;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-50';
            case 'medium': return 'text-yellow-600 bg-yellow-50';
            case 'low': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getDaysRemaining = (dueDate: string) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getStats = () => {
        const pending = homework.filter(hw => hw.status === 'Pending').length;
        const inProgress = homework.filter(hw => hw.status === 'In Progress').length;
        const submitted = homework.filter(hw => hw.status === 'Submitted').length;
        const graded = homework.filter(hw => hw.status === 'Graded').length;
        const avgGrade = homework.filter(hw => hw.marks).reduce((sum, hw) => sum + (hw.marks / hw.totalMarks * 100), 0) / homework.filter(hw => hw.marks).length || 0;

        return { pending, inProgress, submitted, graded, avgGrade: avgGrade.toFixed(1) };
    };

    const handleSubmit = (hw: any) => {
        setSelectedHomework(hw);
        setShowSubmitModal(true);
    };

    const submitHomework = () => {
        // Submit homework logic here
        alert('Homework submitted successfully!');
        setShowSubmitModal(false);
        fetchHomework();
    };

    const stats = getStats();
    const filteredHomework = getFilteredHomework();

    return (
        <DashboardLayout role="student">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Homework</h1>
                        <p className="text-gray-600">Track and submit your assignments</p>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="w-6 h-6 text-gray-400" />
                            <span className="text-xs font-medium text-gray-600">Total</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{homework.length}</p>
                        <p className="text-xs text-gray-500 mt-1">Assignments</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-6 h-6 text-red-500" />
                            <span className="text-xs font-medium text-gray-600">Pending</span>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{stats.pending}</p>
                        <p className="text-xs text-gray-500 mt-1">To Start</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-6 h-6 text-yellow-500" />
                            <span className="text-xs font-medium text-gray-600">In Progress</span>
                        </div>
                        <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
                        <p className="text-xs text-gray-500 mt-1">Working On</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-6 h-6 text-blue-500" />
                            <span className="text-xs font-medium text-gray-600">Submitted</span>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">{stats.submitted}</p>
                        <p className="text-xs text-gray-500 mt-1">Awaiting Review</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-6 h-6" />
                            <span className="text-xs font-medium opacity-90">Avg Score</span>
                        </div>
                        <p className="text-3xl font-bold">{stats.avgGrade}%</p>
                        <p className="text-xs opacity-80 mt-1">Graded Work</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search homework..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in progress">In Progress</option>
                                <option value="submitted">Submitted</option>
                                <option value="graded">Graded</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Homework List */}
                <div className="space-y-4">
                    {filteredHomework.map((hw) => {
                        const daysRemaining = getDaysRemaining(hw.dueDate);
                        const isOverdue = daysRemaining < 0 && hw.status !== 'Submitted' && hw.status !== 'Graded';
                        const isDueSoon = daysRemaining >= 0 && daysRemaining <= 2 && hw.status !== 'Submitted' && hw.status !== 'Graded';

                        return (
                            <div key={hw.id} className={`bg-white rounded-2xl shadow-sm border ${isOverdue ? 'border-red-300' : isDueSoon ? 'border-yellow-300' : 'border-gray-100'} overflow-hidden`}>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                                                    {hw.subject}
                                                </span>
                                                <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getPriorityColor(hw.priority)}`}>
                                                    {hw.priority.toUpperCase()}
                                                </span>
                                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(hw.status)}`}>
                                                    {getStatusIcon(hw.status)}
                                                    {hw.status}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{hw.title}</h3>
                                            <p className="text-sm text-gray-600 mb-3">{hw.description}</p>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>Assigned: {new Date(hw.assignedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                                </div>
                                                <div className={`flex items-center gap-2 ${isOverdue ? 'text-red-600 font-semibold' : isDueSoon ? 'text-yellow-600 font-semibold' : 'text-gray-600'}`}>
                                                    <Clock className="w-4 h-4" />
                                                    <span>
                                                        Due: {new Date(hw.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                        {isOverdue && ' (OVERDUE)'}
                                                        {isDueSoon && ` (${daysRemaining} day${daysRemaining !== 1 ? 's' : ''})`}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <FileText className="w-4 h-4" />
                                                    <span>By: {hw.assignedBy}</span>
                                                </div>
                                            </div>

                                            {hw.attachments && hw.attachments.length > 0 && (
                                                <div className="mt-3 flex items-center gap-2">
                                                    <LinkIcon className="w-4 h-4 text-gray-400" />
                                                    <span className="text-xs text-gray-500">Attachments:</span>
                                                    {hw.attachments.map((file: string, idx: number) => (
                                                        <a key={idx} href="#" className="text-xs text-blue-600 hover:underline">{file}</a>
                                                    ))}
                                                </div>
                                            )}

                                            {hw.status === 'In Progress' && hw.progress && (
                                                <div className="mt-3">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs text-gray-600">Progress</span>
                                                        <span className="text-xs font-semibold text-blue-600">{hw.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${hw.progress}%` }}></div>
                                                    </div>
                                                </div>
                                            )}

                                            {hw.status === 'Graded' && (
                                                <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-semibold text-green-900">Grade: {hw.grade}</span>
                                                        <span className="text-sm font-semibold text-green-900">{hw.marks}/{hw.totalMarks} ({(hw.marks/hw.totalMarks*100).toFixed(1)}%)</span>
                                                    </div>
                                                    <p className="text-sm text-green-800"><strong>Feedback:</strong> {hw.feedback}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 mt-4">
                                        {(hw.status === 'Pending' || hw.status === 'In Progress') && (
                                            <>
                                                <button
                                                    onClick={() => handleSubmit(hw)}
                                                    className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                                                >
                                                    <Upload className="w-4 h-4" />
                                                    Submit Work
                                                </button>
                                                <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                                                    Mark In Progress
                                                </button>
                                            </>
                                        )}
                                        {hw.status === 'Submitted' && (
                                            <span className="text-sm text-gray-600 italic">Submitted on {new Date(hw.submittedDate).toLocaleDateString()} - Awaiting grade</span>
                                        )}
                                        {hw.status === 'Graded' && hw.submittedFiles && (
                                            <button className="px-6 py-2 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors font-medium flex items-center gap-2">
                                                <Download className="w-4 h-4" />
                                                Download Submission
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Submit Modal */}
                {showSubmitModal && selectedHomework && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 border-b border-blue-400 rounded-t-2xl">
                                <h2 className="text-xl font-bold text-white">Submit Homework</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Subject:</p>
                                    <p className="font-semibold text-gray-900">{selectedHomework.subject}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Title:</p>
                                    <p className="font-semibold text-gray-900">{selectedHomework.title}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Your Work</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, or images</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Comments (Optional)</label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Add any comments for your teacher..."
                                    ></textarea>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowSubmitModal(false)}
                                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={submitHomework}
                                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {filteredHomework.length === 0 && !loading && (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No homework found</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
