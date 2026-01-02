'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
    DollarSign, CheckCircle2, AlertCircle, Clock, Download, 
    CreditCard, Calendar, Receipt, TrendingUp, FileText
} from 'lucide-react';

export default function StudentFeesPage() {
    const [feeRecords, setFeeRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedFee, setSelectedFee] = useState<any>(null);

    useEffect(() => {
        fetchFees();
    }, []);

    const fetchFees = async () => {
        // Mock data - replace with actual API call
        setTimeout(() => {
            const mockFees = [
                {
                    id: 1,
                    feeType: 'Tuition Fee',
                    academicYear: '2024-2025',
                    term: 'Term 1',
                    amount: 15000,
                    paidAmount: 15000,
                    dueDate: '2024-09-15',
                    paidDate: '2024-09-10',
                    status: 'PAID',
                    paymentMode: 'Online',
                    transactionId: 'TXN123456789',
                    discount: 0,
                    lateFee: 0,
                    receiptNo: 'RCP/2024/001'
                },
                {
                    id: 2,
                    feeType: 'Library Fee',
                    academicYear: '2024-2025',
                    term: 'Annual',
                    amount: 1000,
                    paidAmount: 1000,
                    dueDate: '2024-09-15',
                    paidDate: '2024-09-10',
                    status: 'PAID',
                    paymentMode: 'Cash',
                    transactionId: null,
                    discount: 0,
                    lateFee: 0,
                    receiptNo: 'RCP/2024/002'
                },
                {
                    id: 3,
                    feeType: 'Sports Fee',
                    academicYear: '2024-2025',
                    term: 'Annual',
                    amount: 2000,
                    paidAmount: 2000,
                    dueDate: '2024-09-15',
                    paidDate: '2024-09-12',
                    status: 'PAID',
                    paymentMode: 'Online',
                    transactionId: 'TXN987654321',
                    discount: 0,
                    lateFee: 0,
                    receiptNo: 'RCP/2024/003'
                },
                {
                    id: 4,
                    feeType: 'Lab Fee',
                    academicYear: '2024-2025',
                    term: 'Annual',
                    amount: 3000,
                    paidAmount: 3000,
                    dueDate: '2024-09-15',
                    paidDate: '2024-09-13',
                    status: 'PAID',
                    paymentMode: 'Cheque',
                    transactionId: 'CHQ456789',
                    discount: 0,
                    lateFee: 0,
                    receiptNo: 'RCP/2024/004'
                },
                {
                    id: 5,
                    feeType: 'Transport Fee',
                    academicYear: '2024-2025',
                    term: 'Term 2',
                    amount: 5000,
                    paidAmount: 0,
                    dueDate: '2025-01-15',
                    paidDate: null,
                    status: 'PENDING',
                    paymentMode: null,
                    transactionId: null,
                    discount: 0,
                    lateFee: 0,
                    receiptNo: null
                },
                {
                    id: 6,
                    feeType: 'Exam Fee',
                    academicYear: '2024-2025',
                    term: 'Final Exam',
                    amount: 2000,
                    paidAmount: 0,
                    dueDate: '2025-02-01',
                    paidDate: null,
                    status: 'PENDING',
                    paymentMode: null,
                    transactionId: null,
                    discount: 0,
                    lateFee: 0,
                    receiptNo: null
                },
            ];
            setFeeRecords(mockFees);
            setLoading(false);
        }, 500);
    };

    const getFeeStats = () => {
        const totalAmount = feeRecords.reduce((sum, f) => sum + f.amount, 0);
        const paidAmount = feeRecords.reduce((sum, f) => sum + f.paidAmount, 0);
        const pendingAmount = totalAmount - paidAmount;
        const paidCount = feeRecords.filter(f => f.status === 'PAID').length;
        const totalCount = feeRecords.length;

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

    const downloadReceipt = (fee: any) => {
        alert(`Downloading receipt ${fee.receiptNo}...`);
    };

    const stats = getFeeStats();

    return (
        <DashboardLayout role="student">
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="page-header flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Fee Details</h1>
                        <p className="text-slate-600">View your fee payments and pending dues</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                        <Download className="w-5 h-5" />
                        Download Statement
                    </button>
                </div>

                {/* Fee Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Fee Summary</h3>
                            <p className="text-sm text-gray-600">Academic Year 2024-2025</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-blue-600">{stats.percentage}%</p>
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

                    {/* Payment Progress */}
                    <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Payment Progress</span>
                            <span className="text-sm font-bold text-blue-600">{stats.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all"
                                style={{ width: `${stats.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Pending Fees Alert */}
                {stats.pendingAmount > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-red-900 mb-1">Pending Payment</h3>
                            <p className="text-sm text-red-800">
                                You have a pending amount of ₹{stats.pendingAmount.toLocaleString()}. Please pay before the due date to avoid late fees.
                            </p>
                        </div>
                        <button className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium whitespace-nowrap">
                            Pay Now
                        </button>
                    </div>
                )}

                {/* Fee Records */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
                        <h3 className="text-lg font-bold text-gray-900">Fee Breakdown</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fee Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Term</th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Amount</th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Paid</th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Balance</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Due Date</th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payment Date</th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {feeRecords.map((fee) => {
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
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {fee.term}
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
                                            <td className="px-6 py-4 text-center">
                                                {fee.status !== 'PAID' && (
                                                    <button
                                                        onClick={() => handlePayNow(fee)}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
                                                    >
                                                        Pay Now
                                                    </button>
                                                )}
                                                {fee.status === 'PAID' && (
                                                    <button 
                                                        onClick={() => downloadReceipt(fee)}
                                                        className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-xs font-medium flex items-center gap-1 mx-auto"
                                                    >
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

                {/* Payment History */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Payment History</h3>
                    <div className="space-y-3">
                        {feeRecords.filter(f => f.status === 'PAID').slice(0, 5).map((fee) => (
                            <div key={fee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{fee.feeType}</p>
                                        <p className="text-sm text-gray-600">
                                            Paid on {new Date(fee.paidDate).toLocaleDateString('en-US', { 
                                                month: 'short', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">₹{fee.amount.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">{fee.paymentMode}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Modal */}
                {showPaymentModal && selectedFee && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 border-b border-blue-400 rounded-t-2xl">
                                <h2 className="text-xl font-bold text-white">Make Payment</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Fee Type:</span>
                                        <span className="text-sm font-semibold text-gray-900">{selectedFee.feeType}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Term:</span>
                                        <span className="text-sm font-semibold text-gray-900">{selectedFee.term}</span>
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
                                        <span className="text-lg font-bold text-blue-600">₹{(selectedFee.amount - selectedFee.paidAmount).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
                                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                                    >
                                        <CreditCard className="w-4 h-4" />
                                        Pay ₹{(selectedFee.amount - selectedFee.paidAmount).toLocaleString()}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
