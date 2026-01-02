'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import {
    Users,
    Search,
    Plus,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Mail,
    Phone,
    MapPin,
    Calendar,
    X
} from 'lucide-react';
import { studentAPI } from '@/lib/api';

export default function StudentManagement() {
    const router = useRouter();
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    // New student form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '', // In production, generate random or send invite
        rollNo: '',
        className: '',
        section: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        gender: 'Male'
    });

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('accessToken');
        if (!token) {
            router.push('/login');
            return;
        }
        fetchStudents();
    }, [router]);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await studentAPI.getAll();
            setStudents(Array.isArray(response.data) ? response.data : []);
        } catch (error: any) {
            console.error('Error fetching students:', error);
            if (error.response?.status === 401) {
                router.push('/login');
            }
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await studentAPI.create(formData);
            setShowAddModal(false);
            fetchStudents();
            // Reset form
            setFormData({
                name: '', email: '', password: '', rollNo: '',
                className: '', section: '', phone: '', address: '',
                dateOfBirth: '', gender: 'Male'
            });
            alert('Student added successfully!');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Error adding student');
        }
    };

    // Filter students based on search term
    const filteredStudents = students.filter(student =>
        student.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo?.includes(searchTerm)
    );

    return (
        <DashboardLayout role="admin">
            <div className="space-y-8 animate-fade-in">
                {/* Header */}
                <div className="page-header">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Student Management</h1>
                            <p className="text-slate-600 mt-1">Manage all student records and profiles</p>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Student
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card-gradient bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Total Students</p>
                                <h3 className="text-4xl font-bold mt-2">{students.length}</h3>
                            </div>
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="stat-card hover:-translate-y-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium">Active Classes</p>
                                <h3 className="text-4xl font-bold mt-2 text-slate-900">12</h3>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-xl">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                    <div className="stat-card hover:-translate-y-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium">Average Attendance</p>
                                <h3 className="text-4xl font-bold mt-2 text-slate-900">94%</h3>
                            </div>
                            <div className="p-3 bg-emerald-50 rounded-xl">
                                <Users className="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="card-hover">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or roll no..."
                                className="input pl-12"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="btn-secondary flex items-center gap-2">
                            <Filter className="w-5 h-5" />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Students Table */}
                <div className="card-hover overflow-hidden p-0 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Student Info</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Class & Roll</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Contact</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-6 py-4"><div className="skeleton h-10 rounded-lg w-48"></div></td>
                                            <td className="px-6 py-4"><div className="skeleton h-6 rounded w-24"></div></td>
                                            <td className="px-6 py-4"><div className="skeleton h-6 rounded w-32"></div></td>
                                            <td className="px-6 py-4"><div className="skeleton h-6 rounded w-16"></div></td>
                                            <td className="px-6 py-4"><div className="skeleton h-8 rounded w-8"></div></td>
                                        </tr>
                                    ))
                                ) : filteredStudents.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            No students found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map((student) => (
                                        <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                        {student.userId?.name?.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{student.userId?.name || 'N/A'}</p>
                                                        <p className="text-xs text-gray-500">ID: {student._id?.slice(-6)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-900">{student.classId?.name || 'N/A'}</span>
                                                    <span className="text-xs text-gray-500">Roll: {student.rollNo}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-3 h-3" />
                                                        {student.userId?.email || 'N/A'}
                                                    </div>
                                                    {student.userId?.phone && (
                                                        <div className="flex items-center gap-2">
                                                            <Phone className="w-3 h-3" />
                                                            {student.userId.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="badge badge-success">Active</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-indigo-600 transition-colors">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-600 transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Student Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
                        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-10">
                            <h2 className="text-2xl font-bold text-gray-900">Add New Student</h2>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <input type="text" name="name" required className="input" value={formData.name} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <input type="email" name="email" required className="input" value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                    <input type="password" name="password" required className="input" value={formData.password} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                    <input type="tel" name="phone" className="input" value={formData.phone} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Roll Number</label>
                                    <input type="text" name="rollNo" required className="input" value={formData.rollNo} onChange={handleInputChange} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Class</label>
                                        <input type="text" name="className" required className="input" placeholder="e.g. 10" value={formData.className} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Section</label>
                                        <input type="text" name="section" required className="input" placeholder="e.g. A" value={formData.section} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                                    <input type="date" name="dateOfBirth" required className="input" value={formData.dateOfBirth} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                                    <select name="gender" className="input" value={formData.gender} onChange={handleInputChange}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                                    <input type="text" name="address" required className="input" value={formData.address} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    Create Student
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
