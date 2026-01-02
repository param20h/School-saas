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
        const studentName = fee.student?.user?.name || '';
        const rollNo = fee.student?.rollNo || '';
        const feeType = fee.type || '';
        
        const matchesSearch = 
            studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rollNo.includes(searchTerm) ||
            feeType.toLowerCase().includes(searchTerm.toLowerCase());
        
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
                <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Fee Management</h1>
                        <p className="text-slate-600 mt-1">Manage student fees and payments</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="btn-secondary flex items-center gap-2 hover:-translate-y-0.5">
                            <Download className="w-5 h-5" />
                            Export Report
                        </button>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="btn-primary flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:shadow-lg"
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
                    <div className="stat-card hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium">Collection Rate</p>
                                <h3 className="text-3xl font-bold mt-1 text-slate-900">{collectionRate}%</h3>
                                <p className="text-sm text-slate-500 mt-2">{stats.paidCount} paid</p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="card shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by name, roll no, or fee type..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input pl-10 transition-all duration-200"
                            />
                        </div>
                        <div className="flex gap-2">
                            {['ALL', 'PAID', 'PARTIAL', 'PENDING'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 active:scale-[0.98] ${
                                        filterStatus === status
                                            ? 'bg-green-600 text-white shadow-sm'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Fee Records Table */}
                <div className="card shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student Info</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Fee Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Amount</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Paid</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Due Date</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Status</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-4"><div className="skeleton h-10 rounded-full w-48"></div></td>
                                            <td className="px-6 py-4"><div className="skeleton h-6 w-24"></div></td>
                                            <td className="px-6 py-4"><div className="skeleton h-6 w-20"></div></td>
                                            <td className="px-6 py-4"><div className="skeleton h-6 w-20"></div></td>
                                            <td className="px-6 py-4"><div className="skeleton h-6 w-24"></div></td>
                                            <td className="px-6 py-4"><div className="skeleton h-6 w-20 mx-auto"></div></td>
                                            <td className="px-6 py-4"><div className="skeleton h-8 w-24 mx-auto"></div></td>
                                        </tr>
                                    ))
                                ) : filteredFees.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                                            No fee records found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredFees.map((fee) => (
                                        <tr key={fee._id} className="hover:bg-slate-50 transition-all duration-200">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold">
                                                        {fee.student?.user?.name?.charAt(0) || 'S'}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900">{fee.student?.user?.name || 'N/A'}</p>
                                                        <p className="text-xs text-slate-500">{fee.student?.class} - {fee.student?.section} | Roll: {fee.student?.rollNo}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                                                    {fee.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-slate-900">₹{fee.amount.toLocaleString()}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-green-600">₹{fee.paid.toLocaleString()}</p>
                                                {fee.paid < fee.amount && (
                                                    <p className="text-xs text-red-500">Pending: ₹{(fee.amount - fee.paid).toLocaleString()}</p>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
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
                                                        className="btn-primary px-4 py-2 bg-green-600 hover:bg-green-700 text-sm"
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
                        <div className="card-gradient max-w-xl w-full shadow-xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">Add Fee Record</h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="btn-ghost p-2"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="label">Select Student *</label>
                                    <select
                                        value={formData.studentId}
                                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                        className="input transition-all duration-200"
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
                                        <label className="label">Fee Type *</label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="input transition-all duration-200"
                                            required
                                        >
                                            {feeTypes.map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">Amount *</label>
                                        <input
                                            type="number"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            className="input transition-all duration-200"
                                            placeholder="15000"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label">Due Date *</label>
                                    <input
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        className="input transition-all duration-200"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="input transition-all duration-200"
                                        rows={3}
                                        placeholder="Additional details about this fee..."
                                    ></textarea>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="btn-secondary flex-1"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-primary flex-1 bg-gradient-to-r from-green-600 to-green-700"
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
