'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
    Award, TrendingUp, TrendingDown, BarChart3, Download, 
    Filter, Search, Calendar, BookOpen, Target, Eye
} from 'lucide-react';

export default function StudentResultsPage() {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedExam, setSelectedExam] = useState('all');
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [showComparison, setShowComparison] = useState(false);

    const examTypes = ['Mid-Term', 'Final', 'Unit Test', 'Monthly Test'];
    const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'];

    useEffect(() => {
        fetchResults();
    }, [selectedExam, selectedSubject]);

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

        examTypes.forEach((examType, examIdx) => {
            subjects.forEach((subject, subIdx) => {
                // Skip some results for variety
                if (Math.random() > 0.85) return;

                const marks = Math.floor(70 + Math.random() * 30);
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
                    id: `${examIdx}-${subIdx}`,
                    examType,
                    subject,
                    marks,
                    totalMarks,
                    percentage: parseFloat(percentage),
                    grade,
                    date: new Date(2025, 11 - examIdx, 15).toISOString().split('T')[0],
                    classAverage: marks - 5 + Math.random() * 10,
                    highestInClass: Math.min(100, marks + Math.random() * 15),
                    lowestInClass: Math.max(30, marks - Math.random() * 30),
                    rank: Math.floor(Math.random() * 40) + 1,
                    totalStudents: 40,
                    teacherRemarks: marks >= 80 ? 'Excellent work! Keep it up.' : marks >= 60 ? 'Good effort. Can improve further.' : 'Needs more practice.',
                    strengths: marks >= 75 ? ['Problem solving', 'Conceptual understanding'] : ['Basic concepts'],
                    improvements: marks < 75 ? ['Time management', 'Practice more problems'] : []
                });
            });
        });

        return data.filter(r => {
            if (selectedExam !== 'all' && r.examType !== selectedExam) return false;
            if (selectedSubject !== 'all' && r.subject !== selectedSubject) return false;
            return true;
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };

    const getOverallStats = () => {
        if (results.length === 0) return null;

        const totalMarks = results.reduce((sum, r) => sum + r.marks, 0);
        const totalPossible = results.reduce((sum, r) => sum + r.totalMarks, 0);
        const avgPercentage = (totalMarks / totalPossible * 100).toFixed(1);
        
        const grades = results.map(r => r.grade);
        const gradeCount: any = {};
        grades.forEach(g => gradeCount[g] = (gradeCount[g] || 0) + 1);
        const mostFrequentGrade = Object.keys(gradeCount).reduce((a, b) => gradeCount[a] > gradeCount[b] ? a : b);

        const avgRank = (results.reduce((sum, r) => sum + r.rank, 0) / results.length).toFixed(1);
        const highestMarks = Math.max(...results.map(r => r.marks));
        const lowestMarks = Math.min(...results.map(r => r.marks));

        return {
            totalExams: results.length,
            avgPercentage: parseFloat(avgPercentage),
            avgGrade: mostFrequentGrade,
            avgRank,
            totalStudents: results[0]?.totalStudents || 0,
            highestMarks,
            lowestMarks
        };
    };

    const getSubjectStats = () => {
        const subjectData: any = {};
        
        results.forEach(r => {
            if (!subjectData[r.subject]) {
                subjectData[r.subject] = {
                    subject: r.subject,
                    totalMarks: 0,
                    totalPossible: 0,
                    count: 0,
                    grades: []
                };
            }
            subjectData[r.subject].totalMarks += r.marks;
            subjectData[r.subject].totalPossible += r.totalMarks;
            subjectData[r.subject].count += 1;
            subjectData[r.subject].grades.push(r.grade);
        });

        return Object.values(subjectData).map((data: any) => ({
            ...data,
            avgPercentage: ((data.totalMarks / data.totalPossible) * 100).toFixed(1),
            avgGrade: data.grades[0] // Simplified - could calculate mode
        }));
    };

    const getGradeColor = (grade: string) => {
        if (grade.startsWith('A')) return 'text-green-600 bg-green-50 border-green-200';
        if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50 border-blue-200';
        if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        if (grade.startsWith('D')) return 'text-orange-600 bg-orange-50 border-orange-200';
        return 'text-red-600 bg-red-50 border-red-200';
    };

    const getPerformanceTrend = (subject: string) => {
        const subjectResults = results
            .filter(r => r.subject === subject)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        if (subjectResults.length < 2) return 'stable';

        const latest = subjectResults[subjectResults.length - 1].percentage;
        const previous = subjectResults[subjectResults.length - 2].percentage;

        if (latest > previous + 5) return 'improving';
        if (latest < previous - 5) return 'declining';
        return 'stable';
    };

    const stats = getOverallStats();
    const subjectStats = getSubjectStats();

    return (
        <DashboardLayout role="student">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Results</h1>
                        <p className="text-gray-600">Track your academic performance</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowComparison(!showComparison)}
                            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-sm"
                        >
                            <BarChart3 className="w-5 h-5" />
                            {showComparison ? 'Hide' : 'Show'} Chart
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                            <Download className="w-5 h-5" />
                            Export
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
                            <select
                                value={selectedExam}
                                onChange={(e) => setSelectedExam(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Subjects</option>
                                {subjects.map(subject => (
                                    <option key={subject} value={subject}>{subject}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Overall Statistics */}
                {stats && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Overall Performance</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div className="bg-white rounded-xl p-4 text-center">
                                <BookOpen className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-gray-900">{stats.totalExams}</p>
                                <p className="text-xs text-gray-600 mt-1">Total Exams</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 text-center">
                                <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-blue-600">{stats.avgPercentage}%</p>
                                <p className="text-xs text-gray-600 mt-1">Avg Score</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 text-center">
                                <Award className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-green-600">{stats.avgGrade}</p>
                                <p className="text-xs text-gray-600 mt-1">Avg Grade</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 text-center">
                                <Target className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-purple-600">{stats.avgRank}</p>
                                <p className="text-xs text-gray-600 mt-1">Avg Rank</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 text-center">
                                <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-green-600">{stats.highestMarks}</p>
                                <p className="text-xs text-gray-600 mt-1">Best Score</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Subject-wise Performance */}
                {showComparison && subjectStats.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Subject-wise Performance</h3>
                        <div className="space-y-4">
                            {subjectStats.map((data: any) => {
                                const trend = getPerformanceTrend(data.subject);
                                return (
                                    <div key={data.subject}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-semibold text-gray-900 w-32">{data.subject}</span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getGradeColor(data.avgGrade)}`}>
                                                    {data.avgGrade}
                                                </span>
                                                {trend === 'improving' && (
                                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                                )}
                                                {trend === 'declining' && (
                                                    <TrendingDown className="w-4 h-4 text-red-600" />
                                                )}
                                            </div>
                                            <span className="text-sm font-bold text-blue-600">{data.avgPercentage}%</span>
                                        </div>
                                        <div className="relative">
                                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                                <div
                                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all"
                                                    style={{ width: `${data.avgPercentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Detailed Results */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
                        <h3 className="text-lg font-bold text-gray-900">Detailed Results</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Exam</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Subject</th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Marks</th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Grade</th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Class Avg</th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Rank</th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {results.map((result) => {
                                    return (
                                        <tr key={result.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {new Date(result.date).toLocaleDateString('en-US', { 
                                                    month: 'short', 
                                                    day: 'numeric', 
                                                    year: 'numeric' 
                                                })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {result.examType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {result.subject}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                <div className="font-bold text-gray-900">{result.marks}/{result.totalMarks}</div>
                                                <div className="text-xs text-gray-500">{result.percentage}%</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold border ${getGradeColor(result.grade)}`}>
                                                    {result.grade}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                                                {result.classAverage.toFixed(1)}%
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold text-gray-900">
                                                {result.rank}/{result.totalStudents}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-xs font-medium flex items-center gap-1 mx-auto">
                                                    <Eye className="w-3 h-3" />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

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
