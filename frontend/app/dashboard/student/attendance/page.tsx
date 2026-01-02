'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
    Calendar, CheckCircle2, XCircle, Clock, TrendingUp, 
    Download, Award, AlertCircle 
} from 'lucide-react';

export default function StudentAttendancePage() {
    const [attendanceData, setAttendanceData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        fetchAttendance();
    }, [selectedMonth, selectedYear]);

    const fetchAttendance = async () => {
        // Mock data - replace with actual API call
        setTimeout(() => {
            const mockData = generateMockAttendance();
            setAttendanceData(mockData);
            setLoading(false);
        }, 500);
    };

    const generateMockAttendance = () => {
        const data: any[] = [];
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(selectedYear, selectedMonth, day);
            const dayOfWeek = date.getDay();
            
            // Skip Sundays
            if (dayOfWeek === 0) continue;
            
            // Skip future dates
            if (date > new Date()) continue;

            let status = 'Present';
            let checkIn = '08:00 AM';
            let checkOut = '02:30 PM';
            
            if (dayOfWeek === 6) {
                status = 'Holiday';
                checkIn = '-';
                checkOut = '-';
            } else {
                const random = Math.random();
                if (random < 0.05) {
                    status = 'Absent';
                    checkIn = '-';
                    checkOut = '-';
                } else if (random < 0.10) {
                    status = 'Late';
                    checkIn = '08:15 AM';
                }
            }

            data.push({
                id: day,
                date: date.toISOString().split('T')[0],
                day: date.toLocaleDateString('en-US', { weekday: 'long' }),
                status,
                checkIn,
                checkOut,
                remarks: status === 'Absent' ? 'Medical Leave' : status === 'Late' ? 'Traffic delay' : ''
            });
        }

        return data;
    };

    const getMonthStats = () => {
        const present = attendanceData.filter(a => a.status === 'Present').length;
        const late = attendanceData.filter(a => a.status === 'Late').length;
        const absent = attendanceData.filter(a => a.status === 'Absent').length;
        const total = attendanceData.filter(a => a.status !== 'Holiday').length;
        const percentage = total > 0 ? ((present + late) / total * 100).toFixed(1) : 0;

        return { present, late, absent, total, percentage };
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Present': return 'bg-green-100 text-green-700 border-green-200';
            case 'Absent': return 'bg-red-100 text-red-700 border-red-200';
            case 'Late': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Holiday': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Present': return <CheckCircle2 className="w-4 h-4" />;
            case 'Absent': return <XCircle className="w-4 h-4" />;
            case 'Late': return <Clock className="w-4 h-4" />;
            default: return null;
        }
    };

    const renderCalendar = () => {
        const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center font-semibold text-sm text-gray-600 py-2">
                            {day}
                        </div>
                    ))}
                    
                    {Array.from({ length: firstDay }, (_, i) => (
                        <div key={`empty-${i}`} />
                    ))}
                    
                    {Array.from({ length: daysInMonth }, (_, i) => {
                        const day = i + 1;
                        const date = new Date(selectedYear, selectedMonth, day);
                        const dateStr = date.toISOString().split('T')[0];
                        const record = attendanceData.find(a => a.date === dateStr);
                        const isToday = date.toDateString() === new Date().toDateString();
                        const isFuture = date > new Date();

                        return (
                            <div
                                key={day}
                                className={`
                                    aspect-square rounded-xl p-2 text-center relative
                                    ${isFuture ? 'bg-gray-50 text-gray-300' : 'bg-gray-50'}
                                    ${isToday ? 'ring-2 ring-blue-500' : ''}
                                    ${record ? getStatusColor(record.status) : ''}
                                    transition-all hover:shadow-md cursor-pointer
                                `}
                            >
                                <div className="text-sm font-semibold">{day}</div>
                                {record && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {getStatusIcon(record.status)}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const stats = getMonthStats();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <DashboardLayout role="student">
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="page-header flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Attendance</h1>
                        <p className="text-slate-600">Track your attendance record</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                        <Download className="w-5 h-5" />
                        Download Report
                    </button>
                </div>

                {/* Month Selector */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {monthNames.map((month, idx) => (
                                    <option key={idx} value={idx}>{month}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {[2025, 2024, 2023].map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="w-8 h-8" />
                            <span className="text-sm font-medium opacity-90">Attendance Rate</span>
                        </div>
                        <p className="text-4xl font-bold">{stats.percentage}%</p>
                        <p className="text-sm opacity-80 mt-2">This Month</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-6 h-6 text-gray-400" />
                            <span className="text-xs font-medium text-gray-600">Total Days</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-xs text-gray-500 mt-1">Working Days</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                            <span className="text-xs font-medium text-gray-600">Present</span>
                        </div>
                        <p className="text-3xl font-bold text-green-600">{stats.present}</p>
                        <p className="text-xs text-gray-500 mt-1">Days Present</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-6 h-6 text-yellow-500" />
                            <span className="text-xs font-medium text-gray-600">Late</span>
                        </div>
                        <p className="text-3xl font-bold text-yellow-600">{stats.late}</p>
                        <p className="text-xs text-gray-500 mt-1">Times Late</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <XCircle className="w-6 h-6 text-red-500" />
                            <span className="text-xs font-medium text-gray-600">Absent</span>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{stats.absent}</p>
                        <p className="text-xs text-gray-500 mt-1">Days Absent</p>
                    </div>
                </div>

                {/* Attendance Goal */}
                {parseFloat(stats.percentage) < 90 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-yellow-900 mb-1">Attendance Alert</h3>
                            <p className="text-sm text-yellow-800">
                                Your attendance is below 90%. Maintain regular attendance to avoid academic penalties.
                            </p>
                        </div>
                    </div>
                )}

                {parseFloat(stats.percentage) >= 95 && (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4">
                        <Award className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-green-900 mb-1">Excellent Attendance!</h3>
                            <p className="text-sm text-green-800">
                                Great job! Your attendance rate is above 95%. Keep up the excellent work!
                            </p>
                        </div>
                    </div>
                )}

                {/* Calendar View */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Calendar View</h2>
                    {renderCalendar()}
                </div>

                {/* Detailed Records */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Attendance Details</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Day</th>
                                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
                                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Check In</th>
                                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Check Out</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {attendanceData.slice().reverse().map((record) => {
                                        const date = new Date(record.date);
                                        return (
                                            <tr key={record.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {record.day}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(record.status)}`}>
                                                        {getStatusIcon(record.status)}
                                                        {record.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                                                    {record.checkIn}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                                                    {record.checkOut}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {record.remarks || '-'}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
