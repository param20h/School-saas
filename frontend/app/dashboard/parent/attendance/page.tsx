'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
    Calendar, CheckCircle2, XCircle, Clock, Filter, Search, 
    Download, TrendingUp, User, ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function ParentAttendancePage() {
    const [attendanceData, setAttendanceData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedChild, setSelectedChild] = useState('all');
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [viewType, setViewType] = useState<'calendar' | 'list'>('calendar');

    const children = [
        { id: 1, name: 'Sarah Johnson', class: 'Class 10-A' },
        { id: 2, name: 'Michael Johnson', class: 'Class 8-B' },
    ];

    useEffect(() => {
        fetchAttendance();
    }, [selectedChild, selectedMonth, selectedYear]);

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
        const childrenToShow = selectedChild === 'all' ? children : children.filter(c => c.id.toString() === selectedChild);

        childrenToShow.forEach(child => {
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(selectedYear, selectedMonth, day);
                const dayOfWeek = date.getDay();
                
                // Skip Sundays
                if (dayOfWeek === 0) continue;
                
                // Skip future dates
                if (date > new Date()) continue;

                let status = 'Present';
                if (dayOfWeek === 6) status = 'Holiday'; // Saturday
                else {
                    const random = Math.random();
                    if (random < 0.05) status = 'Absent';
                    else if (random < 0.10) status = 'Late';
                }

                data.push({
                    id: `${child.id}-${day}`,
                    childId: child.id,
                    childName: child.name,
                    class: child.class,
                    date: date.toISOString().split('T')[0],
                    status,
                    time: status === 'Late' ? '08:15 AM' : '08:00 AM',
                    remarks: status === 'Absent' ? 'Medical Leave' : ''
                });
            }
        });

        return data;
    };

    const getMonthStats = () => {
        const childrenToShow = selectedChild === 'all' ? children : children.filter(c => c.id.toString() === selectedChild);
        
        return childrenToShow.map(child => {
            const childAttendance = attendanceData.filter(a => a.childId === child.id);
            const present = childAttendance.filter(a => a.status === 'Present').length;
            const late = childAttendance.filter(a => a.status === 'Late').length;
            const absent = childAttendance.filter(a => a.status === 'Absent').length;
            const total = childAttendance.filter(a => a.status !== 'Holiday').length;
            const percentage = total > 0 ? ((present + late) / total * 100).toFixed(1) : 0;

            return {
                ...child,
                present,
                late,
                absent,
                total,
                percentage
            };
        });
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

    const renderCalendarView = () => {
        const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        const stats = getMonthStats();

        return (
            <div className="space-y-6">
                {stats.map(child => {
                    const childAttendance = attendanceData.filter(a => a.childId === child.id);
                    
                    return (
                        <div key={child.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                                    <p className="text-sm text-gray-500">{child.class}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-green-600">{child.percentage}%</p>
                                    <p className="text-sm text-gray-500">Attendance Rate</p>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                <div className="bg-gray-50 rounded-xl p-4 text-center">
                                    <p className="text-2xl font-bold text-gray-900">{child.total}</p>
                                    <p className="text-xs text-gray-600 mt-1">Total Days</p>
                                </div>
                                <div className="bg-green-50 rounded-xl p-4 text-center">
                                    <p className="text-2xl font-bold text-green-600">{child.present}</p>
                                    <p className="text-xs text-green-600 mt-1">Present</p>
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 text-center">
                                    <p className="text-2xl font-bold text-yellow-600">{child.late}</p>
                                    <p className="text-xs text-yellow-600 mt-1">Late</p>
                                </div>
                                <div className="bg-red-50 rounded-xl p-4 text-center">
                                    <p className="text-2xl font-bold text-red-600">{child.absent}</p>
                                    <p className="text-xs text-red-600 mt-1">Absent</p>
                                </div>
                            </div>

                            {/* Calendar Grid */}
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
                                    const record = childAttendance.find(a => a.date === dateStr);
                                    const isToday = date.toDateString() === new Date().toDateString();
                                    const isFuture = date > new Date();

                                    return (
                                        <div
                                            key={day}
                                            className={`
                                                aspect-square rounded-xl p-2 text-center relative
                                                ${isFuture ? 'bg-gray-50 text-gray-300' : 'bg-gray-50'}
                                                ${isToday ? 'ring-2 ring-green-500' : ''}
                                                ${record ? getStatusColor(record.status) : ''}
                                                transition-all hover:shadow-md
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
                })}
            </div>
        );
    };

    const renderListView = () => {
        const stats = getMonthStats();
        
        return (
            <div className="space-y-6">
                {stats.map(child => {
                    const childAttendance = attendanceData
                        .filter(a => a.childId === child.id)
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    
                    return (
                        <div key={child.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                                        <p className="text-sm text-gray-600">{child.class}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-bold text-green-600">{child.percentage}%</p>
                                        <p className="text-xs text-gray-600">Attendance</p>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Day</th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {childAttendance.slice(0, 10).map((record) => {
                                            const date = new Date(record.date);
                                            return (
                                                <tr key={record.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {date.toLocaleDateString('en-US', { weekday: 'long' })}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(record.status)}`}>
                                                            {getStatusIcon(record.status)}
                                                            {record.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {record.time}
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
                    );
                })}
            </div>
        );
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <DashboardLayout role="parent">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Records</h1>
                        <p className="text-gray-600">Track your children's attendance history</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-sm">
                        <Download className="w-5 h-5" />
                        Export Report
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                {[2024, 2023, 2022].map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">View</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewType('calendar')}
                                    className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors ${
                                        viewType === 'calendar'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Calendar
                                </button>
                                <button
                                    onClick={() => setViewType('list')}
                                    className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors ${
                                        viewType === 'list'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attendance Display */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        <p className="mt-4 text-gray-600">Loading attendance data...</p>
                    </div>
                ) : (
                    viewType === 'calendar' ? renderCalendarView() : renderListView()
                )}
            </div>
        </DashboardLayout>
    );
}
