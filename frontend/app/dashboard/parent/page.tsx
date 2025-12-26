'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Users, Calendar, TrendingUp, DollarSign, Bell, AlertCircle, CheckCircle2, Clock, BookOpen, Award } from 'lucide-react';

export default function ParentDashboard() {
    const children = [
        {
            id: 1,
            name: 'Sarah Johnson',
            class: 'Class 10-A',
            rollNo: '101',
            attendance: 94.2,
            avgGrade: 'A',
            avgPercentage: 85.4,
            pendingFees: 0,
            pendingHomework: 2,
            recentGrade: 'A',
            status: 'excellent'
        },
        {
            id: 2,
            name: 'Michael Johnson',
            class: 'Class 8-B',
            rollNo: '205',
            attendance: 89.5,
            avgGrade: 'B+',
            avgPercentage: 78.2,
            pendingFees: 5000,
            pendingHomework: 4,
            recentGrade: 'B+',
            status: 'good'
        },
    ];

    const notifications = [
        {
            id: 1,
            type: 'urgent',
            category: 'attendance',
            message: 'Sarah was absent on Dec 24',
            child: 'Sarah Johnson',
            time: '1 day ago',
            icon: AlertCircle,
            action: 'View Details'
        },
        {
            id: 2,
            type: 'urgent',
            category: 'fee',
            message: 'Fee payment due for Michael',
            child: 'Michael Johnson',
            time: '2 days ago',
            icon: DollarSign,
            action: 'Pay Now'
        },
        {
            id: 3,
            type: 'info',
            category: 'result',
            message: 'Mid-term results published',
            child: 'Sarah Johnson',
            time: '3 days ago',
            icon: TrendingUp,
            action: 'View Results'
        },
        {
            id: 4,
            type: 'info',
            category: 'homework',
            message: 'New homework assigned',
            child: 'Michael Johnson',
            time: '5 days ago',
            icon: BookOpen,
            action: 'View Homework'
        },
    ];

    const upcomingEvents = [
        { id: 1, title: 'Parent-Teacher Meeting', date: 'Dec 28, 2024', time: '10:00 AM', type: 'meeting' },
        { id: 2, title: 'Annual Day Celebration', date: 'Jan 5, 2025', time: '2:00 PM', type: 'event' },
        { id: 3, title: 'Fee Payment Deadline', date: 'Jan 15, 2025', time: 'All Day', type: 'deadline' },
    ];

    return (
        <DashboardLayout role="parent">
            <div className="space-y-8 animate-fade-in">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, Mary! 👋</h1>
                        <p className="text-gray-600">Monitor your children's academic progress and activities</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors">
                            <Bell className="w-4 h-4 text-red-600" />
                            <span className="text-sm font-medium text-red-700">2 Urgent</span>
                        </button>
                    </div>
                </div>

                {/* Children Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {children.map((child, index) => (
                        <div
                            key={child.id}
                            className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-gray-200 transition-all duration-300 overflow-hidden"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-500 to-orange-500 opacity-5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>

                            <div className="relative">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                            {child.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                                            <p className="text-sm text-gray-600">{child.class} • Roll No: {child.rollNo}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${child.status === 'excellent' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {child.status === 'excellent' ? '⭐ Excellent' : '👍 Good'}
                                    </span>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="w-4 h-4 text-green-600" />
                                            <p className="text-xs font-medium text-green-700">Attendance</p>
                                        </div>
                                        <p className="text-2xl font-bold text-green-600">{child.attendance}%</p>
                                        <div className="w-full h-1.5 bg-green-100 rounded-full mt-2 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                                                style={{ width: `${child.attendance}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp className="w-4 h-4 text-blue-600" />
                                            <p className="text-xs font-medium text-blue-700">Avg Grade</p>
                                        </div>
                                        <p className="text-2xl font-bold text-blue-600">{child.avgGrade}</p>
                                        <p className="text-xs text-blue-600 mt-2">{child.avgPercentage}% overall</p>
                                    </div>

                                    <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="w-4 h-4 text-yellow-600" />
                                            <p className="text-xs font-medium text-yellow-700">Pending Work</p>
                                        </div>
                                        <p className="text-2xl font-bold text-yellow-600">{child.pendingHomework}</p>
                                        <p className="text-xs text-yellow-600 mt-2">Homework items</p>
                                    </div>

                                    <div className={`p-4 rounded-xl border ${child.pendingFees > 0 ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'
                                        }`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <DollarSign className={`w-4 h-4 ${child.pendingFees > 0 ? 'text-red-600' : 'text-green-600'}`} />
                                            <p className={`text-xs font-medium ${child.pendingFees > 0 ? 'text-red-700' : 'text-green-700'}`}>
                                                Fee Status
                                            </p>
                                        </div>
                                        <p className={`text-2xl font-bold ${child.pendingFees > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                            {child.pendingFees > 0 ? `₹${(child.pendingFees / 1000).toFixed(1)}K` : 'Paid'}
                                        </p>
                                        <p className={`text-xs mt-2 ${child.pendingFees > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                            {child.pendingFees > 0 ? 'Payment due' : 'All clear'}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-yellow-200 transition-all">
                                    View Full Report
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Notifications */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Recent Notifications</h2>
                            <button className="text-sm font-medium text-yellow-600 hover:text-yellow-700 transition-colors">
                                Mark All Read
                            </button>
                        </div>
                        <div className="space-y-3">
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all ${notif.type === 'urgent'
                                            ? 'bg-red-50 border-red-200 hover:border-red-300'
                                            : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className={`p-3 rounded-xl ${notif.type === 'urgent' ? 'bg-red-100' : 'bg-blue-100'
                                        }`}>
                                        <notif.icon className={`w-5 h-5 ${notif.type === 'urgent' ? 'text-red-600' : 'text-blue-600'
                                            }`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <div>
                                                <p className="font-bold text-gray-900 mb-1">{notif.message}</p>
                                                <p className="text-sm text-gray-600">{notif.child}</p>
                                            </div>
                                            {notif.type === 'urgent' && (
                                                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-lg whitespace-nowrap">
                                                    URGENT
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {notif.time}
                                            </span>
                                            <button className={`text-xs font-semibold ${notif.type === 'urgent' ? 'text-red-600 hover:text-red-700' : 'text-blue-600 hover:text-blue-700'
                                                } transition-colors`}>
                                                {notif.action} →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions & Events */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                            <div className="space-y-3">
                                {[
                                    { icon: DollarSign, label: 'Pay Fees', color: 'from-yellow-500 to-yellow-600' },
                                    { icon: Calendar, label: 'View Attendance', color: 'from-green-500 to-green-600' },
                                    { icon: TrendingUp, label: 'Check Results', color: 'from-blue-500 to-blue-600' },
                                    { icon: BookOpen, label: 'View Homework', color: 'from-purple-500 to-purple-600' },
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

                        {/* Upcoming Events */}
                        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
                            <h3 className="text-lg font-bold mb-4">Upcoming Events</h3>
                            <div className="space-y-3">
                                {upcomingEvents.map((event) => (
                                    <div key={event.id} className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                                        <p className="font-semibold text-sm mb-1">{event.title}</p>
                                        <p className="text-xs text-white/80">{event.date} • {event.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
