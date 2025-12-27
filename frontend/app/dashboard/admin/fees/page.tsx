'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
    DollarSign,
    Users,
    TrendingUp,
    TrendingDown,
    Search,
    Filter,
    Download,
    Plus,
    CheckCircle,
    AlertCircle,
    Clock,
    X,
    Calendar
} from 'lucide-react';
import { feeAPI, studentAPI } from '@/lib/api';

export default function FeeManagement() {
    const [students, setStudents] = useState<any[]>([]);
    const [fees, setFees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        studentId: '',
        amount: '',
        dueDate: '',
        type: 'TUITION',
        description: ''
    });

    const feeTypes = ['TUITION', 'TRANSPORT', 'LIBRARY', 'EXAMINATION', 'ACTIVITY', 'OTHER'];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const studentsRes = await studentAPI.getAll();
            setStudents(studentsRes.data);

            // Mock fee data - replace with actual API call when available
            const mockFees = studentsRes.data.map((student: any) => ({
                _id: student._id,
                student: student,
                amount: 15000,
                paid: Math.random() > 0.3 ? 15000 : Math.floor(Math.random() * 15000),
                dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                status: Math.random() > 0.3 ? 'PAID' : Math.random() > 0.5 ? 'PARTIAL' : 'PENDING',
                type: feeTypes[Math.floor(Math.random() * feeTypes.length)],
                paidDate: Math.random() > 0.3 ? new Date().toISOString().split('T')[0] : null
            }));
            setFees(mockFees);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await feeAPI.create(formData);
            setShowAddModal(false);
            fetchData();
            setFormData({ studentId: '', amount: '', dueDate: '', type: 'TUITION', description: '' });
            alert('Fee record created successfully!');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Error creating fee record');
        }
    };

    const handleMarkPaid = async (feeId: string) => {
        try {
            await feeAPI.markPaid(feeId);
            fetchData();
            alert('Fee marked as paid!');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Error marking fee as paid');
        }
    };

    const filteredFees = fees.filter(fee => {
        const matchesSearch = 
            fee.student.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fee.student.rollNo.includes(searchTerm) ||
            fee.type.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = 
            filterStatus === 'ALL' || fee.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: fees.reduce((sum, f) => sum + f.amount, 0),
        collected: fees.reduce((sum, f) => sum + f.paid, 0),
        pending: fees.reduce((sum, f) => sum + (f.amount - f.paid), 0),
        paidCount: fees.filter(f => f.status === 'PAID').length,
        pendingCount: fees.filter(f => f.status === 'PENDING').length,
    };

    const collectionRate = fees.length > 0 ? ((stats.collected / stats.total) * 100).toFixed(1) : '0';

    return (
        <DashboardLayout role="admin">
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
                        <p className="text-gray-600 mt-1">Manage student fees and payments</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all">
                            <Download className="w-5 h-5" />
                            Export Report
                        </button>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Add Fee Record
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-blue-100 text-sm">Total Fee Amount</p>
                                <h3 className="text-3xl font-bold mt-1">₹{(stats.total / 100000).toFixed(2)}L</h3>
                            </div>
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <DollarSign className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-green-100 text-sm">Collected</p>
                                <h3 className="text-3xl font-bold mt-1">₹{(stats.collected / 100000).toFixed(2)}L</h3>
                                <div className="flex items-center gap-1 mt-2">
                                    <TrendingUp className="w-4 h-4" />
                                    <span className="text-sm">{collectionRate}%</span>
                                </div>
                            </div>
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-red-100 text-sm">Pending</p>
                                <h3 className="text-3xl font-bold mt-1">₹{(stats.pending / 100000).toFixed(2)}L</h3>
                                <p className="text-sm text-red-100 mt-2">{stats.pendingCount} students</p>
                            </div>
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Collection Rate</p>
                                <h3 className="text-3xl font-bold mt-1 text-gray-900">{collectionRate}%</h3>
                                <p className="text-sm text-gray-500 mt-2">{stats.paidCount} paid</p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, roll no, or fee type..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div className="flex gap-2">
                            {['ALL', 'PAID', 'PARTIAL', 'PENDING'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-4 py-3 rounded-xl font-medium transition-all ${
                                        filterStatus === status
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Fee Records Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student Info</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Fee Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Paid</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Due Date</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-6 py-4"><div className="h-10 bg-gray-100 rounded-full w-48"></div></td>
                                            <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-24"></div></td>
                                            <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-20"></div></td>
                                            <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-20"></div></td>
                                            <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-24"></div></td>
                                            <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-20 mx-auto"></div></td>
                                            <td className="px-6 py-4"><div className="h-8 bg-gray-100 rounded w-24 mx-auto"></div></td>
                                        </tr>
                                    ))
                                ) : filteredFees.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                            No fee records found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredFees.map((fee) => (
                                        <tr key={fee._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold">
                                                        {fee.student.user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{fee.student.user.name}</p>
                                                        <p className="text-xs text-gray-500">{fee.student.class} - {fee.student.section} | Roll: {fee.student.rollNo}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                                                    {fee.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-gray-900">₹{fee.amount.toLocaleString()}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-green-600">₹{fee.paid.toLocaleString()}</p>
                                                {fee.paid < fee.amount && (
                                                    <p className="text-xs text-red-500">Pending: ₹{(fee.amount - fee.paid).toLocaleString()}</p>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(fee.dueDate).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {fee.status === 'PAID' && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                        <CheckCircle className="w-4 h-4" />
                                                        Paid
                                                    </span>
                                                )}
                                                {fee.status === 'PARTIAL' && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                                        <Clock className="w-4 h-4" />
                                                        Partial
                                                    </span>
                                                )}
                                                {fee.status === 'PENDING' && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                                        <AlertCircle className="w-4 h-4" />
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {fee.status !== 'PAID' && (
                                                    <button
                                                        onClick={() => handleMarkPaid(fee._id)}
                                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                                    >
                                                        Mark Paid
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Fee Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Add Fee Record</h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Student *</label>
                                    <select
                                        value={formData.studentId}
                                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                        required
                                    >
                                        <option value="">Choose a student...</option>
                                        {students.map((student) => (
                                            <option key={student._id} value={student._id}>
                                                {student.user.name} - {student.class} {student.section} (Roll: {student.rollNo})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Fee Type *</label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                            required
                                        >
                                            {feeTypes.map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
                                        <input
                                            type="number"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                            placeholder="15000"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                                    <input
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                        rows={3}
                                        placeholder="Additional details about this fee..."
                                    ></textarea>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                                    >
                                        Add Fee Record
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
