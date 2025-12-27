'use client';

import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import { Users, GraduationCap, Calendar, DollarSign, TrendingUp, TrendingDown, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        {
            name: 'Total Students',
            value: '1,234',
            change: '+12.5%',
            trend: 'up',
            icon: Users,
            gradient: 'from-blue-500 to-blue-600',
            lightBg: 'bg-blue-50',
            description: 'Active enrollments',
        },
        {
            name: 'Teaching Staff',
            value: '56',
            change: '+3.2%',
            trend: 'up',
            icon: GraduationCap,
            gradient: 'from-purple-500 to-purple-600',
            lightBg: 'bg-purple-50',
            description: 'Faculty members',
        },
        {
            name: 'Attendance Rate',
            value: '94.2%',
            change: '+2.1%',
            trend: 'up',
            icon: Calendar,
            gradient: 'from-green-500 to-green-600',
            lightBg: 'bg-green-50',
            description: 'This month',
        },
        {
            name: 'Fee Collection',
            value: '₹24.8L',
            change: '-5.3%',
            trend: 'down',
            icon: DollarSign,
            gradient: 'from-yellow-500 to-yellow-600',
            lightBg: 'bg-yellow-50',
            description: 'Pending: ₹2.4L',
        },
    ];

    const recentActivities = [
        { id: 1, type: 'success', action: 'New student registered', user: 'John Doe - Class 10A', time: '2 hours ago', icon: CheckCircle2 },
        { id: 2, type: 'success', action: 'Fee payment received', user: 'Jane Smith - ₹15,000', time: '3 hours ago', icon: DollarSign },
        { id: 3, type: 'info', action: 'Attendance marked', user: 'Mr. Johnson - Class 9B', time: '5 hours ago', icon: Calendar },
        { id: 4, type: 'warning', action: 'Low attendance alert', user: 'Class 8C - 78% today', time: '6 hours ago', icon: XCircle },
    ];

    const quickStats = [
        { label: 'Classes', value: '24', color: 'text-blue-600' },
        { label: 'Subjects', value: '18', color: 'text-purple-600' },
        { label: 'Active Today', value: '1,156', color: 'text-green-600' },
        { label: 'Absent', value: '78', color: 'text-red-600' },
    ];

    return (
        <DashboardLayout role="admin">
            <div className="space-y-8 animate-fade-in">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin 👋</h1>
                        <p className="text-gray-600">Here's what's happening with your school today</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-green-700">All Systems Operational</span>
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
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 ${stat.lightBg} rounded-xl`}>
                                        <stat.icon className={`w-6 h-6 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />
                                    </div>
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${stat.trend === 'up' ? 'bg-green-50' : 'bg-red-50'
                                        }`}>
                                        {stat.trend === 'up' ? (
                                            <TrendingUp className="w-3 h-3 text-green-600" />
                                        ) : (
                                            <TrendingDown className="w-3 h-3 text-red-600" />
                                        )}
                                        <span className={`text-xs font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {stat.change}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                                    <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                                    <p className="text-xs text-gray-500">{stat.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Stats Bar */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {quickStats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                                <p className="text-sm text-white/80">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activities */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                                    <div className={`p-2 rounded-lg ${activity.type === 'success' ? 'bg-green-100' :
                                        activity.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                                        }`}>
                                        <activity.icon className={`w-5 h-5 ${activity.type === 'success' ? 'text-green-600' :
                                            activity.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                                            }`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 mb-1">{activity.action}</p>
                                        <p className="text-sm text-gray-600 truncate">{activity.user}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Clock className="w-3 h-3" />
                                        {activity.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link
                                href="/dashboard/admin/students"
                                className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-transparent hover:shadow-lg transition-all group text-left"
                            >
                                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-medium text-gray-900 group-hover:text-gray-900">Manage Students</span>
                            </Link>
                            <Link
                                href="/dashboard/admin/teachers"
                                className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-transparent hover:shadow-lg transition-all group text-left"
                            >
                                <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                                    <GraduationCap className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-medium text-gray-900 group-hover:text-gray-900">Manage Teachers</span>
                            </Link>
                            <Link
                                href="/dashboard/admin/attendance"
                                className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-transparent hover:shadow-lg transition-all group text-left"
                            >
                                <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg group-hover:scale-110 transition-transform">
                                    <Calendar className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-medium text-gray-900 group-hover:text-gray-900">Mark Attendance</span>
                            </Link>
                            <Link
                                href="/dashboard/admin/fees"
                                className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-transparent hover:shadow-lg transition-all group text-left"
                            >
                                <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg group-hover:scale-110 transition-transform">
                                    <DollarSign className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-medium text-gray-900 group-hover:text-gray-900">Manage Fees</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
