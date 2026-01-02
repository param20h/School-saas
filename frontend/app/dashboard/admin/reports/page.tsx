'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
    BarChart3,
    TrendingUp,
    Users,
    DollarSign,
    Calendar,
    Download,
    FileText,
    PieChart,
    Activity,
    BookOpen,
    GraduationCap,
    Filter
} from 'lucide-react';

export default function ReportsPage() {
    const [selectedReport, setSelectedReport] = useState('overview');
    const [dateRange, setDateRange] = useState('this-month');

    const reportTypes = [
        { id: 'overview', name: 'Overview Report', icon: BarChart3, color: 'from-blue-500 to-blue-600' },
        { id: 'attendance', name: 'Attendance Report', icon: Calendar, color: 'from-green-500 to-green-600' },
        { id: 'financial', name: 'Financial Report', icon: DollarSign, color: 'from-yellow-500 to-yellow-600' },
        { id: 'academic', name: 'Academic Report', icon: BookOpen, color: 'from-purple-500 to-purple-600' },
        { id: 'student', name: 'Student Report', icon: Users, color: 'from-indigo-500 to-indigo-600' },
        { id: 'teacher', name: 'Teacher Report', icon: GraduationCap, color: 'from-pink-500 to-pink-600' },
    ];

    const quickStats = [
        {
            title: 'Total Revenue',
            value: '₹24.8L',
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'bg-green-100 text-green-600'
        },
        {
            title: 'Student Enrollment',
            value: '1,234',
            change: '+8.2%',
            trend: 'up',
            icon: Users,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            title: 'Avg Attendance',
            value: '94.2%',
            change: '+2.1%',
            trend: 'up',
            icon: Calendar,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            title: 'Avg Performance',
            value: '78.5%',
            change: '+5.3%',
            trend: 'up',
            icon: Activity,
            color: 'bg-yellow-100 text-yellow-600'
        },
    ];

    const recentReports = [
        {
            id: 1,
            name: 'Monthly Financial Summary',
            type: 'Financial',
            date: '2025-12-27',
            size: '2.4 MB',
            format: 'PDF'
        },
        {
            id: 2,
            name: 'Student Performance Analysis',
            type: 'Academic',
            date: '2025-12-25',
            size: '1.8 MB',
            format: 'PDF'
        },
        {
            id: 3,
            name: 'Attendance Report - December',
            type: 'Attendance',
            date: '2025-12-20',
            size: '980 KB',
            format: 'Excel'
        },
        {
            id: 4,
            name: 'Teacher Performance Review',
            type: 'Staff',
            date: '2025-12-15',
            size: '1.2 MB',
            format: 'PDF'
        },
    ];

    const generateReport = () => {
        alert(`Generating ${reportTypes.find(r => r.id === selectedReport)?.name}...`);
    };

    return (
        <DashboardLayout role="admin">
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
                        <p className="text-slate-600 mt-1">Generate and view comprehensive reports</p>
                    </div>
                    <button
                        onClick={generateReport}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                        <Download className="w-5 h-5" />
                        Generate Report
                    </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickStats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 ${stat.color} rounded-xl`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                                    stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                }`}>
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="text-xs font-semibold">{stat.change}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Report Generator */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Generate Custom Report</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                            <select
                                value={selectedReport}
                                onChange={(e) => setSelectedReport(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                {reportTypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value="today">Today</option>
                                <option value="this-week">This Week</option>
                                <option value="this-month">This Month</option>
                                <option value="last-month">Last Month</option>
                                <option value="this-quarter">This Quarter</option>
                                <option value="this-year">This Year</option>
                                <option value="custom">Custom Range</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                <option value="pdf">PDF</option>
                                <option value="excel">Excel</option>
                                <option value="csv">CSV</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={generateReport}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                    >
                        Generate & Download Report
                    </button>
                </div>

                {/* Report Types Grid */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Available Reports</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reportTypes.map((report) => (
                            <div
                                key={report.id}
                                className={`bg-white rounded-2xl p-6 border-2 ${
                                    selectedReport === report.id ? 'border-blue-500' : 'border-gray-100'
                                } shadow-sm hover:shadow-lg transition-all cursor-pointer`}
                                onClick={() => setSelectedReport(report.id)}
                            >
                                <div className={`p-3 bg-gradient-to-br ${report.color} rounded-xl w-fit mb-4`}>
                                    <report.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{report.name}</h3>
                                <p className="text-sm text-gray-600">
                                    {report.id === 'overview' && 'Comprehensive overview of all school metrics'}
                                    {report.id === 'attendance' && 'Detailed attendance statistics and trends'}
                                    {report.id === 'financial' && 'Fee collection and financial analysis'}
                                    {report.id === 'academic' && 'Student performance and exam results'}
                                    {report.id === 'student' && 'Student enrollment and demographics'}
                                    {report.id === 'teacher' && 'Teacher performance and workload analysis'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Reports */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Reports</h2>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                            View All
                        </button>
                    </div>
                    <div className="space-y-4">
                        {recentReports.map((report) => (
                            <div key={report.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{report.name}</h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-xs text-gray-500">{report.type}</span>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-gray-500">{new Date(report.date).toLocaleDateString()}</span>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-gray-500">{report.size}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                                        {report.format}
                                    </span>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Download className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Analytics Charts Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Attendance Trends</h3>
                            <PieChart className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
                            <p className="text-gray-400">Chart visualization would go here</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Revenue Overview</h3>
                            <BarChart3 className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
                            <p className="text-gray-400">Chart visualization would go here</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
