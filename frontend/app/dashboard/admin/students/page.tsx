'use client';

import { useState, useEffect } from 'react';
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
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await studentAPI.getAll();
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
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
        student.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.includes(searchTerm)
    );

    return (
        <DashboardLayout role="admin">
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
                        <p className="text-gray-600 mt-1">Manage all student records and profiles</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Student
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-blue-100">Total Students</p>
                                <h3 className="text-3xl font-bold mt-1">{students.length}</h3>
                            </div>
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600">Active Classes</p>
                                <h3 className="text-3xl font-bold mt-1 text-gray-900">12</h3>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600">Average Attendance</p>
                                <h3 className="text-3xl font-bold mt-1 text-gray-900">94%</h3>
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <Users className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="card">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or roll no..."
                                className="input pl-10"
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
                <div className="card overflow-hidden p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Student Info</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Class & Roll</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Contact</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-6 py-4"><div className="h-10 bg-gray-100 rounded-full w-48"></div></td>
                                            <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-24"></div></td>
                                            <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-32"></div></td>
                                            <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-16"></div></td>
                                            <td className="px-6 py-4"><div className="h-8 bg-gray-100 rounded w-8"></div></td>
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
                                                        {student.user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{student.user.name}</p>
                                                        <p className="text-xs text-gray-500">{student.gender}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-900">{student.class} - {student.section}</span>
                                                    <span className="text-xs text-gray-500">Roll: {student.rollNo}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-3 h-3" />
                                                        {student.user.email}
                                                    </div>
                                                    {student.user.phone && (
                                                        <div className="flex items-center gap-2">
                                                            <Phone className="w-3 h-3" />
                                                            {student.user.phone}
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
