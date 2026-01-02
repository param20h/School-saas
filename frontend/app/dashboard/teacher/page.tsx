'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { BookOpen, Users, Calendar, CheckCircle, Clock, TrendingUp, Bell, FileText } from 'lucide-react';

export default function TeacherDashboard() {
    const stats = [
        {
            name: 'My Classes',
            value: '5',
            icon: BookOpen,
            gradient: 'from-purple-500 to-purple-600',
            lightBg: 'bg-purple-50',
            change: '+1 this term'
        },
        {
            name: 'Total Students',
            value: '142',
            icon: Users,
            gradient: 'from-blue-500 to-blue-600',
            lightBg: 'bg-blue-50',
            change: 'Across all classes'
        },
        {
            name: "Today's Classes",
            value: '3',
            icon: Calendar,
            gradient: 'from-green-500 to-green-600',
            lightBg: 'bg-green-50',
            change: '1 completed, 2 pending'
        },
        {
            name: 'Pending Tasks',
            value: '8',
            icon: Clock,
            gradient: 'from-yellow-500 to-yellow-600',
            lightBg: 'bg-yellow-50',
            change: 'Homework to review'
        },
    ];

    const todayClasses = [
        {
            id: 1,
            class: 'Class 10-A',
            subject: 'Mathematics',
            time: '9:00 AM - 10:00 AM',
            status: 'completed',
            students: 35,
            attendance: 33
        },
        {
            id: 2,
            class: 'Class 9-B',
            subject: 'Mathematics',
            time: '11:00 AM - 12:00 PM',
            status: 'ongoing',
            students: 32,
            attendance: 30
        },
        {
            id: 3,
            class: 'Class 10-B',
            subject: 'Mathematics',
            time: '2:00 PM - 3:00 PM',
            status: 'upcoming',
            students: 38,
            attendance: null
        },
    ];

    const recentSubmissions = [
        { id: 1, student: 'John Doe', assignment: 'Chapter 5 Exercises', subject: 'Math', time: '2 hours ago', grade: 'A' },
        { id: 2, student: 'Jane Smith', assignment: 'Algebra Problems', subject: 'Math', time: '5 hours ago', grade: 'B+' },
        { id: 3, student: 'Mike Johnson', assignment: 'Geometry Quiz', subject: 'Math', time: '1 day ago', grade: 'A-' },
    ];

    return (
        <DashboardLayout role="teacher">
            <div className="space-y-8 animate-fade-in">
                {/* Welcome Section */}
                <div className="page-header">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Good morning, Teacher 👋</h1>
                            <p className="text-slate-600">You have 3 classes scheduled for today</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-all shadow-sm hover:shadow-md active:scale-[0.98]">
                                <Bell className="w-4 h-4 text-purple-600" />
                                <span className="text-sm font-semibold text-purple-700">3 Notifications</span>
                            </button>
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
                                    <stat.icon className="w-6 h-6 text-purple-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                <p className="text-sm font-medium text-gray-600 mb-2">{stat.name}</p>
                                <p className="text-xs text-gray-500">{stat.change}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Today's Schedule */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
                        <button className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
                            View Full Schedule
                        </button>
                    </div>
                    <div className="space-y-4">
                        {todayClasses.map((cls) => (
                            <div
                                key={cls.id}
                                className="flex items-center justify-between p-5 rounded-xl border-2 border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all group"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`p-3 rounded-xl ${cls.status === 'completed' ? 'bg-green-100' :
                                            cls.status === 'ongoing' ? 'bg-blue-100' : 'bg-gray-100'
                                        }`}>
                                        <BookOpen className={`w-6 h-6 ${cls.status === 'completed' ? 'text-green-600' :
                                                cls.status === 'ongoing' ? 'text-blue-600' : 'text-gray-600'
                                            }`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <p className="font-bold text-gray-900">{cls.class}</p>
                                            <span className="text-sm text-gray-500">•</span>
                                            <p className="text-sm font-medium text-gray-600">{cls.subject}</p>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {cls.time}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                {cls.attendance ? `${cls.attendance}/${cls.students}` : `${cls.students} students`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${cls.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            cls.status === 'ongoing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                                    </span>
                                    {cls.status !== 'completed' && (
                                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                                            {cls.status === 'ongoing' ? 'Mark Attendance' : 'Start Class'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Submissions */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Recent Submissions</h2>
                            <button className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            {recentSubmissions.map((submission) => (
                                <div key={submission.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {submission.student.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{submission.student}</p>
                                            <p className="text-sm text-gray-600">{submission.assignment}</p>
                                            <p className="text-xs text-gray-500">{submission.time}</p>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-lg font-semibold ${submission.grade.startsWith('A') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {submission.grade}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Calendar, label: 'Mark Attendance', color: 'from-purple-500 to-purple-600' },
                                { icon: FileText, label: 'Assign Homework', color: 'from-blue-500 to-blue-600' },
                                { icon: CheckCircle, label: 'Enter Results', color: 'from-green-500 to-green-600' },
                                { icon: TrendingUp, label: 'View Analytics', color: 'from-yellow-500 to-yellow-600' },
                            ].map((action) => (
                                <button
                                    key={action.label}
                                    className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-gray-100 hover:border-transparent hover:shadow-lg transition-all group"
                                >
                                    <div className={`p-4 bg-gradient-to-br ${action.color} rounded-xl group-hover:scale-110 transition-transform`}>
                                        <action.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 text-center">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
