'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, BookOpen, TrendingUp, DollarSign, CheckCircle, Clock, Award, Target } from 'lucide-react';

export default function StudentDashboard() {
    const stats = [
        {
            name: 'Attendance',
            value: '94.2%',
            icon: Calendar,
            gradient: 'from-green-500 to-green-600',
            lightBg: 'bg-green-50',
            change: '+2.1% this month',
            status: 'excellent'
        },
        {
            name: 'Average Grade',
            value: 'A-',
            icon: TrendingUp,
            gradient: 'from-blue-500 to-blue-600',
            lightBg: 'bg-blue-50',
            change: '85.4% overall',
            status: 'good'
        },
        {
            name: 'Pending Work',
            value: '3',
            icon: Clock,
            gradient: 'from-yellow-500 to-yellow-600',
            lightBg: 'bg-yellow-50',
            change: '2 due this week',
            status: 'warning'
        },
        {
            name: 'Fee Status',
            value: 'Paid',
            icon: DollarSign,
            gradient: 'from-green-500 to-green-600',
            lightBg: 'bg-green-50',
            change: 'Next due: Jan 15',
            status: 'success'
        },
    ];

    const upcomingHomework = [
        {
            id: 1,
            subject: 'Mathematics',
            title: 'Chapter 5 Exercises',
            dueDate: 'Tomorrow',
            priority: 'high',
            progress: 60
        },
        {
            id: 2,
            subject: 'Science',
            title: 'Lab Report - Acids & Bases',
            dueDate: 'Dec 28',
            priority: 'medium',
            progress: 30
        },
        {
            id: 3,
            subject: 'English',
            title: 'Essay on Climate Change',
            dueDate: 'Dec 30',
            priority: 'low',
            progress: 0
        },
    ];

    const recentResults = [
        { id: 1, subject: 'Mathematics', exam: 'Mid-term Exam', marks: '85/100', grade: 'A', percentage: 85 },
        { id: 2, subject: 'Science', exam: 'Mid-term Exam', marks: '78/100', grade: 'B+', percentage: 78 },
        { id: 3, subject: 'English', exam: 'Mid-term Exam', marks: '92/100', grade: 'A+', percentage: 92 },
        { id: 4, subject: 'History', exam: 'Mid-term Exam', marks: '88/100', grade: 'A', percentage: 88 },
    ];

    const achievements = [
        { id: 1, title: 'Perfect Attendance', description: 'October 2024', icon: Award, color: 'from-yellow-500 to-yellow-600' },
        { id: 2, title: 'Top Performer', description: 'Mathematics', icon: Target, color: 'from-blue-500 to-blue-600' },
    ];

    return (
        <DashboardLayout role="student">
            <div className="space-y-8 animate-fade-in">
                {/* Welcome Section */}
                <div className="page-header">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Sarah! 👋</h1>
                            <p className="text-slate-600">Keep up the great work! You're doing amazing.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl shadow-sm">
                                <span className="text-sm font-semibold text-emerald-700">Class 10-A • Roll No: 15</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.name}
                            className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-gray-200 transition-all duration-300 overflow-hidden"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>

                            <div className="relative">
                                <div className={`p-3 ${stat.lightBg} rounded-xl inline-block mb-4`}>
                                    <stat.icon className="w-6 h-6 text-green-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                <p className="text-sm font-medium text-gray-600 mb-2">{stat.name}</p>
                                <p className="text-xs text-gray-500">{stat.change}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Achievements Banner */}
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2">🎉 Recent Achievements</h3>
                            <div className="flex items-center gap-6">
                                {achievements.map((achievement) => (
                                    <div key={achievement.id} className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                            <achievement.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">{achievement.title}</p>
                                            <p className="text-xs text-white/80">{achievement.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="px-6 py-3 bg-white text-yellow-600 font-semibold rounded-xl hover:bg-white/90 transition-colors">
                            View All
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Upcoming Homework */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Upcoming Homework</h2>
                            <button className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            {upcomingHomework.map((hw) => (
                                <div key={hw.id} className="p-5 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                                                <BookOpen className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{hw.title}</p>
                                                <p className="text-sm text-gray-600">{hw.subject}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${hw.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                    hw.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {hw.priority === 'high' ? 'High Priority' : hw.priority === 'medium' ? 'Medium' : 'Low'}
                                            </span>
                                            <span className="text-sm font-medium text-gray-600">Due: {hw.dueDate}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                                                style={{ width: `${hw.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">{hw.progress}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                        <div className="space-y-3">
                            {[
                                { icon: Calendar, label: 'View Attendance', color: 'from-green-500 to-green-600' },
                                { icon: BookOpen, label: 'My Homework', color: 'from-blue-500 to-blue-600' },
                                { icon: TrendingUp, label: 'View Results', color: 'from-purple-500 to-purple-600' },
                                { icon: DollarSign, label: 'Fee Status', color: 'from-yellow-500 to-yellow-600' },
                            ].map((action) => (
                                <button
                                    key={action.label}
                                    className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-transparent hover:shadow-lg transition-all group text-left"
                                >
                                    <div className={`p-2 bg-gradient-to-br ${action.color} rounded-lg group-hover:scale-110 transition-transform`}>
                                        <action.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-medium text-gray-900">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Results */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Exam Results</h2>
                        <button className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
                            View All Results
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {recentResults.map((result) => (
                            <div key={result.id} className="p-5 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="font-bold text-gray-900">{result.subject}</p>
                                    <span className={`px-3 py-1 rounded-lg text-sm font-bold ${result.grade.startsWith('A') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {result.grade}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{result.exam}</p>
                                <p className="text-2xl font-bold text-gray-900 mb-2">{result.marks}</p>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${result.percentage >= 90 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                                                result.percentage >= 75 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                                    'bg-gradient-to-r from-yellow-500 to-yellow-600'
                                            }`}
                                        style={{ width: `${result.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
