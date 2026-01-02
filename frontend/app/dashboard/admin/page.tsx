'use client';

import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import { Users, GraduationCap, Calendar, DollarSign, TrendingUp, TrendingDown, Clock, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        {
            name: 'Total Students',
            value: '1,234',
            change: '+12.5%',
            trend: 'up',
            icon: Users,
            description: 'Active enrollments',
        },
        {
            name: 'Teaching Staff',
            value: '56',
            change: '+3.2%',
            trend: 'up',
            icon: GraduationCap,
            description: 'Faculty members',
        },
        {
            name: 'Attendance Rate',
            value: '94.2%',
            change: '+2.1%',
            trend: 'up',
            icon: Calendar,
            description: 'This month',
        },
        {
            name: 'Fee Collection',
            value: '₹24.8L',
            change: '-5.3%',
            trend: 'down',
            icon: DollarSign,
            description: 'Pending: ₹2.4L',
        },
    ];

    const recentActivities = [
        { id: 1, type: 'success', action: 'New student registered', user: 'John Doe - Class 10A', time: '2 hours ago' },
        { id: 2, type: 'success', action: 'Fee payment received', user: 'Jane Smith - ₹15,000', time: '3 hours ago' },
        { id: 3, type: 'info', action: 'Attendance marked', user: 'Mr. Johnson - Class 9B', time: '5 hours ago' },
        { id: 4, type: 'warning', action: 'Low attendance alert', user: 'Class 8C - 78% today', time: '6 hours ago' },
    ];

    return (
        <DashboardLayout role="admin">
            <div className="space-y-8 animate-fade-in">
                {/* Header */}
                <div className="page-header">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
                    <p className="text-slate-600">Welcome back! Here's what's happening today</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div
                            key={stat.name}
                            className="stat-card hover:-translate-y-1"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-slate-50 rounded-xl">
                                    <stat.icon className="w-5 h-5 text-slate-700" />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-semibold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {stat.trend === 'up' ? (
                                        <TrendingUp className="w-4 h-4" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4" />
                                    )}
                                    {stat.change}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-slate-600 mb-2">{stat.name}</p>
                                <p className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</p>
                                <p className="text-xs text-slate-500">{stat.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Stats Bar */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-3xl font-bold mb-1">24</p>
                            <p className="text-sm text-slate-300">Classes</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold mb-1">18</p>
                            <p className="text-sm text-slate-300">Subjects</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold mb-1">1,156</p>
                            <p className="text-sm text-slate-300">Active Today</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold mb-1">78</p>
                            <p className="text-sm text-slate-300">Absent</p>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activities */}
                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
                            <button className="text-sm font-medium text-slate-900 hover:text-slate-700">
                                View All
                            </button>
                        </div>
                        <div className="space-y-3">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-4 p-3.5 rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className={`p-2 rounded-lg ${
                                        activity.type === 'success' ? 'bg-emerald-100' :
                                        activity.type === 'warning' ? 'bg-amber-100' : 'bg-blue-100'
                                    }`}>
                                        {activity.type === 'success' ? (
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        ) : activity.type === 'warning' ? (
                                            <AlertCircle className="w-4 h-4 text-amber-600" />
                                        ) : (
                                            <Clock className="w-4 h-4 text-blue-600" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-900 mb-0.5">{activity.action}</p>
                                        <p className="text-xs text-slate-600">{activity.user}</p>
                                    </div>
                                    <span className="text-xs text-slate-500">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-6">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link
                                href="/dashboard/admin/students"
                                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-slate-600" />
                                    <span className="text-sm font-medium text-slate-900">Manage Students</span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                            </Link>
                            <Link
                                href="/dashboard/admin/teachers"
                                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <GraduationCap className="w-5 h-5 text-slate-600" />
                                    <span className="text-sm font-medium text-slate-900">Manage Teachers</span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                            </Link>
                            <Link
                                href="/dashboard/admin/attendance"
                                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-slate-600" />
                                    <span className="text-sm font-medium text-slate-900">Mark Attendance</span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                            </Link>
                            <Link
                                href="/dashboard/admin/fees"
                                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <DollarSign className="w-5 h-5 text-slate-600" />
                                    <span className="text-sm font-medium text-slate-900">Manage Fees</span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
