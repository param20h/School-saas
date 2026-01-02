'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
    DollarSign, CreditCard, Calendar, Download, Filter, Search, 
    CheckCircle2, AlertCircle, Clock, User, Receipt, TrendingUp
} from 'lucide-react';

export default function ParentFeesPage() {
    const [feeRecords, setFeeRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedChild, setSelectedChild] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedFee, setSelectedFee] = useState<any>(null);

    const children = [
        { id: 1, name: 'Sarah Johnson', class: 'Class 10-A' },
        { id: 2, name: 'Michael Johnson', class: 'Class 8-B' },
    ];

    useEffect(() => {
        fetchFees();
    }, [selectedChild, selectedStatus]);

    const fetchFees = async () => {
        // Mock data - replace with actual API call
        setTimeout(() => {
            const mockFees = generateMockFees();
            setFeeRecords(mockFees);
            setLoading(false);
        }, 500);
    };

    const generateMockFees = () => {
        const data: any[] = [];
        const childrenToShow = selectedChild === 'all' ? children : children.filter(c => c.id.toString() === selectedChild);

        const feeTypes = [
            { type: 'Tuition Fee', amount: 15000 },
            { type: 'Library Fee', amount: 1000 },
            { type: 'Sports Fee', amount: 2000 },
            { type: 'Lab Fee', amount: 3000 },
            { type: 'Transport Fee', amount: 5000 },
            { type: 'Exam Fee', amount: 2000 },
        ];

        childrenToShow.forEach(child => {
            feeTypes.forEach((fee, idx) => {
                const isPaid = child.id === 1 || idx < 4;
                const dueDate = new Date(2024, 11, 15 + idx * 2);
                const paidDate = isPaid ? new Date(2024, 11, 10 + idx * 2) : null;
                const amount = child.class.includes('10') ? fee.amount * 1.1 : fee.amount;

                data.push({
                    id: `${child.id}-${idx}`,
                    childId: child.id,
                    childName: child.name,
                    class: child.class,
                    feeType: fee.type,
                    amount: Math.round(amount),
                    paidAmount: isPaid ? Math.round(amount) : (idx === 4 && child.id === 2) ? Math.round(amount * 0.6) : 0,
                    dueDate: dueDate.toISOString().split('T')[0],
                    paidDate: paidDate ? paidDate.toISOString().split('T')[0] : null,
                    status: isPaid ? 'PAID' : (idx === 4 && child.id === 2) ? 'PARTIAL' : 'PENDING',
                    paymentMode: isPaid ? ['Online', 'Cash', 'Cheque'][Math.floor(Math.random() * 3)] : null,
                    transactionId: isPaid ? `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}` : null,
                    discount: 0,
                    lateFee: !isPaid && new Date() > dueDate ? 100 : 0
                });
            });
        });

        return data.filter(f => {
            if (selectedStatus !== 'all' && f.status !== selectedStatus) return false;
            return true;
        }).sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    };

    const getChildFeeStats = (childId: number) => {
        const childFees = feeRecords.filter(f => f.childId === childId);
        const totalAmount = childFees.reduce((sum, f) => sum + f.amount, 0);
        const paidAmount = childFees.reduce((sum, f) => sum + f.paidAmount, 0);
        const pendingAmount = totalAmount - paidAmount;
        const paidCount = childFees.filter(f => f.status === 'PAID').length;
        const totalCount = childFees.length;

        return {
            totalAmount,
            paidAmount,
            pendingAmount,
            paidCount,
            totalCount,
            percentage: totalAmount > 0 ? ((paidAmount / totalAmount) * 100).toFixed(1) : 0
        };
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PAID': return 'text-green-600 bg-green-50 border-green-200';
            case 'PARTIAL': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'PENDING': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PAID': return <CheckCircle2 className="w-4 h-4" />;
            case 'PARTIAL': return <Clock className="w-4 h-4" />;
            case 'PENDING': return <AlertCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    const handlePayNow = (fee: any) => {
        setSelectedFee(fee);
        setShowPaymentModal(true);
    };

    const processPayment = () => {
        // Process payment logic here
        alert(`Payment of ₹${selectedFee.amount - selectedFee.paidAmount} processed successfully!`);
        setShowPaymentModal(false);
        fetchFees();
    };

    return (
        <DashboardLayout role="parent">
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="page-header flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Fee Management</h1>
                        <p className="text-slate-600">View and manage fee payments for your children</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-sm">
                        <Download className="w-5 h-5" />
                        Download Receipt
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="PAID">Paid</option>
                                <option value="PARTIAL">Partial</option>
                                <option value="PENDING">Pending</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Fee Summary Cards */}
                {children.map(child => {
                    if (selectedChild !== 'all' && selectedChild !== child.id.toString()) return null;
                    
                    const stats = getChildFeeStats(child.id);

                    return (
                        <div key={child.id} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-sm border border-green-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                                    <p className="text-sm text-gray-600">{child.class}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-green-600">{stats.percentage}%</p>
                                    <p className="text-sm text-gray-600">Paid</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white rounded-xl p-4 text-center">
                                    <DollarSign className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-gray-900">₹{stats.totalAmount.toLocaleString()}</p>
                                    <p className="text-xs text-gray-600 mt-1">Total Fees</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 text-center">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-green-600">₹{stats.paidAmount.toLocaleString()}</p>
                                    <p className="text-xs text-gray-600 mt-1">Paid</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 text-center">
                                    <AlertCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-red-600">₹{stats.pendingAmount.toLocaleString()}</p>
                                    <p className="text-xs text-gray-600 mt-1">Pending</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 text-center">
                                    <Receipt className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-purple-600">{stats.paidCount}/{stats.totalCount}</p>
                                    <p className="text-xs text-gray-600 mt-1">Paid Items</p>
                                </div>
                            </div>

                            {/* Quick Pay Pending Fees */}
                            {stats.pendingAmount > 0 && (
                                <div className="mt-4">
                                    <button className="w-full px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2">
                                        <CreditCard className="w-5 h-5" />
                                        Pay Pending Amount (₹{stats.pendingAmount.toLocaleString()})
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Fee Records Table */}
                {children.map(child => {
                    if (selectedChild !== 'all' && selectedChild !== child.id.toString()) return null;
                    
                    const childFees = feeRecords.filter(f => f.childId === child.id);
                    if (childFees.length === 0) return null;

                    return (
                        <div key={child.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                                <h3 className="text-lg font-bold text-gray-900">{child.name} - Fee Details</h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fee Type</th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Amount</th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Paid</th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Balance</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Due Date</th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payment Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mode</th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {childFees.map((fee) => {
                                            const isOverdue = fee.status !== 'PAID' && new Date(fee.dueDate) < new Date();
                                            const balance = fee.amount - fee.paidAmount;

                                            return (
                                                <tr key={fee.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                        {fee.feeType}
                                                        {isOverdue && (
                                                            <span className="ml-2 text-xs text-red-600 font-semibold">OVERDUE</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-center font-semibold text-gray-900">
                                                        ₹{fee.amount.toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-center font-semibold text-green-600">
                                                        ₹{fee.paidAmount.toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-center font-semibold text-red-600">
                                                        ₹{balance.toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {new Date(fee.dueDate).toLocaleDateString('en-US', { 
                                                            month: 'short', 
                                                            day: 'numeric', 
                                                            year: 'numeric' 
                                                        })}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(fee.status)}`}>
                                                            {getStatusIcon(fee.status)}
                                                            {fee.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {fee.paidDate ? new Date(fee.paidDate).toLocaleDateString('en-US', { 
                                                            month: 'short', 
                                                            day: 'numeric', 
                                                            year: 'numeric' 
                                                        }) : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {fee.paymentMode || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {fee.status !== 'PAID' && (
                                                            <button
                                                                onClick={() => handlePayNow(fee)}
                                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
                                                            >
                                                                Pay Now
                                                            </button>
                                                        )}
                                                        {fee.status === 'PAID' && (
                                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium flex items-center gap-1 mx-auto">
                                                                <Receipt className="w-3 h-3" />
                                                                Receipt
                                                            </button>
                                                        )}
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

                {/* Payment Modal */}
                {showPaymentModal && selectedFee && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 border-b border-green-400 rounded-t-2xl">
                                <h2 className="text-xl font-bold text-white">Make Payment</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Student:</span>
                                        <span className="text-sm font-semibold text-gray-900">{selectedFee.childName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Fee Type:</span>
                                        <span className="text-sm font-semibold text-gray-900">{selectedFee.feeType}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Total Amount:</span>
                                        <span className="text-sm font-semibold text-gray-900">₹{selectedFee.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Paid Amount:</span>
                                        <span className="text-sm font-semibold text-green-600">₹{selectedFee.paidAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-gray-200">
                                        <span className="text-sm font-semibold text-gray-700">Amount to Pay:</span>
                                        <span className="text-lg font-bold text-red-600">₹{(selectedFee.amount - selectedFee.paidAmount).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                        <option>Online Payment (UPI/Card)</option>
                                        <option>Cash</option>
                                        <option>Cheque</option>
                                        <option>Bank Transfer</option>
                                    </select>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowPaymentModal(false)}
                                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={processPayment}
                                        className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                                    >
                                        Pay ₹{(selectedFee.amount - selectedFee.paidAmount).toLocaleString()}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {feeRecords.length === 0 && !loading && (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No fee records found</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
