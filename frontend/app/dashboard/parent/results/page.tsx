'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
    Award, TrendingUp, TrendingDown, Filter, Search, Download, 
    Eye, BarChart3, User, Calendar, BookOpen, ChevronDown
} from 'lucide-react';

export default function ParentResultsPage() {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedChild, setSelectedChild] = useState('all');
    const [selectedExam, setSelectedExam] = useState('all');
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [showComparison, setShowComparison] = useState(false);

    const children = [
        { id: 1, name: 'Sarah Johnson', class: 'Class 10-A' },
        { id: 2, name: 'Michael Johnson', class: 'Class 8-B' },
    ];

    const examTypes = ['Mid-Term', 'Final', 'Unit Test', 'Monthly Test'];
    const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'];

    useEffect(() => {
        fetchResults();
    }, [selectedChild, selectedExam, selectedSubject]);

    const fetchResults = async () => {
        // Mock data - replace with actual API call
        setTimeout(() => {
            const mockResults = generateMockResults();
            setResults(mockResults);
            setLoading(false);
        }, 500);
    };

    const generateMockResults = () => {
        const data: any[] = [];
        const childrenToShow = selectedChild === 'all' ? children : children.filter(c => c.id.toString() === selectedChild);

        childrenToShow.forEach(child => {
            examTypes.forEach((examType, examIdx) => {
                subjects.forEach((subject, subIdx) => {
                    // Skip some results for variety
                    if (Math.random() > 0.85) return;

                    const baseMarks = child.id === 1 ? 80 : 70;
                    const marks = Math.floor(baseMarks + Math.random() * 20);
                    const totalMarks = 100;
                    const percentage = (marks / totalMarks * 100).toFixed(1);
                    
                    let grade = 'F';
                    if (marks >= 90) grade = 'A+';
                    else if (marks >= 80) grade = 'A';
                    else if (marks >= 70) grade = 'B+';
                    else if (marks >= 60) grade = 'B';
                    else if (marks >= 50) grade = 'C';
                    else if (marks >= 40) grade = 'D';

                    data.push({
                        id: `${child.id}-${examIdx}-${subIdx}`,
                        childId: child.id,
                        childName: child.name,
                        class: child.class,
                        examType,
                        subject,
                        marks,
                        totalMarks,
                        percentage: parseFloat(percentage),
                        grade,
                        date: new Date(2024, 11 - examIdx, 15).toISOString().split('T')[0],
                        classAverage: marks - 5 + Math.random() * 10,
                        rank: Math.floor(Math.random() * 40) + 1,
                        totalStudents: 40,
                        remarks: marks >= 80 ? 'Excellent Performance' : marks >= 60 ? 'Good Work' : 'Needs Improvement'
                    });
                });
            });
        });

        return data.filter(r => {
            if (selectedExam !== 'all' && r.examType !== selectedExam) return false;
            if (selectedSubject !== 'all' && r.subject !== selectedSubject) return false;
            return true;
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };

    const getChildStats = (childId: number) => {
        const childResults = results.filter(r => r.childId === childId);
        if (childResults.length === 0) return null;

        const totalMarks = childResults.reduce((sum, r) => sum + r.marks, 0);
        const totalPossible = childResults.reduce((sum, r) => sum + r.totalMarks, 0);
        const avgPercentage = (totalMarks / totalPossible * 100).toFixed(1);
        
        const grades = childResults.map(r => r.grade);
        const gradeCount: any = {};
        grades.forEach(g => gradeCount[g] = (gradeCount[g] || 0) + 1);
        const mostFrequentGrade = Object.keys(gradeCount).reduce((a, b) => gradeCount[a] > gradeCount[b] ? a : b);

        const avgRank = (childResults.reduce((sum, r) => sum + r.rank, 0) / childResults.length).toFixed(1);

        return {
            totalExams: childResults.length,
            avgPercentage: parseFloat(avgPercentage),
            avgGrade: mostFrequentGrade,
            avgRank,
            totalStudents: childResults[0]?.totalStudents || 0,
            highestMarks: Math.max(...childResults.map(r => r.marks)),
            lowestMarks: Math.min(...childResults.map(r => r.marks))
        };
    };

    const getGradeColor = (grade: string) => {
        if (grade.startsWith('A')) return 'text-green-600 bg-green-50 border-green-200';
        if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50 border-blue-200';
        if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        if (grade.startsWith('D')) return 'text-orange-600 bg-orange-50 border-orange-200';
        return 'text-red-600 bg-red-50 border-red-200';
    };

    const getPerformanceTrend = (childId: number, subject: string) => {
        const subjectResults = results
            .filter(r => r.childId === childId && r.subject === subject)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        if (subjectResults.length < 2) return 'stable';

        const latest = subjectResults[subjectResults.length - 1].percentage;
        const previous = subjectResults[subjectResults.length - 2].percentage;

        if (latest > previous + 5) return 'improving';
        if (latest < previous - 5) return 'declining';
        return 'stable';
    };

    return (
        <DashboardLayout role="parent">
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="page-header flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Exam Results</h1>
                        <p className="text-slate-600">Track your children's academic performance</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowComparison(!showComparison)}
                            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-sm"
                        >
                            <BarChart3 className="w-5 h-5" />
                            {showComparison ? 'Hide' : 'Show'} Comparison
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-sm">
                            <Download className="w-5 h-5" />
                            Export
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Child</label>
                            <select
                                value={selectedChild}
                                onChange={(e) => setSelectedChild(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="all">All Children</option>
                                {children.map(child => (
                                    <option key={child.id} value={child.id}>{child.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
                            <select
                                value={selectedExam}
                                onChange={(e) => setSelectedExam(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="all">All Exams</option>
                                {examTypes.map(exam => (
                                    <option key={exam} value={exam}>{exam}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="all">All Subjects</option>
                                {subjects.map(subject => (
                                    <option key={subject} value={subject}>{subject}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                {children.map(child => {
                    if (selectedChild !== 'all' && selectedChild !== child.id.toString()) return null;
                    
                    const stats = getChildStats(child.id);
                    if (!stats) return null;

                    return (
                        <div key={child.id} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-sm border border-green-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                                    <p className="text-sm text-gray-600">{child.class}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-green-600">{stats.avgPercentage}%</p>
                                    <p className="text-sm text-gray-600">Average Score</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div className="bg-white rounded-xl p-4 text-center">
                                    <BookOpen className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalExams}</p>
                                    <p className="text-xs text-gray-600 mt-1">Total Exams</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 text-center">
                                    <Award className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-green-600">{stats.avgGrade}</p>
                                    <p className="text-xs text-gray-600 mt-1">Avg Grade</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 text-center">
                                    <TrendingUp className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-purple-600">{stats.avgRank}</p>
                                    <p className="text-xs text-gray-600 mt-1">Avg Rank</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 text-center">
                                    <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-blue-600">{stats.highestMarks}</p>
                                    <p className="text-xs text-gray-600 mt-1">Highest</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 text-center">
                                    <TrendingDown className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-orange-600">{stats.lowestMarks}</p>
                                    <p className="text-xs text-gray-600 mt-1">Lowest</p>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Results Table */}
                {children.map(child => {
                    if (selectedChild !== 'all' && selectedChild !== child.id.toString()) return null;
                    
                    const childResults = results.filter(r => r.childId === child.id);
                    if (childResults.length === 0) return null;

                    return (
                        <div key={child.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                                <h3 className="text-lg font-bold text-gray-900">{child.name} - Detailed Results</h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Exam</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Subject</th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Marks</th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Percentage</th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Grade</th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Rank</th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Trend</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {childResults.map((result) => {
                                            const trend = getPerformanceTrend(result.childId, result.subject);
                                            return (
                                                <tr key={result.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {new Date(result.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {result.examType}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {result.subject}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold text-gray-900">
                                                        {result.marks}/{result.totalMarks}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold text-gray-900">
                                                        {result.percentage}%
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold border ${getGradeColor(result.grade)}`}>
                                                            {result.grade}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                                                        {result.rank}/{result.totalStudents}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        {trend === 'improving' && (
                                                            <TrendingUp className="w-5 h-5 text-green-600 mx-auto" />
                                                        )}
                                                        {trend === 'declining' && (
                                                            <TrendingDown className="w-5 h-5 text-red-600 mx-auto" />
                                                        )}
                                                        {trend === 'stable' && (
                                                            <div className="w-5 h-0.5 bg-gray-400 mx-auto"></div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {result.remarks}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}

                {/* Comparison Chart */}
                {showComparison && selectedChild === 'all' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Comparison</h3>
                        <div className="space-y-6">
                            {subjects.map(subject => {
                                const subjectData = children.map(child => {
                                    const childSubjectResults = results.filter(r => 
                                        r.childId === child.id && r.subject === subject
                                    );
                                    if (childSubjectResults.length === 0) return null;
                                    
                                    const avg = childSubjectResults.reduce((sum, r) => sum + r.percentage, 0) / childSubjectResults.length;
                                    return {
                                        child,
                                        avg: avg.toFixed(1)
                                    };
                                }).filter(Boolean);

                                if (subjectData.length === 0) return null;

                                return (
                                    <div key={subject}>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-3">{subject}</h4>
                                        <div className="space-y-3">
                                            {subjectData.map((data: any) => (
                                                <div key={data.child.id} className="flex items-center gap-4">
                                                    <div className="w-32 text-sm font-medium text-gray-700">
                                                        {data.child.name.split(' ')[0]}
                                                    </div>
                                                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                                                        <div
                                                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full flex items-center justify-end pr-3 transition-all"
                                                            style={{ width: `${data.avg}%` }}
                                                        >
                                                            <span className="text-white text-sm font-bold">{data.avg}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {results.length === 0 && !loading && (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No results found for the selected filters</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
